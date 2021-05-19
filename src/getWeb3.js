import Web3 from 'web3'
let getWeb3 = () => {
  return new Promise(function (resolve, reject) {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async function () {
      var results
      var web3 = window.web3

      // if (window.ethereum) {
      //   web3 = new Web3(window.ethereum)
      // }
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      
      
      if (typeof window.ethereum !== 'undefined'|| (typeof window.web3 !== 'undefined')) {

        // Web3 browser user detected. You can now use the provider.
        const provider = window['ethereum'] || window.web3.currentProvider
        web3 = new Web3(provider)

        let accounts = await window.ethereum.enable();
        let defaultAccount = accounts[0]

        console.log('account::' , defaultAccount)

      // }

      // if (window.ethereum) {

        
      // await window.ethereum.enable()

        // Use Mist/MetaMask's provider.
        // web3 = new window.Web3(web3.currentProvider)
        web3 = new Web3(window.ethereum)
        let netId = await web3.eth.getChainId()

        // debugger

        // try {
        //   // 请求用户授权
        //   await window.ethereum.enable();
        // } catch (error) {
        //   // 用户不授权时
        //   console.error("User denied account access")
        //   }

        // web3.version.getNetwork((err, netId) => {
          // let netId = "65"
          let netIdName, trustApiName, explorerUrl;
          console.log('netId', netId);
          switch (netId) {
            case "1":
              netIdName = 'Foundation'
              trustApiName = 'api'
              explorerUrl = 'https://etherscan.io'
              console.log('This is Foundation', netId)
              break;
            case "3":
              netIdName = 'Ropsten'
              trustApiName = 'ropsten'
              explorerUrl = 'https://ropsten.etherscan.io'
              console.log('This is Ropsten', netId)
              break;
            case "4":
              netIdName = 'Rinkeby'
              trustApiName = 'rinkeby'
              explorerUrl = 'https://rinkeby.etherscan.io'
              console.log('This is Rinkeby', netId)
              break;
            case "42":
              netIdName = 'Kovan'
              trustApiName = 'kovan'
              explorerUrl = 'https://kovan.etherscan.io'
              console.log('This is Kovan', netId)
              break;
            case "99":
              netIdName = 'POA Core'
              trustApiName = 'poa'
              explorerUrl = 'https://poaexplorer.com'
              console.log('This is Core', netId)
              break;
            case "77":
              netIdName = 'POA Sokol'
              trustApiName = 'https://trust-sokol.herokuapp.com'
              explorerUrl = 'https://sokol.poaexplorer.com'
              console.log('This is Sokol', netId)
              break;
            case "128":
              netIdName = 'Heco TestNet '
              trustApiName = 'https://http-mainnet-node.huobichain.com'
              explorerUrl = 'https://hecoinfo.com'
              console.log('This is Sokol', netId)
              break;
            case "65":
              netIdName = 'Okex TestNet '
              trustApiName = 'https://exchaintestrpc.okex.org'
              explorerUrl = 'https://www.oklink.com/okexchain-test'
              console.log('This is Sokol', netId)
              break;
            case "66":
              netIdName = 'Okex MainNet '
              trustApiName = 'https://exchaintestrpc.okex.org'
              explorerUrl = 'https://www.oklink.com/okexchain-test'
              console.log('This is Okex MainNet', netId)
              break;
            default:
              netIdName = 'Unknown'
              console.log('This is an unknown network.', netId)
          }
          document.title = `${netIdName} - CoinDrop dApp`

          if(defaultAccount === null){
            reject({message: 'Please unlock your metamask and refresh the page'})
          }
          results = {
            web3Instance: web3,
            netIdName,
            netId,
            injectedWeb3: true,
            defaultAccount,
            trustApiName,
            explorerUrl
          }
          resolve(results)
        // })


      } else {
        // Fallback to localhost if no web3 injection.
        const errorMsg = `Metamask is not installed. Please go to
        https://metamask.io and return to this page after you installed it`
        reject({message: errorMsg})
        console.log('No web3 instance injected, using Local web3.');
        console.error('Metamask not found'); 
      }
    })
  })
}

export default getWeb3
