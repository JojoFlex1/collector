
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onConnectWallet: () => void;
}

export const Hero = ({ onConnectWallet }: HeroProps) => {
  return (
    <div className="space-y-8 py-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Cross-Chain Dust Collector</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Collect small, unusable balances from different wallets, batch process them to reduce gas fees, and transfer to Base for aggregation.
        </p>
      </div>
      
      <Button onClick={onConnectWallet} size="lg" className="bg-web3-blue hover:bg-blue-700 text-white px-8 py-6 text-lg">
        Connect Wallet <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      
      <div className="pt-12">
        <h2 className="text-2xl font-bold mb-6">About Dust Collection</h2>
        <p className="text-muted-foreground max-w-3xl">
          Dust refers to tiny amounts of cryptocurrency that are too small to be transacted due to 
          network fees exceeding their value. This tool helps you reclaim value from these otherwise 
          unusable assets by batching them together and moving them to Base's low-fee environment.
        </p>
      </div>
    </div>
  );
};
