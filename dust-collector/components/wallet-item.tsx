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

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
      <div className="flex items-center gap-4">
        <div
          className={`w-10 h-10 rounded-full ${wallet.type === "metamask" ? "bg-orange-500" : "bg-purple-500"} flex items-center justify-center text-base`}
        >
          {wallet.type === "metamask" ? "M" : "S"}
        </div>
        <div>
          <div className="font-medium text-base">{wallet.name}</div>
          <div className="text-sm text-gray-400">{formatAddress(wallet.address)}</div>
        </div>
      </div>
      {wallet.connected ? (
        <div className="flex items-center gap-2">
          <div className="flex items-center text-green-400 text-base mr-2">
            <CheckCircle className="h-5 w-5 mr-2" />
            Connected
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => disconnectWallet(wallet.id)}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Disconnect</span>
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="sm" className="text-base px-4 py-2">
          Connect
        </Button>
      )}
    </div>
  )
}
