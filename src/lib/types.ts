
// export interface DustToken {
//   id: string;
//   symbol: string;
//   name: string;
//   chain: string;
//   balance: number;
//   usdValue: number;
// }
export interface DustToken {
  id: string;
  symbol: string;
  balance: number;
  chain: string;
  usdValue: number;
  contractAddress: string;
  decimals: number;
  name: string;
  address: string; // wallet address
}

export interface Transaction {
  id: string;
  date: string;
  tokensCollected: number;
  chainsUsed: string[];
  usdcReceived: number;
}
