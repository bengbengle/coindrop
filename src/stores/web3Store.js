import { action, observable } from "mobx";
import getWeb3 from '../getWeb3';
import Web3 from 'web3';
class Web3Store {
  @observable web3 = {};
  @observable defaultAccount = '';
  getWeb3Promise = null;
  @observable loading = true;
  @observable errors = [];
  @observable userTokens = [];
  @observable explorerUrl = '';
  @observable startedUrl = window.location.hash
  constructor(rootStore) {
    
    this.getWeb3Promise = getWeb3().then(async (web3Config) => {
      const {web3Instance, defaultAccount} = web3Config;
      this.defaultAccount = defaultAccount;
      this.web3 = new Web3(web3Instance.currentProvider); 
      this.getUserTokens(web3Config)
      this.setExplorerUrl(web3Config.explorerUrl)
      console.log('web3 loaded')
    }).catch((e) => {
      console.error(e,'web3 not loaded')
      this.errors.push(e.message)
    })
  }
  @action
  setExplorerUrl(url){
    this.explorerUrl = url
  }
  @action
  setStartedUrl(url){
    this.startedUrl = url;
  }
  async getUserTokens({trustApiName, defaultAccount}) {
    // let url = `/api/explorer/v1/okexchain_test/addresses/${defaultAccount}/holders?t=1620667345093&offset=0&limit=100`
    // let url = `https://${trustApiName}.trustwalletapp.com/tokens?address=${defaultAccount}`
    let url = ''
    // window.fetch(url).then((res) => {
    //   return res.json()
    // }).then((res) => {
    //   console.log(res)

      // let tokens = res.data.hits.map((token)=> {
      //   let {symbol,value, tokenContractAddress} = token
      //   let address = tokenContractAddress
      //   return  {label: `${symbol} - ${address}`, value: address}
      // })
      // 
      let tokens = [
        {label: `${'HTT'} - ${'0xe8cf1102266d0fb4271cdb2c05d3b6bfec1e0612'}`, 
        value: '0xe8cf1102266d0fb4271cdb2c05d3b6bfec1e0612'},
        {label: `${'ADAM'} - ${'0x6A9f94cB64B0c28921B94cB1414ceaA4A69D4704'}`, 
        value: '0x6A9f94cB64B0c28921B94cB1414ceaA4A69D4704'},
        {label: `${'DogeCoin'} - ${'0x12a198C568e6B7036a4BD1ed8787f80686C60939'}`, 
        value: '0x12a198C568e6B7036a4BD1ed8787f80686C60939'},
      ]

      // let tokens = res.docs.map(({contract}) => {
      //   const {address, symbol} = contract;
      //   return {label: `${symbol} - ${address}`, value: address}
      // })
      tokens.unshift({
        value: '0x000000000000000000000000000000000000bEEF',
        label: "OKT - Okex Mainnet Native Currency"
      })
      this.userTokens = tokens;
      this.loading = false;
      
  // }).catch((e) => {
  //   this.loading = false;
  //   console.error(e);
  // })
  }

}

export default Web3Store;