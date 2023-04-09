@ Resources
* https://academy.moralis.io/courses/javascript-programming-for-blockchain-developers

* [Goerli Faucet Websites](https://faucetlink.to/goerli)
* make an account here to get more eth https://goerlifaucet.com/



## Notes
* amount:Moralis.Units.ETH(".001"), actually transfers based on the eth in the wallet
* Get your Web3 Api Key from the Moralis dashboard:

O4DjtP9JzbtTh14CFClizeoDtDkzVt6al9kC2aNz1R63im9N5x4ERlZiHGuRheSl

notes for issue
https://github.com/ghiscoding/Angular-Slickgrid/issues/769#issuecomment-849573463

https://github.com/angular/angular-cli/issues/20819


##
```js
const web3ApiKey='O4DjtP9JzbtTh14CFClizeoDtDkzVt6al9kC2aNz1R63im9N5x4ERlZiHGuRheSl';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    'X-API-Key': web3ApiKey
  }
};
const address='0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
const chainId='0x3';
fetch(`https://deep-index.moralis.io/api/v2/${address}/balance?chain=${chainId}`, options)
.then(response => response.json())
.then(response => console.log(response))
.catch(err => console.error(err));
```

## [Auth Overivew](https://docs.moralis.io/reference/auth-api-overview)
* client application, connected to a Web3 wallet, calls your server application to request an authentication message, supplying wallet address, chain Id, and networ
* server app takes that and makes a EIP-4361 compliant message that the client application will sign.
* extra info will need to be provided in ChallengeRequestDto request.


## Python Metamask demo
you need to install meta mask onto your browser same with coinbase wallet
* create an account if not already


## [Connect to Moralis with vanillaJS](https://v1docs.moralis.io/moralis-dapp/connect-the-sdk/connect-with-js)
* [Create your server here](https://admin.moralis.io/dapps)



## [Connect wallet with vanillaJS]()

* [Configure project to interact with walletconnect](https://docs.walletconnect.com/2.0/web3modal/configuration)
