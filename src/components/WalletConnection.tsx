
import { useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { ConnectKitButton } from "connectkit";

interface WalletConnectionProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletAddress: string) => void;
}

export const WalletConnection = ({ isOpen, onClose, onConnect }: WalletConnectionProps) => {
  const { address } = useWalletConnection();
  const { toast } = useToast();

  // This will be triggered when address changes
  useEffect(() => {
    if (address) {
      onConnect(address);
    }
  }, [address, onConnect]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-2">Connect Wallet</DialogTitle>
          <DialogDescription className="text-center">
            Choose a wallet to connect and start collecting your dust
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4 justify-center">
          <ConnectKitButton />
        </div>
      </DialogContent>
    </Dialog>
  );
};
