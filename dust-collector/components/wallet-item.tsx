"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, X } from "lucide-react"
import { useWalletContext } from "@/lib/wallet-context"
import type { ConnectedWallet } from "@/lib/wallet-context"

interface WalletItemProps {
  wallet: ConnectedWallet
}

export default function WalletItem({ wallet }: WalletItemProps) {
  const { disconnectWallet } = useWalletContext()

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return ""
    return address.length > 12 ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : address
  }

  // Get wallet icon based on type
  const getWalletIcon = (type: string) => {
    switch (type) {
      case "metamask":
        return "M"
      case "phantom":
        return "P"
      default:
        return type.charAt(0).toUpperCase()
    }
  }

  // Get wallet background color based on type
  const getWalletColor = (type: string) => {
    switch (type) {
      case "metamask":
        return "bg-orange-500"
      case "phantom":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center gap-2 sm:gap-4">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${getWalletColor(wallet.type)} flex items-center justify-center text-xs sm:text-base`}
        >
          {getWalletIcon(wallet.type)}
        </div>
        <div>
          <div className="font-medium text-sm sm:text-base">{wallet.name}</div>
          <div className="text-xs sm:text-sm text-gray-400">{formatAddress(wallet.address)}</div>
        </div>
      </div>
      {wallet.connected ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center text-green-400 text-xs sm:text-base mr-1 sm:mr-2">
            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Connected</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => disconnectWallet(wallet.id)}
            className="h-7 w-7 sm:h-8 sm:w-8 rounded-full"
          >
            <X className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="sr-only">Disconnect</span>
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="sm" className="text-xs sm:text-base px-3 sm:px-4 py-1 sm:py-2">
          Connect
        </Button>
      )}
    </div>
  )
}
