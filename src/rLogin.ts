import RLogin from '@rsksmart/rlogin'
import WalletConnectProvider from '@walletconnect/web3-provider'

export const rLogin = new RLogin({
  cacheProvider: false,
  providerOptions: {
    injected: {
      id: 'injected',
      name: 'Web3!!!!!!!!!!!!!',
      type: 'injected',
      check: 'isWeb3'
    },
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          30: 'https://did.rsk.co:4444',
          31: 'https://did.testnet.rsk.co:4444'
        }
      }
    }
  },
  supportedChains: [30, 31]
})
