import { parseUnits } from "viem";
import { ethers } from "ethers";
import axios from "axios";
import { Alchemy, Network } from 'alchemy-sdk';

const CONTRACT_ADDRESS = "0x6C9E083067FB6376d4eA5E3Da05E3ee3965757A3";
const ALLOWED_SYMBOLS = ['ETH', 'USDC', 'USDT', 'DAI', 'WBTC', 'WETH']; 
const NATIVE_TOKEN_CONTRACTS: Record<string, string> = {
  base: '0x4200000000000000000000000000000000000006',
  ethereum: '0xC02aaA39b223FE8D0A0E5C4F27eAD9083C756Cc2', // WETH
  polygon: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619', // WETH
  bnb: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8', // ETH on BNB
};

export interface TokenBalance {
  address: string;
  symbol: string;
  balance: string;
  usdValue: number;
  chain: string;
  id: string;
}

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

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3/simple/token_price";

async function getUSDPrice(tokenAddress: string, chain: string): Promise<number> {
  try {
    const platform = chain.split('_')[0].toLowerCase();

    const response = await axios.get(
      `${COINGECKO_API_URL}/${platform}?contract_addresses=${tokenAddress}&vs_currencies=usd`
    );
    console.log(response)
    return response.data[tokenAddress.toLowerCase()]?.usd ?? 0;
  } catch (error) {
    console.error(`Error fetching price for ${tokenAddress} on ${chain}:`, error);
    return 0;
  }
}

// export async function getDustTokensForWallet(
//   address: string,
//   DUST_THRESHOLD: number,
//   chain: string
// ): Promise<DustToken[]> {
//   const alchemy = new Alchemy({
//     apiKey: 'qUnLRqgOSGvq_x5RFT2TYj9Szq1C5ecE',
//     network: Network[chain.toUpperCase() as keyof typeof Network], // dynamic chain handling
//   });

//   const response = await alchemy.core.getTokenBalances(address);
//   console.log(address)
//   console.log(response)
//   const dustTokens: DustToken[] = [];

//   for (const tokenBalance of response.tokenBalances) {
//     const { contractAddress, tokenBalance: rawBalance } = tokenBalance;
//     if (!rawBalance || rawBalance === '0') continue;

//     try {
//       const metadata = await alchemy.core.getTokenMetadata(contractAddress);
//       const decimals = metadata.decimals ?? 18;
//       const symbol = metadata.symbol || '';
//       const name = metadata.name || '';
//       const balance = parseFloat(ethers.formatUnits(rawBalance, decimals));
//       let usdValue = 0;
//       if (!ALLOWED_SYMBOLS.includes(symbol)) continue;

//       console.log(name)
//       console.log(contractAddress)
//       console.log(symbol)
//       console.log(balance)

//       // Fetch USD value for the token using Coingecko
//       if(balance > 0){
//         // usdValue = await getUSDPrice(contractAddress, chain);
//       }
      

//       if (usdValue > 0 && usdValue < DUST_THRESHOLD) {
//         dustTokens.push({
//           id: `${address}-${contractAddress}`,
//           address,
//           symbol,
//           name,
//           balance,
//           usdValue,
//           decimals,
//           contractAddress,
//           chain,
//         });
//       }
//     } catch (error) {
//       console.warn(`Failed to fetch metadata for ${contractAddress}`, error);
//     }
//   }

//   return dustTokens;
// }

export async function getDustTokensForWallet(
  address: string,
  DUST_THRESHOLD: number,
  chain: string
): Promise<DustToken[]> {
  const alchemy = new Alchemy({
    apiKey: 'qUnLRqgOSGvq_x5RFT2TYj9Szq1C5ecE',
    network: Network[chain.toUpperCase() as keyof typeof Network], // dynamic chain handling
  });

  const dustTokens: DustToken[] = [];


  // 2. Handle ERC-20 Tokens
  const response = await alchemy.core.getTokenBalances(address);
  for (const tokenBalance of response.tokenBalances) {
    const { contractAddress, tokenBalance: rawBalance } = tokenBalance;
    if (!rawBalance || rawBalance === '0x0') continue;

    try {
      const metadata = await alchemy.core.getTokenMetadata(contractAddress);
      const decimals = metadata.decimals ?? 18;
      const symbol = metadata.symbol || '';
      const name = metadata.name || '';
      const balance = parseFloat(ethers.formatUnits(rawBalance, decimals));

      if (!ALLOWED_SYMBOLS.includes(symbol)) continue;
       if (ALLOWED_SYMBOLS.includes('ETH') ||ALLOWED_SYMBOLS.includes('WETH') && NATIVE_TOKEN_CONTRACTS[chain.toLowerCase()]) {
          try {
            const nativeContract = NATIVE_TOKEN_CONTRACTS[chain.toLowerCase()];
            const rawEthBalance = await alchemy.core.getBalance(address);
            const ethBalance = parseFloat(ethers.formatEther(rawEthBalance.toString()));

            const ethUsd = await getUSDPrice(contractAddress, chain);
            
            const ethUsdValue = ethBalance * ethUsd;
            console.log("eth usd")
            console.log(ethUsdValue)

            if (ethUsdValue > 0 && ethUsdValue < DUST_THRESHOLD) {
              dustTokens.push({
                id: `${address}-native-eth`,
                address,
                symbol: 'ETH',
                name: 'Ethereum',
                balance: ethBalance,
                usdValue: ethUsdValue,
                decimals: 18,
                contractAddress: nativeContract,
                chain,
              });
            }
          } catch (error) {
            console.warn('Failed to fetch native ETH balance:', error);
          }
        }

      const usdPrice = await getUSDPrice(contractAddress, chain);
      const usdValue = balance * usdPrice;
      console.log("USD PRICE2")
      console.log(balance)
      console.log(usdValue)

      if (usdValue > 0 && usdValue < DUST_THRESHOLD) {
        dustTokens.push({
          id: `${address}-${contractAddress}`,
          address,
          symbol,
          name,
          balance,
          usdValue,
          decimals,
          contractAddress,
          chain,
        });
      }
    } catch (error) {
      console.warn(`Failed to fetch metadata for ${contractAddress}`, error);
    }
  }

  return dustTokens;
}

export const getDustTokens = async (
  address: string,
  dustThreshold: number = 1.0,
  chain: string = "ethereum"
): Promise<TokenBalance[]> => {
  try {
    const dustTokens = await getDustTokensForWallet(address, dustThreshold, chain);
    return dustTokens.map((token) => ({
      id: token.id,
      address: token.address,
      symbol: token.symbol,
      balance: token.balance.toString(),
      usdValue: token.usdValue,
      chain: token.chain,
    }));
  } catch (error) {
    console.error("Error getting dust tokens:", error);
    return [];
  }
};

// Helper function to format addresses for display
export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
