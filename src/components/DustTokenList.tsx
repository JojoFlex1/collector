
import { useState } from "react";
import { RefreshCw, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { DustToken } from "@/lib/types";
import { parseUnits } from "ethers";

interface DustTokenListProps {
  tokens: DustToken[];
  selectedTokens: string[];
  onTokenSelect: (tokenId: string) => void;
  onContinue: (selected: { address: string; amount: string }[]) => void;
  onRefresh: () => void;
}

export const DustTokenList = ({
  tokens,
  selectedTokens,
  onTokenSelect,
  onContinue,
  onRefresh
}: DustTokenListProps) => {
  const [activeTab, setActiveTab] = useState("balances");
  
  // Calculate total value of selected tokens
  const totalSelectedValue = tokens
    .filter(token => selectedTokens.includes(token.id))
    .reduce((sum, token) => sum + token.usdValue, 0);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Dust Balances</h3>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={onRefresh}
          className="h-9 w-9"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[300px] bg-muted">
          <TabsTrigger value="balances">Balances</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="balances" className="space-y-3 mt-3">
          {tokens.map(token => (
            <Card 
              key={token.id} 
              className="border border-blue-800/30 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-center flex items-center justify-center text-xl font-semibold mr-4">
                    {token.symbol.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-medium">{token.balance} {token.symbol}</h4>
                    <p className="text-sm text-muted-foreground">{token.chain}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="font-mono font-medium">${token.usdValue.toFixed(4)}</span>
                  <Checkbox
                    checked={selectedTokens.includes(token.id)}
                    onCheckedChange={() => onTokenSelect(token.id)}
                    className="h-5 w-5"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="charts" className="h-[300px] flex items-center justify-center border rounded-md mt-3">
          <p className="text-muted-foreground">Chart visualization would be displayed here</p>
        </TabsContent>
      </Tabs>
      
      {selectedTokens.length > 0 && (
        <Card className="border border-blue-800/30 bg-card/70 backdrop-blur-sm">
          <CardContent className="p-4 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Selected Dust Value</p>
              <p className="text-2xl font-semibold">${totalSelectedValue.toFixed(4)}</p>
            </div>
            {/* <Button onClick={onContinue} className="bg-web3-blue hover:bg-blue-700">
              Continue to Processing <ArrowRight className="ml-1 h-4 w-4" />
            </Button> */}
             <Button
          onClick={() => {
            const selected = tokens
              .filter((token) => selectedTokens.includes(token.id))
              .map((token) => ({
                address: token.address, // token.id is the contract address
                amount: parseUnits(token.balance.toString(), 18).toString(), // convert to wei (assumes 18 decimals)
              }));

            onContinue(selected);
          }}
          className="bg-web3-blue hover:bg-blue-700"
        >
          Continue to Processing <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
