import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/Hero";
import { WalletConnection } from "@/components/WalletConnection";
import { StepsProgress } from "@/components/StepsProgress";
import { WalletList } from "@/components/WalletList";
import { DustTokenList } from "@/components/DustTokenList";
import { DustSettings } from "@/components/DustSettings";
import { ProcessingFlow } from "@/components/ProcessingFlow";
import { AggregateToBase } from "@/components/AggregateToBase";
import { TransactionHistory } from "@/components/TransactionHistory";
import { mockWallets, mockProcessingSteps } from "@/lib/mock-data";
import { Transaction } from "@/lib/types";
import { useWalletConnection } from "@/hooks/useWalletConnection";
import {
  getDustTokens,
  getDustTokensForWallet,
} from "@/services/walletService";
import { useNavigate } from "react-router-dom";
import { ConnectKitButton } from "connectkit";
import { getWalletClient } from "@wagmi/core";
import { parseAccount } from "viem/accounts";
import { wagmiConfig } from "@/lib/wagmiConfig";
import { useWalletManager } from "@/components/ui/walletMananger";
import { ethers } from "ethers";
import { DustCollectorABI } from "@/lib/contracts";

interface WalletItem {
  id: string;
  name: string;
  address: string;
  shortAddress: string;
  icon: string;
  connected: boolean;
}

type DustToken = {
  id: string;
  symbol: string;
  balance: number;
  chain: string;
  usdValue: number;
  contractAddress: string;
  decimals: number;
  name: string;
  address: string; // wallet address
};

type WalletDustMap = {
  [walletAddress: string]: DustToken[];
};

