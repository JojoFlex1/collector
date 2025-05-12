
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DustToken } from "@/lib/types";
import { Check, ArrowRight, X } from "lucide-react";

interface AggregationFlowProps {
  selectedTokens: DustToken[];
  onComplete: (usdcAmount: number) => void;
  onCancel: () => void;
}

export const AggregationFlow = ({ selectedTokens, onComplete, onCancel }: AggregationFlowProps) => {
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  
  // Calculate total value from selected tokens
  const totalValue = selectedTokens.reduce((sum, token) => sum + token.usdValue, 0);
  
  // Process step simulation
  const processStep = () => {
    setProcessing(true);
    
    setTimeout(() => {
      setProcessing(false);
      if (step < 3) {
        setStep(step + 1);
      } else {
        // Final step - complete with estimated USDC amount (95% of total value to simulate fees)
        const estimatedUSDC = totalValue * 0.95;
        onComplete(estimatedUSDC);
      }
    }, 2000);
  };
  
  return (
    <div className="space-y-8">
      {/* Progress indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span className={step >= 1 ? "text-web3-blue" : "text-muted-foreground"}>Collect Dust</span>
          <span className={step >= 2 ? "text-web3-purple" : "text-muted-foreground"}>Transfer to Base</span>
          <span className={step >= 3 ? "text-web3-green" : "text-muted-foreground"}>Convert to USDC</span>
        </div>
        <Progress value={((step - 1) / 2) * 100} className="h-2" />
      </div>

      {/* Step content */}
      <Card className="glass-card border-t-4 border-t-web3-blue">
        <CardContent className="pt-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Step 1: Collect Dust</h3>
                <p className="text-muted-foreground">
                  Preparing to collect dust from {selectedTokens.length} tokens across{" "}
                  {new Set(selectedTokens.map(t => t.chain)).size} chains.
                </p>
              </div>
              
              <div className="space-y-3 border rounded-md p-4">
                {Array.from(new Set(selectedTokens.map(t => t.chain))).map(chain => (
                  <div key={chain} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className={`h-3 w-3 rounded-full bg-web3-${chain.toLowerCase()} mr-2`}></div>
                      <span>{chain}</span>
                    </div>
                    <span className="text-sm">
                      {selectedTokens.filter(t => t.chain === chain).length} tokens
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between items-center font-medium">
                <span>Total Value:</span>
                <span>${totalValue.toFixed(2)}</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Step 2: Transfer to Base</h3>
                <p className="text-muted-foreground">
                  Moving your dust to Base chain for low-fee processing.
                </p>
              </div>
              
              <div className="flex items-center justify-center py-4">
                <div className="flex flex-col items-center space-y-6">
                  <div className="flex space-x-4">
                    {Array.from(new Set(selectedTokens.map(t => t.chain))).map(chain => (
                      <div key={chain} className={`h-10 w-10 rounded-full bg-web3-${chain.toLowerCase()} flex items-center justify-center text-xs font-medium text-white`}>
                        {chain.substring(0, 3)}
                      </div>
                    ))}
                  </div>
                  
                  <ArrowRight className="h-6 w-6 animate-pulse text-muted-foreground" />
                  
                  <div className="h-16 w-16 rounded-full bg-web3-base flex items-center justify-center text-white font-medium">
                    Base
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center font-medium">
                <span>Estimated Gas Savings:</span>
                <span className="text-web3-green">~85%</span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Step 3: Convert to USDC</h3>
                <p className="text-muted-foreground">
                  Converting your dust to USDC on Base chain.
                </p>
              </div>
              
              <div className="border rounded-md p-4 space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Input Value</span>
                  <span className="font-medium">${totalValue.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Conversion Fee</span>
                  <span className="font-medium">-${(totalValue * 0.05).toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-2 flex justify-between">
                  <span>USDC Output (Est.)</span>
                  <span className="text-xl font-bold text-web3-green">
                    ${(totalValue * 0.95).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onCancel} disabled={processing}>
          <X className="mr-2 h-4 w-4" /> Cancel
        </Button>
        
        <Button 
          onClick={processStep} 
          disabled={processing}
          className={`${
            step === 3 
              ? "bg-web3-green hover:bg-green-700" 
              : "bg-web3-blue hover:bg-blue-700"
          }`}
        >
          {processing ? (
            <span className="flex items-center">
              Processing <span className="ml-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </span>
          ) : (
            <span className="flex items-center">
              {step === 3 ? (
                <>Complete <Check className="ml-2 h-4 w-4" /></>
              ) : (
                <>Continue <ArrowRight className="ml-2 h-4 w-4" /></>
              )}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};
