import { parseUnits } from "viem";
import { readContract, writeContract, getAccount } from "wagmi/actions";
import { DustCollectorABI } from "@/lib/contracts";

export const CONTRACT_ADDRESS = "0x6C9E083067FB6376d4eA5E3Da05E3ee3965757A3";

export interface TokenBalance {
  address: string;
  symbol: string;
  balance: string;
  usdValue: number;
  chain: string;
  id: string;
}

// Helper function to format addresses for display
export const formatAddress = (address: string): string => {
  if (!address) return "";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Get token balances below a threshold
export const getDustTokens = async (
  address: string,
  dustThreshold: number = 1.0
): Promise<TokenBalance[]> => {
  try {
    // In a real implementation, you would fetch tokens from the contract
    // For now we'll keep the mock data but in the next iteration we'll implement real contract calls
    return [
      {
        id: "eth-dai",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F", // DAI
        symbol: "DAI",
        balance: "0.5",
        usdValue: 0.50,
        chain: "Ethereum"
      },
      {
        id: "polygon-usdc",
        address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC
        symbol: "USDC",
        balance: "0.75",
        usdValue: 0.75,
        chain: "Polygon"
      },
      {
        id: "arbitrum-wbtc",
        address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", // WBTC
        symbol: "WBTC",
        balance: "0.00001",
        usdValue: 0.35,
        chain: "Arbitrum"
      },
      {
        id: "base-usdc",
        address: "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA", // Base USDC
        symbol: "USDC",
        balance: "0.32",
        usdValue: 0.32,
        chain: "Base"
      }
    ].filter(token => token.usdValue <= dustThreshold);
  } catch (error) {
    console.error("Error getting dust tokens:", error);
    return [];
  }
};

// Deposit dust tokens
export const depositDustTokens = async (
  tokenAddresses: string[],
  amounts: string[]
): Promise<boolean> => {
  try {
    if (tokenAddresses.length === 0 || tokenAddresses.length !== amounts.length) {
      throw new Error("Invalid input parameters");
    }

    const account = getAccount();
    if (!account.address) {
      throw new Error("No wallet connected");
    }

    await writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: DustCollectorABI,
      functionName: 'batchDeposit',
      args: [
        tokenAddresses as `0x${string}`[], 
        amounts.map(amount => parseUnits(amount, 18))
      ],
      account: account.address
    });

    return true;
  } catch (error) {
    console.error("Error depositing dust tokens:", error);
    return false;
  }
};

// Withdraw as ETH
export const withdrawAsEth = async (tokenAddresses: string[]): Promise<boolean> => {
  try {
    const account = getAccount();
    if (!account.address) {
      throw new Error("No wallet connected");
    }

    await writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: DustCollectorABI,
      functionName: 'withdrawAsEth',
      args: [tokenAddresses as `0x${string}`[]],
      account: account.address
    });
    
    return true;
  } catch (error) {
    console.error("Error withdrawing as ETH:", error);
    return false;
  }
};

// Donate tokens
export const donateDust = async (tokenAddresses: string[]): Promise<boolean> => {
  try {
    const account = getAccount();
    if (!account.address) {
      throw new Error("No wallet connected");
    }

    await writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: DustCollectorABI,
      functionName: 'donateAll',
      args: [tokenAddresses as `0x${string}`[]],
      account: account.address
    });
    
    return true;
  } catch (error) {
    console.error("Error donating dust:", error);
    return false;
  }
};

// Get user balance for a specific token
export const getUserBalance = async (userAddress: string, tokenAddress: string): Promise<string> => {
  try {
    const result = await readContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: DustCollectorABI,
      functionName: 'getUserBalance',
      args: [userAddress as `0x${string}`, tokenAddress as `0x${string}`],
    });
    
    return result.toString();
  } catch (error) {
    console.error("Error getting user token balance:", error);
    return "0";
  }
};
