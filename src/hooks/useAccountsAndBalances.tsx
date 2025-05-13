// hooks/useAccountsAndBalances.ts
import { useEffect, useState } from "react";
import { useWalletClient, usePublicClient } from "wagmi";
import { formatEther } from "viem";

export const useAccountsAndBalances = () => {
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const [accounts, setAccounts] = useState<
    { address: string; balance: string }[]
  >([]);

  useEffect(() => {
    const fetchAccountsAndBalances = async () => {
      if (!walletClient || !publicClient) return;

      try {
        const addresses = await walletClient.requestAddresses();

        const balances = await Promise.all(
          addresses.map(async (address) => {
            const balance = await publicClient.getBalance({ address });
            return { address, balance: formatEther(balance) };
          })
        );

        setAccounts(balances);
      } catch (err) {
        console.error("Failed to fetch accounts and balances", err);
      }
    };

    fetchAccountsAndBalances();
  }, [walletClient, publicClient]);

  return accounts;
};
