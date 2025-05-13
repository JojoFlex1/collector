// wagmiConfig.ts

import { createConfig, http } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, base } from 'wagmi/chains';
// import { metaMask } from 'wagmi/connectors';
// import { coinbaseWallet } from 'wagmi/connectors';
import { injected } from 'wagmi/connectors';
// import { walletConnect } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains:[mainnet, polygon, optimism, arbitrum, base], // ✅ must be a non-empty readonly tuple [Chain, ...Chain[]]
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [optimism.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
  },
  ssr: true,
});
