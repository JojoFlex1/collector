
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const walletOptions = [
  { id: "metamask", name: "MetaMask", icon: "📱" },
  { id: "walletconnect", name: "WalletConnect", icon: "🔗" },
  { id: "coinbase", name: "Coinbase Wallet", icon: "💰" }
];

interface WalletConnectionProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

export const WalletConnection = ({ isOpen, onClose, onConnect }: WalletConnectionProps) => {
  const [connecting, setConnecting] = useState(false);
  const { toast } = useToast();

  const handleConnect = async (walletId: string) => {
    setConnecting(true);
    
    // Simulate wallet connection (in a real app, this would use actual web3 libraries)
    setTimeout(() => {
      setConnecting(false);
      onConnect(walletId);
      
      toast({
        title: "Wallet Connected",
        description: `Successfully connected with ${walletId}`,
        action: <ToastAction altText="OK">OK</ToastAction>,
      });
      
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-2">Connect Wallet</DialogTitle>
          <DialogDescription className="text-center">
            Choose a wallet to connect and start collecting your dust
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {walletOptions.map((wallet) => (
            <Button
              key={wallet.id}
              onClick={() => handleConnect(wallet.id)}
              disabled={connecting}
              variant="outline"
              size="lg"
              className="flex justify-start items-center space-x-3 h-14 px-4 hover:bg-muted"
            >
              <span className="text-2xl">{wallet.icon}</span>
              <span className="font-medium">{wallet.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
