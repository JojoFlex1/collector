
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Info, Search } from "lucide-react";
import { DustTokenList } from "./DustTokenList";
import { AggregationFlow } from "./AggregationFlow";
import { TransactionHistory } from "./TransactionHistory";
import { mockTransactionHistory } from "@/lib/mock-data";
import { getDustTokens, formatAddress } from "@/services/walletService";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import { useToast } from "@/components/ui/use-toast";

interface DustDashboardProps {
  connectedWallet: string;
  onDisconnect: () => void;
}

export const DustDashboard = ({ connectedWallet, onDisconnect }: DustDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [scanning, setScanning] = useState(false);
  const [dustData, setDustData] = useState<any[]>([]);
  const [transactions, setTransactions] = useState(mockTransactionHistory);
  const [showAggregationFlow, setShowAggregationFlow] = useState(false);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const { address, disconnect, formattedAddress } = useWalletConnection();
  const { toast } = useToast();
  
  // Load dust tokens when address changes or when scanning
  useEffect(() => {
    if (address) {
      handleScan();
    }
  }, [address]);

  // Function to scan for dust
  const handleScan = async () => {
    setScanning(true);
    
    try {
      // Use the address from wagmi if available, otherwise use the passed prop
      const userAddress = address || connectedWallet;
      
      // Get dust tokens with our default 1.0 USD threshold
      const tokens = await getDustTokens(userAddress);
      setDustData(tokens);
      
      toast({
        title: "Scan Complete",
        description: `Found ${tokens.length} dust tokens across chains`,
      });
      
    } catch (error) {
      console.error("Error scanning for dust:", error);
      toast({
        title: "Scan Failed",
        description: "Could not scan for dust tokens. Please try again.",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };

  // Total dust value calculation
  const totalDustValue = dustData.reduce((total, token) => total + token.usdValue, 0);

  // Toggle token selection
  const toggleTokenSelection = (tokenId: string) => {
    setSelectedTokens(prev => 
      prev.includes(tokenId) 
        ? prev.filter(id => id !== tokenId)
        : [...prev, tokenId]
    );
  };

  // Start aggregation process
  const startAggregation = () => {
    if (selectedTokens.length === 0) return;
    setShowAggregationFlow(true);
    setActiveTab("aggregate");
  };

  // Complete aggregation and add to transaction history
  const completeAggregation = (usdcAmount: number) => {
    const newTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      tokensCollected: selectedTokens.length,
      chainsUsed: [...new Set(dustData
        .filter(token => selectedTokens.includes(token.id))
        .map(token => token.chain))] as string[],
      usdcReceived: usdcAmount,
    };
    
    setTransactions([newTransaction, ...transactions]);
    setSelectedTokens([]);
    setShowAggregationFlow(false);
    setActiveTab("history");
  };

  // Handle wallet disconnect
  const handleDisconnect = () => {
    disconnect();
    onDisconnect();
  };

  // Dummy functions for existing props
  const handleContinue = () => {
    startAggregation();
  };

  const handleRefresh = () => {
    handleScan();
  };

  return (
    <div className="container mx-auto py-6 animate-fade-in">
      {/* Wallet info */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold mb-1">Your Dust Dashboard</h2>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="px-3 py-1 font-mono">
              {formattedAddress || formatAddress(connectedWallet)}
            </Badge>
            <Button variant="ghost" size="sm" onClick={handleDisconnect}>
              Disconnect
            </Button>
          </div>
        </div>
        
        {activeTab === "overview" && (
          <Card className="w-full md:w-auto mt-4 md:mt-0">
            <CardContent className="p-4 flex items-center justify-between space-x-8">
              <div>
                <p className="text-sm text-muted-foreground">Total Dust Value</p>
                <p className="text-2xl font-bold">${totalDustValue.toFixed(2)}</p>
              </div>
              <Button 
                onClick={handleScan} 
                disabled={scanning}
                className="bg-web3-blue hover:bg-blue-700"
              >
                {scanning ? "Scanning..." : "Scan for Dust"}
                {scanning ? null : <Search className="ml-2 h-4 w-4" />}
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Main content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="aggregate" disabled={selectedTokens.length === 0 && !showAggregationFlow}>
            Aggregate
          </TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <DustTokenList 
            tokens={dustData} 
            selectedTokens={selectedTokens}
            onTokenSelect={toggleTokenSelection}
            onContinue={handleContinue}
            onRefresh={handleRefresh}
          />
          
          {selectedTokens.length > 0 && (
            <div className="flex justify-between items-center p-4 glass-card rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Selected Tokens</p>
                <p className="font-bold">{selectedTokens.length} tokens worth ${
                  dustData
                    .filter(token => selectedTokens.includes(token.id))
                    .reduce((sum, token) => sum + token.usdValue, 0)
                    .toFixed(2)
                }</p>
              </div>
              <Button onClick={startAggregation} className="bg-web3-green hover:bg-green-700">
                Aggregate Selected <Check className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="aggregate">
          {showAggregationFlow && (
            <AggregationFlow
              selectedTokens={dustData.filter(token => selectedTokens.includes(token.id))}
              onComplete={completeAggregation}
              onCancel={() => {
                setShowAggregationFlow(false);
                setActiveTab("overview");
              }}
            />
          )}
        </TabsContent>
        
        <TabsContent value="history">
          <TransactionHistory transactions={transactions} />
        </TabsContent>
      </Tabs>

      {/* Information card */}
      <Card className="mt-8 border border-blue-800/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Info className="h-5 w-5 mr-2 text-web3-blue" />
            About Dust Collection
          </CardTitle>
          <CardDescription>
            Dust refers to small crypto balances that are often too costly to transfer or swap.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <p>
            This DApp helps aggregate your dust from multiple chains to Base network where gas 
            fees are much lower, then converts them to USDC you can actually use.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
