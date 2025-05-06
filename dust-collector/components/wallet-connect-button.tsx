"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Wallet, AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useWalletContext } from "@/lib/wallet-context"

export default function WalletConnectButton() {
  const [open, setOpen] = useState(false)
  const { connectMetaMask, connectSolana, isConnecting, error } = useWalletContext()

  const handleMetaMaskConnect = async () => {
    await connectMetaMask()
    if (!error) {
      setOpen(false)
    }
  }

  const handleSolanaConnect = () => {
    connectSolana()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-base py-2 px-4">
          <Wallet className="h-5 w-5" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Connect Wallet</DialogTitle>
          <DialogDescription className="text-base">Connect your wallet to start collecting dust</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-4 py-4">
          <Button
            variant="outline"
            className="flex items-center justify-between p-4 h-auto"
            onClick={handleMetaMaskConnect}
            disabled={isConnecting}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-500 mr-3 flex items-center justify-center text-base">
                M
              </div>
              <div className="text-left">
                <div className="font-medium text-base">MetaMask</div>
                <div className="text-sm text-gray-400">Connect to your Ethereum wallet</div>
              </div>
            </div>
            <div className="text-sm bg-blue-600 px-3 py-1 rounded">Popular</div>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-between p-4 h-auto"
            onClick={handleSolanaConnect}
            disabled={isConnecting}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-500 mr-3 flex items-center justify-center text-base">
                S
              </div>
              <div className="text-left">
                <div className="font-medium text-base">Solana</div>
                <div className="text-sm text-gray-400">Connect to your Solana wallet</div>
              </div>
            </div>
          </Button>
        </div>

        <DialogFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-400">By connecting, you agree to the terms of service</div>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
