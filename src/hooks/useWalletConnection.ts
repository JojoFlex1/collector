
import { useCallback, useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useNetwork } from 'wagmi';
import { formatAddress } from '@/services/walletService';

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading } = useConnect();
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const [formattedAddress, setFormattedAddress] = useState<string>('');

  useEffect(() => {
    if (address) {
      setFormattedAddress(formatAddress(address));
    } else {
      setFormattedAddress('');
    }
  }, [address]);

  const connectWallet = useCallback((connectorId: string) => {
    const connector = connectors.find(c => c.id === connectorId);
    if (connector) {
      connect({ connector });
    }
  }, [connect, connectors]);

  return {
    address,
    formattedAddress,
    isConnected,
    connectWallet,
    disconnect,
    chain,
    connectors,
    isLoading,
    error
  };
}
