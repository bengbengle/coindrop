import { action, observable, computed, autorun, toJS } from "mobx";
import Web3Utils from 'web3-utils'
import ERC20ABI from "../abis/ERC20ABI"
import CoinDropAbi from "../abis/CoinDrop"
import Web3 from "web3";
import { observer } from "mobx-react";
const BN = require('bignumber.js');


class TxStore {
  @observable txs = []
  txHashToIndex = {}
  @observable approval = '';
  constructor(rootStore) {
    this.tokenStore = rootStore.tokenStore
    this.web3Store = rootStore.web3Store
    this.gasPriceStore = rootStore.gasPriceStore
  }

  @action
  async doSend(){
    this.txs = [];
    this.approval = '';
    if(new BN(this.tokenStore.totalBalance).gt(new BN(this.tokenStore.allowance))){
      this._approve();
      const interval = setInterval(() => {
        const index = this.txHashToIndex[this.approval];
        console.log('checking autorun', index, this.approval, this.txHashToIndex, toJS(this.txs))
        if(this.approval){
          if(this.txs[index] && this.txs[index].status === 'mined'){
            clearInterval(interval);
            console.log('lets GO!', this.tokenStore.totalNumberTx, this.tokenStore.arrayLimit)
            setTimeout(() => {
              this._coindrop({slice: this.tokenStore.totalNumberTx, addPerTx: this.tokenStore.arrayLimit})
            }, 1000)
          }
        }
      }, 3000)
    } else {
      this._coindrop({slice: this.tokenStore.totalNumberTx, addPerTx: this.tokenStore.arrayLimit})
    }
  }

  async _approve(){
    const index = this.txs.length;
    const web3 = this.web3Store.web3;
    const token = new web3.eth.Contract(ERC20ABI, this.tokenStore.tokenAddress);
    try{
      return token.methods['approve(address,uint256)'](this.tokenStore.CoinDropAddress, this.tokenStore.totalBalanceWithDecimals)
      .send({from: this.web3Store.defaultAccount, gasPrice: this.gasPriceStore.standardInHex})
      .on('transactionHash', (hash) => {
        this.approval = hash
        this.txHashToIndex[hash] = index;
        this.txs[index] = {status: 'pending', name: `CoinDrop Approval to spend ${this.tokenStore.totalBalance} ${this.tokenStore.tokenSymbol}`, hash}
        this.getTxStatus(hash)
  
      })
      .on('error', (error) => {
        console.error(error)
      })
    } catch (e){
      console.error(e)
    }
    
  }

  async _coindrop({slice, addPerTx}) {
    const token_address = this.tokenStore.tokenAddress
    let {addresses_to_send, balances_to_send, CoinDropAddress, currentFee, totalBalance} =  this.tokenStore;
    
    let ethValue = token_address === "0x000000000000000000000000000000000000bEEF" ? new BN(currentFee).plus(new BN(totalBalance)) : new BN(currentFee)
    const start = (slice - 1) * addPerTx;
    const end = slice * addPerTx;
    addresses_to_send = addresses_to_send.slice(start, end);
    balances_to_send = balances_to_send.slice(start, end);
    console.log('slice', slice, addresses_to_send[0], balances_to_send[0], addPerTx)
    const web3 = this.web3Store.web3;
    const coindrop = new web3.eth.Contract(CoinDropAbi, CoinDropAddress);

    try {
      let encodedData = await coindrop.methods.coindropToken(token_address, addresses_to_send, balances_to_send).encodeABI({from: this.web3Store.defaultAccount})
      let gas = await web3.eth.estimateGas({
          from: this.web3Store.defaultAccount,
          data: encodedData,
          value: Web3Utils.toHex(Web3Utils.toWei(ethValue.toString())),
          to: CoinDropAddress
      })
      console.log('gas', gas)
      let tx = coindrop.methods.coindropToken(token_address, addresses_to_send, balances_to_send)
      .send({
        from: this.web3Store.defaultAccount,
        gasPrice: this.gasPriceStore.standardInHex,
        gas: Web3Utils.toHex(gas + 150000),
        value: Web3Utils.toHex(Web3Utils.toWei(ethValue.toString())),
      })

      .on('transactionHash', (hash) => {
        // console.log('txHash',hash)
        this.txHashToIndex[hash] = this.txs.length
        this.txs.push({status: 'pending', name: `Sending Batch #${this.txs.length + 1} ${this.tokenStore.tokenSymbol}\n
          From ${addresses_to_send[0]} to: ${addresses_to_send[addresses_to_send.length-1]}
        `, hash})
        this.getTxStatus(hash)
      })
      .on('error', (error) => {
        console.log(error)
      })
      slice--;
      if (slice > 0) {
        this._coindrop({slice, addPerTx});
      } else {
          
      }
    } catch(e){
      console.error(e)
    }
  }  

  async getTxReceipt(hash){
    console.log('getTxReceipt')
    try {
      const web3 = this.web3Store.web3;
      const res = await web3.eth.getTransaction(hash);
      return res;
    } catch(e) {
      console.error(e);
    }
  }

  async getTxStatus(hash) {
    console.log('GET TX STATUS', hash)
    setTimeout(() => {
      const web3 = this.web3Store.web3;
      web3.eth.getTransactionReceipt(hash, (error, res) => {
        if(res && res.blockNumber){
          console.log(res)
          if(res.status){
            const index = this.txHashToIndex[hash]
            this.txs[index].status = `mined`
          } else {
            const index = this.txHashToIndex[hash]
            this.txs[index].status = `error`
            this.txs[index].name = `Mined but with errors. Perhaps out of gas`
          }
        } else {
          this.getTxStatus(hash)
        }
      })
    }, 3000)
  }

}

export default TxStore;