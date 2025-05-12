
import { createConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
import { http } from 'viem';
import { ConnectKitProvider, getDefaultConfig } from 'connectkit';

// Configure chains
export const chains = [mainnet, polygon, optimism, arbitrum, base];

// Create wagmi config
export const wagmiConfig = createConfig(
  getDefaultConfig({
    // Your app's info
    appName: "Dust Collector",
    // This should be your WalletConnect project ID
    walletConnectProjectId: "YOUR_WALLET_CONNECT_PROJECT_ID",
    // Correctly passing chains for both ConnectKit v1.x and wagmi v1.x
    chains: chains as any,
    transports: {
      [mainnet.id]: http(),
      [polygon.id]: http(),
      [optimism.id]: http(),
      [arbitrum.id]: http(),
      [base.id]: http(),
    },
  })
);
