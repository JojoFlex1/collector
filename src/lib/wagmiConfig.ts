
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { connectorsForWallets } from 'connectkit';
import { 
  metaMaskWallet,
  walletConnectWallet,
  coinbaseWallet,
  injectedWallet 
} from 'connectkit/wallets';

// Configure chains
export const chains = [mainnet, polygon, optimism, arbitrum, base];

// Configure wallets
const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ chains, appName: 'Dust Collector' }),
      walletConnectWallet({ chains, projectId: 'dust-collector-app' }),
      injectedWallet({ chains }),
    ],
  }
]);

// Create wagmi config
export const wagmiConfig = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  connectors,
});
