
import { useCallback, useEffect, useState } from 'react';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';
import { formatAddress } from '@/services/walletService';

export function useWalletConnection() {
  const { address, isConnected } = useAccount();
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

  return {
    address,
    formattedAddress,
    isConnected,
    disconnect,
    chain
  };
}
