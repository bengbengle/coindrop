![Demo](demo.gif)
# Problem:
Previously in Ethereum Network, additional tools were required in order to transfer many ERC20 tokens at once.
Many people still do this manually, one transaction at a time. This process is time consuming and prone to an error.

# Solution:
This Dapp allows a user to send thousands of token transfers in a very effecient way by batching them in groups of 145 token transfers per Ethereum transaction. This automation saves time by automatically generating transactions to MetaMask. Finally, this tool allows a user to maintain security of their account by delegating the trust of their private keys to a secure MetaMask wallet.

# How to use:
1. Install [Metamask](https://metamask.io).
2. Make sure you have an account in MetaMask which has a token balance.
3. Make sure your MetaMask is pointed to the network that you would like to use.
4. Make sure your MetaMask account is unlocked.
5. Go to https://bengbengle.github.io/coindrop/#/
6. Wait for the full page to load.
7. Select a token from the dropdown that you would like to send.
8. Provide either JSON or CSV text in the textarea (see example below).
9. Click next.
10. If everything looks good, click next once again.
11. Wait for MetaMask to generate an approval transaction.
12. Once the approval transaction is mined, MetaMask will generate as many transactions as needed for your token transfers (175 addresses per tx).
13. Done!

You can test this tool on any test network, if you want to make sure that
everything will work as expected.

Contracts deployed:  
Mainnet, Rinkeby, Kovan, Ropsten, Sokol, CORE-POA:  

ProxyStorage: 0xa5025faba6e70b84f74e9b1113e5f7f4e7f4859f  
Implementation: 0x97f76edb9d631590558b5c23f27a2a4711c0c964  

<!-- 0x8C79710A3D6FBE92dE7B51BB09C3DeA61837F83E -->
<!-- 0xe8cf1102266d0fb4271cdb2c05d3b6bfec1e0612 -->
Example JSON:
```json

[
  {"0xB26D1CD9500e692952741e79daB3535A1AC86B04":"0.1"},
  {"0x0Ba2b371b887267D309dDeb227710095b2b3F70A":"1"},
  {"0x11EaB3b17841818BbB6329D811cAD9a02f0a6517":"1.049"},
  {"0xe95877899E4DDC53F95a1A67373D126435398EaB":"0.2"}
]
```
Example CSV:
```csv
0xB26D1CD9500e692952741e79daB3535A1AC86B04,12
0x0Ba2b371b887267D309dDeb227710095b2b3F70A,12
0x11EaB3b17841818BbB6329D811cAD9a02f0a6517,1.049
0xe95877899E4DDC53F95a1A67373D126435398EaB,14546
```
```
Proof of work:
https://etherscan.io/tx/0x2fd09c03609f3f34a326983f1c685ea1bcb87dfcaabc12932dbe38d2c453f2c8
https://kovan.etherscan.io/tx/0x755b84a8a61fd82c1410f6bbbb452c94ddf12fac5b1daaa1496671bcd6e21882

```

# Disclaimer
This tool is not affiliated with https://poa.network
This is a personal project of Roman Storm.

He is not responsible for any loss from transactions derived by CoinDrop.  Some of the underlying JavaScript libraries and Ethereum tools that were used are under active development. The website and smart contract has been thoroughly tested, there is always the possibility something unexpected happens resulting in losses of Ethereum and/or tokens.

Any ERC20 tokens you transfer to the Coindrop will be sent out to the addresses that you provided.

The smart contract source code can be audited by anyone in this repository.

I encourage you to assess its security before using the Mutlisender Dapp.