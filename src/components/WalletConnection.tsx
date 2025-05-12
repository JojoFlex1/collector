
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { Wallet, Plus, Link } from "lucide-react";

interface WalletConnectionProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletAddress: string) => void;
}

export const WalletConnection = ({ isOpen, onClose, onConnect }: WalletConnectionProps) => {
  const { isLoading, connectWallet, address, connectors } = useWalletConnection();
  const { toast } = useToast();

  const handleConnect = async (connectorId: string) => {
    try {
      connectWallet(connectorId);
      
      // The actual connection happens asynchronously through wagmi hooks
      // We'll rely on the useEffect in the parent component to detect the connection
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Error",
        description: "Could not connect wallet. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  // Map connectors to our wallet options format
  const walletOptions = connectors.map(connector => {
    let icon = <Plus />;
    
    if (connector.id === 'metaMask') {
      icon = <Wallet />;
    } else if (connector.id === 'walletConnect') {
      icon = <Link />;
    } else if (connector.id === 'coinbaseWallet') {
      icon = <Wallet />;
    }
    
    return {
      id: connector.id,
      name: connector.name,
      icon
    };
  });

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
              disabled={isLoading}
              variant="outline"
              size="lg"
              className="flex justify-start items-center space-x-3 h-14 px-4 hover:bg-muted"
            >
              <div className="text-2xl mr-2">{wallet.icon}</div>
              <span className="font-medium">{wallet.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
