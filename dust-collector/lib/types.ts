// Define types for the application

// Wallet types
export type WalletType = "metamask" | "solana"

export interface ConnectedWallet {
  id: string
  name: string
  address: string
  connected: boolean
  type: WalletType
  balance?: string
}

// Dust balance types
export interface DustBalance {
  id: number
  token: string
  amount: string
  value: number
  network: string
  selected: boolean
}

// Chart data type
export interface ChartData {
  name: string
  value: number
  color: string
}

// Transaction types
export interface Transaction {
  id: string
  type: string
  timestamp: number
  amount: string
  token: string
  value: number
}
