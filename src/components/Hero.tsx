
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onConnectWallet: () => void;
}

export const Hero = ({ onConnectWallet }: HeroProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12 text-center animate-fade-in">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold">
          <span className="text-gradient-blue">Dust</span>
          <span className="text-gradient-purple">Collector</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
          Recover value from your forgotten crypto dust across multiple chains
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <div className="glass-card p-6 rounded-lg">
          <div className="text-web3-blue text-xl font-bold mb-2">Connect</div>
          <p className="text-sm text-muted-foreground">Link your wallets to discover dust across chains</p>
        </div>
        
        <div className="glass-card p-6 rounded-lg">
          <div className="text-web3-purple text-xl font-bold mb-2">Collect</div>
          <p className="text-sm text-muted-foreground">Batch-transfer your dust to a low-fee network</p>
        </div>
        
        <div className="glass-card p-6 rounded-lg">
          <div className="text-web3-green text-xl font-bold mb-2">Convert</div>
          <p className="text-sm text-muted-foreground">Transform dust into usable USDC</p>
        </div>
      </div>
      
      <Button onClick={onConnectWallet} size="lg" className="bg-web3-blue hover:bg-blue-700 text-white">
        Connect Wallet <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
