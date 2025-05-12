
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { publicProvider } from 'wagmi/providers/public';

// Configure chains & providers
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, base],
  [publicProvider()]
);

// Set up connectors
export const connectors = [
  new MetaMaskConnector({ chains }),
  new CoinbaseWalletConnector({
    chains,
    options: {
      appName: 'Dust Collector',
    },
  }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: 'dust-collector-app', // In production, use a real project ID from WalletConnect
    },
  }),
  new InjectedConnector({
    chains,
    options: {
      name: 'Other Wallets',
      shimDisconnect: true,
    },
  }),
];

// Create wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
