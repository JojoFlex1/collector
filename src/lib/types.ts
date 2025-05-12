
export interface DustToken {
  id: string;
  symbol: string;
  name: string;
  chain: string;
  balance: number;
  usdValue: number;
}

export interface Transaction {
  id: string;
  date: string;
  tokensCollected: number;
  chainsUsed: string[];
  usdcReceived: number;
}
