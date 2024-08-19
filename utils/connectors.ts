import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { chain } from 'wagmi'

const APP_NAME = 'Mocaverse Gate'
const APP_LOGO_URL = 'https://ethereum.org/static/a110735dade3f354a46fc2446cd52476/f3a29/eth-home-icon.webp'

export const connectors = [
  new CoinbaseWalletConnector({
    chains: [chain.mainnet],
    options: {
      appName: APP_NAME,
      appLogoUrl: APP_LOGO_URL,
  }}),
  new MetaMaskConnector({
    chains: [chain.goerli],
    options: {
      shimChainChangedDisconnect: false,
    },
  }),
]
