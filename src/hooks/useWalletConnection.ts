
import { useCallback, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { formatAddress } from '@/services/walletService';

export function useWalletConnection() {
  const { address, isConnected,chain } = useAccount();
  const { disconnect } = useDisconnect();
  const [formattedAddress, setFormattedAddress] = useState<string>('');

  useEffect(() => {
    if (address) {
      setFormattedAddress(formatAddress(address));
    } else {
      setFormattedAddress('');
    }
  }, [address]);

  return {
    address,
    formattedAddress,
    isConnected,
    disconnect,
    chain
  };
}
