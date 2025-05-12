
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface WalletItem {
  id: string;
  name: string;
  address: string;
  shortAddress: string;
  icon: string;
  connected: boolean;
}

interface WalletListProps {
  wallets: WalletItem[];
  onConnect: (walletId: string) => void;
}

export const WalletList = ({ wallets, onConnect }: WalletListProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Connect Your Wallets</h3>
      <div className="space-y-3">
        {wallets.map((wallet) => (
          <Card 
            key={wallet.id} 
            className="border border-blue-800/30 bg-card/50 backdrop-blur-sm"
          >
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-900/50 text-center flex items-center justify-center text-xl font-semibold mr-4">
                  {wallet.icon}
                </div>
                <div>
                  <h4 className="text-base font-medium">{wallet.name}</h4>
                  <p className="text-sm text-muted-foreground font-mono">{wallet.shortAddress}</p>
                </div>
              </div>
              
              {wallet.connected ? (
                <div className="flex items-center text-green-500">
                  <Check className="mr-1 h-5 w-5" />
                  Connected
                </div>
              ) : (
                <Button
                  variant="outline"
                  className="bg-black hover:bg-black/80"
                  onClick={() => onConnect(wallet.id)}
                >
                  Connect
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
