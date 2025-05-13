import { Button } from "@/components/ui/button";
import { ConnectKitButton } from "connectkit";

interface HeroProps {
  onConnectWallet: () => void;
}

// export const Hero = ({ onConnectWallet }: HeroProps) => {
//   return (
//     <div className="space-y-8 py-8">
//       <div className="space-y-4">
//         <h1 className="text-4xl font-bold">Cross-Chain Dust Collector</h1>
//         <p className="text-xl text-muted-foreground max-w-3xl">
//           Collect small, unusable balances from different wallets, batch process them to reduce gas fees, and transfer to Base for aggregation.
//         </p>
//       </div>

//       <div className="pt-12">
//         <h2 className="text-2xl font-bold mb-6">About Dust Collection</h2>
//         <p className="text-muted-foreground max-w-3xl">
//           Dust refers to tiny amounts of cryptocurrency that are too small to be transacted due to
//           network fees exceeding their value. This tool helps you reclaim value from these otherwise
//           unusable assets by batching them together and moving them to Base's low-fee environment.
//         </p>
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
import {
  Wallet,
  ArrowRight,
  ChevronRight,
  Coins,
  Gift,
  LineChart,
  Info,
  CheckCircle,
  Globe,
} from "lucide-react";
import { CustomConnectButton } from "./ui/walletConnectButton";
import { useNavigate } from "react-router-dom";

export const Hero = ({ onConnectWallet }: HeroProps) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleConnectWallet = () => {
    setIsConnecting(true);
    // Simulate wallet connection process
    setTimeout(() => {
      onConnectWallet()
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Navigation */}
      <nav className="flex justify-between items-center py-4 px-8">
        <div className="flex items-center gap-2">
          <Coins className="text-blue-400" size={28} />
          <span className="font-bold text-xl">DustCollector</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="#" className="text-gray-300 hover:text-white">
            How it works
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Docs
          </a>
          {/* <CustomConnectButton/> */}
          <button
            onClick={handleConnectWallet}
            
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all"
          >
            {/* {isConnecting ? "Loading..."  : "Get Started <ArrowRight size={18}/>"} */}
            {isConnecting ? (
              "Loading..."
            ) : (
              <>
                Get Started <ArrowRight size={18} />
              </>
            )}

          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-8 pt-16 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-900/40 text-blue-400 text-sm font-medium">
              <span className="flex h-2 w-2 rounded-full bg-blue-400 mr-2"></span>
              Base Network Powered
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              Turn forgotten <span className="text-blue-400">dust</span> into
              real value
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Reclaim tiny, unusable token balances from your wallets with a
              single click. Batch process them to reduce gas fees and unlock
              hidden value.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleConnectWallet}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all"
              >
                {/* Get Started <ArrowRight size={18} /> */}
                {isConnecting ? (
                    "Loading..."
                  ) : (
                    <>
                      Get Started <ArrowRight size={18} />
                    </>
                  )}

              </button>
            </div>
          </div>

          {/* Right Column - Stats/Features Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-800/60 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all">
              <div className="bg-blue-900/40 p-2 rounded-lg inline-block mb-4">
                <Coins className="text-blue-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Dust Collection</h3>
              <p className="text-gray-300">
                Select tiny balances and send them to the aggregator
              </p>
            </div>

            <div className="bg-gray-800/60 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all">
              <div className="bg-purple-900/40 p-2 rounded-lg inline-block mb-4">
                <Gift className="text-purple-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Withdraw or Donate</h3>
              <p className="text-gray-300">
                Send your recovered value to your wallet or charity
              </p>
            </div>

            <div className="bg-gray-800/60 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all">
              <div className="bg-green-900/40 p-2 rounded-lg inline-block mb-4">
                <LineChart className="text-green-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Coming Soon</h3>
              <p className="text-gray-300">
                Stake dust to generate passive yield
              </p>
            </div>

            <div className="bg-gray-800/60 backdrop-blur p-6 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all">
              <div className="bg-orange-900/40 p-2 rounded-lg inline-block mb-4">
                <Globe className="text-orange-400" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Cross-Chain</h3>
              <p className="text-gray-300">
                Collect dust from multiple blockchains
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              DustCollector makes reclaiming your forgotten tokens simple and
              efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/40 rounded-2xl p-6 text-center">
              <div className="bg-blue-900/30 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Connect Wallet</h3>
              <p className="text-gray-300">
                Securely connect your wallet to scan for dust tokens
              </p>
            </div>

            <div className="bg-gray-800/40 rounded-2xl p-6 text-center">
              <div className="bg-blue-900/30 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Select Tokens</h3>
              <p className="text-gray-300">
                Choose which dust tokens you want to collect and aggregate
              </p>
            </div>

            <div className="bg-gray-800/40 rounded-2xl p-6 text-center">
              <div className="bg-blue-900/30 h-12 w-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Redeem Value</h3>
              <p className="text-gray-300">
                Withdraw, donate or stake your recovered tokens
              </p>
            </div>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="mt-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-3xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 md:w-2/3">
              <h2 className="text-3xl font-bold">Why This Matters</h2>
              <p className="text-xl text-gray-300">
                Millions of wallets hold unusable token fragments — assets too
                small to trade due to gas costs. DustCollector brings that value
                back into circulation on Base's fast, cheap, and user-friendly
                network.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-blue-400" />
                  <span>Non-custodial</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-blue-400" />
                  <span>Fully on-chain</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={20} className="text-blue-400" />
                  <span>Base Network</span>
                </div>
              </div>
            </div>
            <div className="bg-blue-600/20 p-6 rounded-2xl border border-blue-500/30 md:w-1/3">
              <div className="flex items-center gap-3 mb-4">
                <Info size={24} className="text-blue-400" />
                <h3 className="font-bold text-xl">Did you know?</h3>
              </div>
              <p className="text-gray-300">
                The average crypto user has over $20 worth of forgotten dust
                scattered across their wallets
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
