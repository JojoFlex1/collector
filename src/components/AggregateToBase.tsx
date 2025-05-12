
import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AggregateToBaseProps {
  availableBalance: number;
  exchangeRate: number;
  onAggregate: (convertedAmount: number) => void;
  aggregationComplete?: boolean;
}

export const AggregateToBase = ({
  availableBalance,
  exchangeRate,
  onAggregate,
  aggregationComplete = false
}: AggregateToBaseProps) => {
  const [selectedToken] = useState("usdc");
  
  // Calculate approximate amount to receive
  const approximateAmount = availableBalance * exchangeRate;
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Aggregate on Base</h3>
        <p className="text-muted-foreground">
          Your aggregated dust is now on Base. Convert it to USDC for maximum utility.
        </p>
      </div>
      
      <Card className="border border-blue-800/30 bg-card/70 backdrop-blur-sm">
        <CardContent className="p-6 space-y-6">
          <div>
            <p className="text-muted-foreground mb-1">Available Balance</p>
            <p className="text-3xl font-semibold flex items-center">
              <span className="text-blue-400 mr-1">$</span>
              {availableBalance.toFixed(2)}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-muted-foreground">Aggregate To</label>
            <Select defaultValue={selectedToken} disabled={aggregationComplete}>
              <SelectTrigger className="border border-blue-600/30 bg-black/30">
                <SelectValue>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mr-2 text-white">
                      U
                    </div>
                    <span>USDC</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="usdc">
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full bg-green-600 flex items-center justify-center mr-2 text-white">
                        U
                      </div>
                      <span>USDC</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <Card className="bg-muted/50 border-none">
            <CardContent className="p-4">
              <p className="text-muted-foreground mb-2">You'll receive approximately</p>
              <p className="text-2xl font-semibold">
                ~{approximateAmount.toFixed(2)} USDC
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Exchange rate: $1.00 = {exchangeRate} USDC
              </p>
            </CardContent>
          </Card>
          
          {aggregationComplete ? (
            <Card className="bg-green-950/30 border border-green-500/30 text-green-500">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <Check className="h-5 w-5 mr-2" />
                  <p className="font-semibold">Aggregation Completed Successfully</p>
                </div>
                <p className="text-sm">
                  You've received {approximateAmount.toFixed(2)} USDC in your Base wallet.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Button 
              onClick={() => onAggregate(approximateAmount)} 
              className="w-full bg-web3-blue hover:bg-blue-700 text-white py-6 text-lg"
            >
              Aggregate Now
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
