
import { parseUnits } from "viem";
import { useAccount, useContractRead, useContractWrite } from "wagmi";
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
    // For now we'll keep the mock data until we implement real contract calls
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

// Hooks for contract interactions
export function useContractActions() {
  const { address } = useAccount();
  
  // Use contract write for deposit operation with proper typing
  const { write: depositWrite } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: DustCollectorABI,
    functionName: 'batchDeposit',
  });
  
  // Use contract write for withdraw operation with proper typing
  const { write: withdrawWrite } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: DustCollectorABI,
    functionName: 'withdrawAsEth',
  });
  
  // Use contract write for donate operation with proper typing
  const { write: donateWrite } = useContractWrite({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: DustCollectorABI,
    functionName: 'donateAll',
  });

  // Deposit dust tokens
  const depositDustTokens = async (
    tokenAddresses: string[],
    amounts: string[]
  ): Promise<boolean> => {
    try {
      if (tokenAddresses.length === 0 || tokenAddresses.length !== amounts.length) {
        throw new Error("Invalid input parameters");
      }

      if (!address) {
        throw new Error("No wallet connected");
      }

      // Call depositWrite with the correct structure
      if (depositWrite) {
        depositWrite({
          args: [
            tokenAddresses as `0x${string}`[], 
            amounts.map(amount => parseUnits(amount, 18))
          ],
        });
      }

      return true;
    } catch (error) {
      console.error("Error depositing dust tokens:", error);
      return false;
    }
  };

  // Withdraw as ETH
  const withdrawAsEth = async (tokenAddresses: string[]): Promise<boolean> => {
    try {
      if (!address) {
        throw new Error("No wallet connected");
      }

      // Call withdrawWrite with the correct structure
      if (withdrawWrite) {
        withdrawWrite({
          args: [tokenAddresses as `0x${string}`[]],
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error withdrawing as ETH:", error);
      return false;
    }
  };

  // Donate tokens
  const donateDust = async (tokenAddresses: string[]): Promise<boolean> => {
    try {
      if (!address) {
        throw new Error("No wallet connected");
      }

      // Call donateWrite with the correct structure
      if (donateWrite) {
        donateWrite({
          args: [tokenAddresses as `0x${string}`[]],
        });
      }
      
      return true;
    } catch (error) {
      console.error("Error donating dust:", error);
      return false;
    }
  };

  return {
    depositDustTokens,
    withdrawAsEth,
    donateDust
  };
}

// Hook for reading contract data
export function useContractReads() {
  const { data: userData, isLoading, error } = useContractRead({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: DustCollectorABI,
    functionName: 'getUserBalance',
    args: ["0x0000000000000000000000000000000000000000" as `0x${string}`, "0x0000000000000000000000000000000000000000" as `0x${string}`]
  });

  // Get user balance for a specific token
  const getUserBalance = async (userAddress: string, tokenAddress: string): Promise<string> => {
    try {
      const result = useContractRead({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: DustCollectorABI,
        functionName: 'getUserBalance',
        args: [userAddress as `0x${string}`, tokenAddress as `0x${string}`]
      });
      
      return result.data ? result.data.toString() : "0";
    } catch (error) {
      console.error("Error getting user token balance:", error);
      return "0";
    }
  };

  return {
    getUserBalance,
    isLoading,
    error
  };
}
