
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button"; // Added missing Button import
import { Hero } from "@/components/Hero";
import { WalletConnection } from "@/components/WalletConnection";
import { StepsProgress } from "@/components/StepsProgress";
import { WalletList } from "@/components/WalletList";
import { DustTokenList } from "@/components/DustTokenList";
import { DustSettings } from "@/components/DustSettings";
import { ProcessingFlow } from "@/components/ProcessingFlow";
import { AggregateToBase } from "@/components/AggregateToBase";
import { TransactionHistory } from "@/components/TransactionHistory";
import { mockWallets, mockDustTokens, mockProcessingSteps } from "@/lib/mock-data";
import { Transaction } from "@/lib/types";

const Index = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  
  // Collection step states
  const [wallets, setWallets] = useState(mockWallets);
  const [dustTokens, setDustTokens] = useState(mockDustTokens);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  const [dustThreshold, setDustThreshold] = useState(1.0);
  const [autoRefresh, setAutoRefresh] = useState(false);
  
  // Processing step states
  const [processingSteps, setProcessingSteps] = useState(mockProcessingSteps);
  const [currentProcessingStep, setCurrentProcessingStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Aggregation step states
  const [availableBalance, setAvailableBalance] = useState(1.59);
  const [exchangeRate, setExchangeRate] = useState(0.99);
  const [aggregationComplete, setAggregationComplete] = useState(false);
  
  // Transaction history
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Handle connect wallet button click
  const handleConnectWallet = () => {
    setIsWalletModalOpen(true);
  };

  // Handle wallet connection
  const handleWalletConnected = (walletType: string) => {
    setConnectedWallet(`0x71C7656EC7ab88b098defB751B7401B5f6d8976F`);
    setCurrentStep(1);
    
    // Update the Ethereum wallet to connected
    setWallets(wallets.map(wallet => 
      wallet.id === "ethereum" ? { ...wallet, connected: true } : wallet
    ));
    
    toast.success("Wallet connected successfully");
  };

  // Handle wallet connection from wallet list
  const handleConnectFromList = (walletId: string) => {
    setWallets(wallets.map(wallet => 
      wallet.id === walletId ? { ...wallet, connected: true } : wallet
    ));
    
    toast.success(`${walletId.charAt(0).toUpperCase() + walletId.slice(1)} wallet connected`);
  };
  
  // Handle disconnect wallet
  const handleDisconnect = () => {
    setConnectedWallet(null);
    setCurrentStep(0);
    setSelectedTokens([]);
    setWallets(wallets.map(wallet => ({ ...wallet, connected: false })));
    setAggregationComplete(false);
  };
  
  // Token selection handler
  const handleTokenSelection = (tokenId: string) => {
    setSelectedTokens(prev => 
      prev.includes(tokenId)
        ? prev.filter(id => id !== tokenId)
        : [...prev, tokenId]
    );
  };
  
  // Refresh dust balances
  const handleRefresh = () => {
    toast.success("Balances refreshed");
  };
  
  // Continue to processing step
  const handleContinueToProcessing = () => {
    setCurrentStep(2);
  };
  
  // Start processing simulation
  const runProcessingSimulation = async () => {
    setIsProcessing(true);
    
    // Update steps one by one with delays
    for (let i = 0; i < processingSteps.length; i++) {
      setCurrentProcessingStep(i + 1);
      
      // Update the current step to active
      const updatedSteps = processingSteps.map((step, index) => ({
        ...step,
        active: index === i,
        completed: index < i
      }));
      setProcessingSteps(updatedSteps);
      
      // Wait for 1-2 seconds
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    }
    
    // Mark all steps as completed
    setProcessingSteps(processingSteps.map(step => ({
      ...step,
      active: false,
      completed: true
    })));
    
    setIsProcessing(false);
  };
  
  // Complete processing step
  const handleCompleteProcessing = () => {
    if (!isProcessing) {
      setCurrentStep(3);
    }
  };
  
  // Handle aggregation
  const handleAggregate = (convertedAmount: number) => {
    setAggregationComplete(true);
    
    // Add to transaction history
    const newTransaction = {
      id: `tx-${Date.now()}`,
      date: new Date().toISOString(),
      tokensCollected: selectedTokens.length,
      chainsUsed: ["Ethereum"],
      usdcReceived: convertedAmount
    };
    
    setTransactions([newTransaction, ...transactions]);
    toast.success(`Successfully converted to ${convertedAmount.toFixed(2)} USDC`);
  };
  
  // Start processing simulation when entering processing step
  useEffect(() => {
    if (currentStep === 2 && currentProcessingStep === 0) {
      runProcessingSimulation();
    }
  }, [currentStep]);
  
  // Render content based on current step
  const renderStepContent = () => {
    if (!connectedWallet) {
      return <Hero onConnectWallet={handleConnectWallet} />;
    }
    
    switch (currentStep) {
      case 1: // Collect Dust
        return (
          <div className="space-y-8">
            <WalletList wallets={wallets} onConnect={handleConnectFromList} />
            
            <DustTokenList
              tokens={dustTokens}
              selectedTokens={selectedTokens}
              onTokenSelect={handleTokenSelection}
              onContinue={handleContinueToProcessing}
              onRefresh={handleRefresh}
            />
            
            <DustSettings
              threshold={dustThreshold}
              onThresholdChange={setDustThreshold}
              autoRefresh={autoRefresh}
              onAutoRefreshChange={setAutoRefresh}
            />
          </div>
        );
        
      case 2: // Process & Transfer
        return (
          <ProcessingFlow
            steps={processingSteps}
            currentStep={currentProcessingStep}
            totalSteps={processingSteps.length}
            processing={isProcessing}
            onComplete={handleCompleteProcessing}
          />
        );
        
      case 3: // Aggregate on Base
        return (
          <div className="space-y-8">
            <AggregateToBase
              availableBalance={availableBalance}
              exchangeRate={exchangeRate}
              onAggregate={handleAggregate}
              aggregationComplete={aggregationComplete}
            />
            
            <TransactionHistory transactions={transactions} />
          </div>
        );
        
      default:
        return <Hero onConnectWallet={handleConnectWallet} />;
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Background elements */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-transparent" />
      </div>

      {/* Header */}
      <header className="border-b border-white/10 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Dust Collector</h1>
          
          {!connectedWallet ? (
            <Button 
              variant="outline" 
              onClick={handleConnectWallet}
              className="border-white/20 hover:bg-white/5"
            >
              Connect Wallet
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={handleDisconnect}
              className="border-white/20 hover:bg-white/5"
            >
              Disconnect
            </Button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {connectedWallet && currentStep > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Cross-Chain Dust Collector</h2>
            <p className="text-muted-foreground mb-6">
              Collect small, unusable balances from different wallets, batch process them to reduce gas
              fees, and transfer to Base for aggregation.
            </p>
            
            <StepsProgress 
              currentStep={currentStep} 
              onStepClick={(step) => {
                // Only allow going back to previous steps
                if (step < currentStep) {
                  setCurrentStep(step);
                }
              }} 
            />
          </div>
        )}
        
        {renderStepContent()}
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
