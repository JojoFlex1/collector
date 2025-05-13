// hooks/useWalletManager.ts
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export interface WalletItem {
  id: string;
  name: string;
  address: string;
  shortAddress: string;
  icon: string;
  connected: boolean;
}

export const useWalletManager = () => {
  const [wallets, setWallets] = useState<WalletItem[]>([]);

  const fetchAccounts = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();

        const newWallets = await Promise.all(
          accounts.map(async (signer, index) => {
            const address = await signer.getAddress();
            return {
              id: address,
              name: `Wallet ${index + 1}`,
              address,
              shortAddress: `${address.slice(0, 6)}...${address.slice(-4)}`,
              icon: '🪙',
              connected: true,
            };
          })
        );

        setWallets(newWallets);
      } catch (error) {
        console.error('Failed to fetch accounts:', error);
      }
    }
  };

  const handleConnect = (walletId: string) => {
    console.log('Connecting to wallet:', walletId);
    // Optional: logic to reconnect
  };

  const handleDisconnect = (walletId: string) => {
    console.log('Disconnecting from wallet:', walletId);
    setWallets(prev =>
      prev.map(wallet =>
        wallet.id === walletId ? { ...wallet, connected: false } : wallet
      )
    );
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return {
    wallets,
    connectWallet: handleConnect,
    disconnectWallet: handleDisconnect,
    refreshWallets: fetchAccounts,
  };
};
