"use client"

import type React from "react"
import { useMemo } from "react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { WalletProvider as CustomWalletProvider } from "@/lib/wallet-context"

// Import Solana wallet adapter styles
import "@solana/wallet-adapter-react-ui/styles.css"

interface WalletProvidersProps {
  children: React.ReactNode
}

export default function WalletProviders({ children }: WalletProvidersProps) {
  // Set up Solana network and endpoint
  const network = WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  // Set up supported wallets
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>
          <CustomWalletProvider>{children}</CustomWalletProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
