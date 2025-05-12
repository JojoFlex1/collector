
import { DustToken, Transaction } from "./types";

// Mock wallet data
export const mockWallets = [
  {
    id: "ethereum",
    name: "Ethereum Wallet",
    address: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
    shortAddress: "0x1a2...3b4c",
    icon: "M",
    connected: false
  },
  {
    id: "solana",
    name: "Solana Wallet",
    address: "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdef",
    shortAddress: "ABCD...EFGH",
    icon: "S",
    connected: false
  }
];

// Mock dust tokens data
export const mockDustTokens: DustToken[] = [
  {
    id: "eth-dust",
    symbol: "ETH",
    name: "Ethereum",
    chain: "Ethereum",
    balance: 0.00021,
    usdValue: 0.42
  },
  {
    id: "usdt-dust",
    symbol: "USDT",
    name: "Tether USD",
    chain: "Ethereum",
    balance: 0.54,
    usdValue: 0.54
  },
  {
    id: "link-dust",
    symbol: "LINK",
    name: "Chainlink",
    chain: "Ethereum",
    balance: 0.028,
    usdValue: 0.28
  }
];

// Mock processing steps
export const mockProcessingSteps = [
  {
    id: 1,
    label: "Collecting dust from connected wallets",
    completed: false,
    active: false
  },
  {
    id: 2,
    label: "Optimizing batch transactions",
    completed: false,
    active: false
  },
  {
    id: 3,
    label: "Processing batch transactions",
    completed: false,
    active: false
  },
  {
    id: 4,
    label: "Transferring to Base via bridge",
    completed: false,
    active: false
  },
  {
    id: 5,
    label: "Complete",
    completed: false,
    active: false
  }
];

// Mock transaction history
export const mockTransactionHistory: Transaction[] = [];
