"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useWallet } from "@solana/wallet-adapter-react"

// Define types for the application

// Wallet types
export type WalletType = "metamask" | "phantom"

export interface ConnectedWallet {
  id: string
  name: string
  address: string
  connected: boolean
  type: WalletType
}

interface WalletContextType {
  wallets: ConnectedWallet[]
  connectMetaMask: () => Promise<void>
  connectPhantom: () => void
  disconnectWallet: (id: string) => void
  isConnecting: boolean
  error: string | null
}

const WalletContext = createContext<WalletContextType>({
  wallets: [],
  connectMetaMask: async () => {},
  connectPhantom: () => {},
  disconnectWallet: () => {},
  isConnecting: false,
  error: null,
})

export const useWalletContext = () => useContext(WalletContext)

interface WalletProviderProps {
  children: ReactNode
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [wallets, setWallets] = useState<ConnectedWallet[]>([])
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const solanaWallet = useWallet()

  // Check for existing MetaMask connection on mount
  useEffect(() => {
    const checkMetaMask = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          // Check if already connected
          const accounts = await window.ethereum.request({ method: "eth_accounts" })
          if (accounts && accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: "eth_chainId" })
            const networkName = getNetworkName(chainId)

            setWallets((prev) => [
              ...prev.filter((w) => w.type !== "metamask"),
              {
                id: "metamask-" + accounts[0],
                name: `${networkName} (MetaMask)`,
                address: accounts[0],
                connected: true,
                type: "metamask",
              },
            ])
          }
        } catch (err) {
          console.error("Error checking MetaMask connection:", err)
        }
      }
    }

    checkMetaMask()
  }, [])

  // Listen for Solana wallet connection changes (for Phantom)
  useEffect(() => {
    if (solanaWallet.connected && solanaWallet.publicKey) {
      const publicKeyStr = solanaWallet.publicKey.toString()

      setWallets((prev) => {
        // Check if this wallet is already in the list
        const exists = prev.some((w) => w.address === publicKeyStr && w.type === "phantom")
        if (exists) {
          return prev.map((w) => (w.address === publicKeyStr && w.type === "phantom" ? { ...w, connected: true } : w))
        } else {
          return [
            ...prev,
            {
              id: "phantom-" + publicKeyStr,
              name: "Phantom Wallet",
              address: publicKeyStr,
              connected: true,
              type: "phantom",
            },
          ]
        }
      })
    } else {
      // Mark Phantom wallets as disconnected
      setWallets((prev) => prev.map((w) => (w.type === "phantom" ? { ...w, connected: false } : w)))
    }
  }, [solanaWallet.connected, solanaWallet.publicKey])

  // Connect to MetaMask
  const connectMetaMask = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setError("MetaMask not installed. Please install MetaMask to continue.")
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      const chainId = await window.ethereum.request({ method: "eth_chainId" })
      const networkName = getNetworkName(chainId)

      if (accounts && accounts.length > 0) {
        setWallets((prev) => [
          ...prev.filter((w) => w.type !== "metamask" || w.address !== accounts[0]),
          {
            id: "metamask-" + accounts[0],
            name: `${networkName} (MetaMask)`,
            address: accounts[0],
            connected: true,
            type: "metamask",
          },
        ])
      }
    } catch (err: any) {
      console.error("Error connecting to MetaMask:", err)
      setError(err.message || "Failed to connect to MetaMask")
    } finally {
      setIsConnecting(false)
    }
  }

  // Connect to Phantom wallet
  const connectPhantom = () => {
    if (solanaWallet.wallet) {
      solanaWallet.connect()
    } else {
      setError("Phantom wallet not installed. Please install Phantom to continue.")
    }
  }

  // Disconnect wallet
  const disconnectWallet = (id: string) => {
    const wallet = wallets.find((w) => w.id === id)

    if (wallet) {
      if (wallet.type === "phantom" && solanaWallet.connected) {
        solanaWallet.disconnect()
      }

      setWallets((prev) => prev.map((w) => (w.id === id ? { ...w, connected: false } : w)))
    }
  }

  // Helper function to get network name from chainId
  const getNetworkName = (chainId: string): string => {
    switch (chainId) {
      case "0x1":
        return "Ethereum"
      case "0x89":
        return "Polygon"
      case "0xa":
        return "Optimism"
      case "0xa4b1":
        return "Arbitrum"
      case "0x2105":
        return "Base"
      default:
        return "Unknown Network"
    }
  }

  // Listen for account and chain changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected all accounts
          setWallets((prev) => prev.filter((w) => w.type !== "metamask"))
        } else {
          // Account changed
          window.ethereum.request({ method: "eth_chainId" }).then((chainId: string) => {
            const networkName = getNetworkName(chainId)

            setWallets((prev) => [
              ...prev.filter((w) => w.type !== "metamask"),
              {
                id: "metamask-" + accounts[0],
                name: `${networkName} (MetaMask)`,
                address: accounts[0],
                connected: true,
                type: "metamask",
              },
            ])
          })
        }
      }

      const handleChainChanged = (chainId: string) => {
        // Chain changed, update wallet info
        window.ethereum.request({ method: "eth_accounts" }).then((accounts: string[]) => {
          if (accounts && accounts.length > 0) {
            const networkName = getNetworkName(chainId)

            setWallets((prev) => [
              ...prev.filter((w) => w.type !== "metamask"),
              {
                id: "metamask-" + accounts[0],
                name: `${networkName} (MetaMask)`,
                address: accounts[0],
                connected: true,
                type: "metamask",
              },
            ])
          }
        })
      }

      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)

      return () => {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        wallets,
        connectMetaMask,
        connectPhantom,
        disconnectWallet,
        isConnecting,
        error,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