const Index = () => {
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const { address, chain } = useWalletConnection();

  // Collection step states

  const [isConnected, setisConnected] = useState(true);
  // const [wallets, setWallets] = useState(mockWallets);
  // const [wallets, setWallets] = useState<WalletItem[]>([]);
  const [walletDustTokens, setWalletDustTokens] = useState<WalletDustMap>({});
  const { wallets, connectWallet, disconnectWallet, refreshWallets } =
    useWalletManager();

  const [dustTokens, setDustTokens] = useState<any[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<string[]>([]);
  type SelectedDepositTokens = {
    address: string;
    amount: string; // or BigNumber, depending on your context
  };

  const [selectedDepositTokens, setSelectedDepositTokens] = useState<
    SelectedDepositTokens[]
  >([]);
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

  // Effect to check if user is connected with wagmi
  useEffect(() => {
    if (isConnected) {
      setCurrentStep(1);
      loadUserDustTokens();
    }
  }, [isConnected]);

  // Handle connect wallet button click
  const handleConnectWallet = () => {
    // setIsWalletModalOpen(true);
    console.log("on connect");
    console.log(isConnected);
    setisConnected(true);
  };
  console.log("on refresh");
  console.log(isConnected);

  // Load user's dust tokens
  const loadUserDustTokens = async () => {
    console.log("load user dust");
    console.log(address);
    if (!address) return;

    try {
      // const tokens = await getDustTokens(address, dustThreshold);
      // setDustTokens(tokens);
      const newDustMap: WalletDustMap = {};
      console.log("waller");
      console.log(wallets);

      for (const wallet of wallets.filter((w) => w.connected)) {
        const dust = await getDustTokensForWallet(
          wallet.address,
          dustThreshold,
          "BASE_MAINNET"
        ); // ✅ Correct function
        newDustMap[wallet.address] = dust;
      }
      console.log(newDustMap);

      setWalletDustTokens(newDustMap);
    } catch (error) {
      console.error("Error loading dust tokens:", error);
      toast.error("Failed to load dust tokens");
    }
  };

  //   useEffect(() => {
  //   const fetchAllDustTokens = async () => {
  //     const newDustMap: WalletDustMap = {};

  //     for (const wallet of wallets.filter(w => w.connected)) {
  //       const dust = await getDustTokensForWallet(wallet.address); // ✅ Correct function
  //       newDustMap[wallet.address] = dust;
  //     }

  //     setWalletDustTokens(newDustMap);
  //   };

  //   if (wallets.length > 0) {
  //     fetchAllDustTokens();
  //   }
  // }, [wallets]);

  // Handle wallet connection
  const handleWalletConnected = (walletAddress: string) => {
    // Note: with wagmi, the connection is handled by the hooks
    // This function will be triggered when the modal is closed
    setIsWalletModalOpen(false);

    // If the user is successfully connected, we'll have an address
    // and the useEffect above will handle updating the state
    if (address) {
      toast.success("Wallet connected successfully");
    }
  };

  // Handle wallet connection from wallet list
  // const handleConnectFromList = (walletId: string) => {
  //   setWallets(wallets.map(wallet =>
  //     wallet.id === walletId ? { ...wallet, connected: true } : wallet
  //   ));

  //   toast.success(`${walletId.charAt(0).toUpperCase() + walletId.slice(1)} wallet connected`);
  // };

  // Handle disconnect wallet
  const handleDisconnect = () => {
    setSelectedTokens([]);
    setAggregationComplete(false);

    // The actual disconnection is handled by the wagmi hook
    // We just need to update our UI state here
    setCurrentStep(0);
  };

  // Token selection handler
  const handleTokenSelection = (tokenId: string) => {
    setSelectedTokens((prev) =>
      prev.includes(tokenId)
        ? prev.filter((id) => id !== tokenId)
        : [...prev, tokenId]
    );
  };
  // const handleTokenDepositSelection = (tokenAddress: string, amount: string) => {
  //   setSelectedDepositTokens((prev) => {
  //     const exists = prev.find((t) => t.address === tokenAddress);
  //     if (exists) {
  //       // Remove token if already selected
  //       return prev.filter((t) => t.address !== tokenAddress);
  //     } else {
  //       // Add token and amount
  //       return [...prev, { address: tokenAddress, amount }];
  //     }
  //   });
  // };

  // Refresh dust balances
  const handleRefresh = async () => {
    await loadUserDustTokens();
    toast.success("Balances refreshed");
  };

  // // Continue to processing step
  // const handleContinueToProcessing = (tokenAddress: string, amount: string) => {
  //   setCurrentStep(2);
  //    setSelectedDepositTokens((prev) => {
  //     const exists = prev.find((t) => t.address === tokenAddress);
  //     if (exists) {
  //       // Remove token if already selected
  //       return prev.filter((t) => t.address !== tokenAddress);
  //     } else {
  //       // Add token and amount
  //       return [...prev, { address: tokenAddress, amount }];
  //     }
  //   });
  // };
  const handleContinueToProcessing = (
    tokensToDeposit: { address: string; amount: string }[]
  ) => {
    setCurrentStep(2);
    setSelectedDepositTokens(tokensToDeposit); // or call batchDeposit directly
  };

  // Start processing simulation
  const runProcessingSimulation = async () => {
    console.log("SELECTED TOKENS");
    console.log(selectedDepositTokens);
    setIsProcessing(true);
    // 🔥 Call the batchDeposit contract function here
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const dustCollectorContract = new ethers.Contract(
        "0x6C9E083067FB6376d4eA5E3Da05E3ee3965757A3",
        DustCollectorABI,
        signer
      );
      console.log("SELECTED TOKENS");
      console.log(selectedDepositTokens);
      const tokenAddresses = selectedDepositTokens.map((t) => t.address);
      const amounts = selectedDepositTokens.map((t) => t.amount); // make sure these are in wei and as string or BigNumber

      const tx = await dustCollectorContract.batchDeposit(
        tokenAddresses,
        // amounts
        ["10000000000000"]
      );
      await tx.wait(); // Wait for confirmation
      console.log("batchDeposit successful");
      // Update steps one by one with delays
      for (let i = 0; i < processingSteps.length; i++) {
        setCurrentProcessingStep(i + 1);

        // Update the current step to active
        const updatedSteps = processingSteps.map((step, index) => ({
          ...step,
          active: index === i,
          completed: index < i,
        }));
        setProcessingSteps(updatedSteps);

        // Wait for 1-2 seconds
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 + Math.random() * 1000)
        );
      }

      // Mark all steps as completed
      setProcessingSteps(
        processingSteps.map((step) => ({
          ...step,
          active: false,
          completed: true,
        }))
      );

      setIsProcessing(false);
    } catch (err) {
      console.error("batchDeposit failed:", err);
      setProcessingSteps(
        processingSteps.map((step) => ({
          ...step,
          active: false,
          completed: false,
        }))
      );
      setIsProcessing(false);
    }
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
      usdcReceived: convertedAmount,
    };

    setTransactions([newTransaction, ...transactions]);
    toast.success(
      `Successfully converted to ${convertedAmount.toFixed(2)} USDC`
    );
  };

  // Start processing simulation when entering processing step
  useEffect(() => {
    if (currentStep === 2 && currentProcessingStep === 0) {
      runProcessingSimulation();
    }
  }, [currentStep]);

  // Handle going to dashboard
  const handleGoToDashboard = () => {
    if (address) {
      navigate("/dashboard");
    }
  };

  // Render content based on current step
  const renderStepContent = () => {
    if (!isConnected) {
      return <Hero onConnectWallet={handleConnectWallet} />;
    }

    switch (currentStep) {
      case 1: // Collect Dust
        return (
          <div className="space-y-8">
            {address ? (
              <>
                <WalletList
                  wallets={wallets}
                  onConnect={connectWallet}
                  onDisconnect={disconnectWallet}
                />

                <div className="flex justify-end">
                  <ConnectKitButton />
                </div>
              </>
            ) : (
              <ConnectKitButton />
            )}

            <DustTokenList
              tokens={Object.values(walletDustTokens).flat()}
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

      {/* Content */}
      <div className="container mx-auto px-4 py-2">
        {isConnected && currentStep > 0 && (
          <>
            <header className="border-b border-white/10 py-4">
              <div className="container mx-auto px-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">
                  Cross-Chain Dust Collector
                </h1>
                {/* <ConnectKitButton theme={"rounded"}/> */}
              </div>
            </header>
            <div className="mb-8">
              <p className="text-muted-foreground mb-6"></p>

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
          </>
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
