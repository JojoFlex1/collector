
import { DustToken, Transaction } from "./types";

// Mock dust tokens data
export const mockDustData: DustToken[] = [
  {
    id: "eth-usdt",
    symbol: "USDT",
    name: "Tether USD",
    chain: "Ethereum",
    balance: 1.23,
    usdValue: 1.23
  },
  {
    id: "eth-link",
    symbol: "LINK",
    name: "Chainlink",
    chain: "Ethereum",
    balance: 0.12,
    usdValue: 1.85
  },
  {
    id: "polygon-matic",
    symbol: "MATIC",
    name: "Polygon",
    chain: "Polygon",
    balance: 2.45,
    usdValue: 0.98
  },
  {
    id: "polygon-aave",
    symbol: "AAVE",
    name: "Aave",
    chain: "Polygon",
    balance: 0.015,
    usdValue: 1.12
  },
  {
    id: "arbitrum-arb",
    symbol: "ARB",
    name: "Arbitrum",
    chain: "Arbitrum",
    balance: 0.53,
    usdValue: 0.76
  },
  {
    id: "bnb-cake",
    symbol: "CAKE",
    name: "PancakeSwap",
    chain: "BNB",
    balance: 0.21,
    usdValue: 0.65
  },
  {
    id: "optimism-op",
    symbol: "OP",
    name: "Optimism",
    chain: "Optimism",
    balance: 0.31,
    usdValue: 0.43
  },
  {
    id: "eth-eth",
    symbol: "ETH",
    name: "Ethereum",
    chain: "Ethereum",
    balance: 0.00021,
    usdValue: 0.42
  },
  {
    id: "base-dai",
    symbol: "DAI",
    name: "Dai Stablecoin",
    chain: "Base",
    balance: 0.37,
    usdValue: 0.37
  }
];

// Mock transaction history
export const mockTransactionHistory: Transaction[] = [
  {
    id: "tx-1",
    date: "2025-05-10T14:32:11Z",
    tokensCollected: 4,
    chainsUsed: ["Ethereum", "Polygon"],
    usdcReceived: 3.64
  },
  {
    id: "tx-2", 
    date: "2025-05-01T09:15:33Z", 
    tokensCollected: 2,
    chainsUsed: ["BNB"],
    usdcReceived: 1.12
  }
];
