
import { useState } from "react";
import { Hero } from "@/components/Hero";
import { WalletConnection } from "@/components/WalletConnection";
import { DustDashboard } from "@/components/DustDashboard";

const Index = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);

  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  const handleWalletConnected = (walletType: string) => {
    // In a real app, we would have the actual wallet address
    // For demo, we'll use a mock address
    setConnectedWallet(`0x71C7656EC7ab88b098defB751B7401B5f6d8976F`);
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {!connectedWallet ? (
          <Hero onConnectWallet={handleConnectWallet} />
        ) : (
          <DustDashboard 
            connectedWallet={connectedWallet}
            onDisconnect={handleDisconnect}
          />
        )}
      </div>

      {/* Wallet connection modal */}
      <WalletConnection
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={handleWalletConnected}
      />
    </div>
  );
};

export default Index;
