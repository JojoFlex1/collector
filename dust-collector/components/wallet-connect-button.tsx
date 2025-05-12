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
  const { connectMetaMask, connectPhantom, isConnecting, error } = useWalletContext()

  const handleMetaMaskConnect = async () => {
    await connectMetaMask()
    if (!error) {
      setOpen(false)
    }
  }

  const handlePhantomConnect = () => {
    connectPhantom()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 text-sm sm:text-base py-1.5 sm:py-2 px-3 sm:px-4">
          <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
          <span className="hidden sm:inline">Connect Wallet</span>
          <span className="sm:hidden">Connect</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-[90vw] w-full">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Connect Wallet</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">
            Connect your wallet to start collecting dust
          </DialogDescription>
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
            className="flex items-center justify-between p-3 sm:p-4 h-auto"
            onClick={handleMetaMaskConnect}
            disabled={isConnecting}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-orange-500 mr-2 sm:mr-3 flex items-center justify-center text-sm sm:text-base">
                M
              </div>
              <div className="text-left">
                <div className="font-medium text-sm sm:text-base">MetaMask</div>
                <div className="text-xs sm:text-sm text-gray-400">Connect to your Ethereum wallet</div>
              </div>
            </div>
            <div className="text-xs sm:text-sm bg-blue-600 px-2 sm:px-3 py-0.5 sm:py-1 rounded">Popular</div>
          </Button>

          <Button
            variant="outline"
            className="flex items-center justify-between p-3 sm:p-4 h-auto"
            onClick={handlePhantomConnect}
            disabled={isConnecting}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-500 mr-2 sm:mr-3 flex items-center justify-center text-sm sm:text-base">
                P
              </div>
              <div className="text-left">
                <div className="font-medium text-sm sm:text-base">Phantom</div>
                <div className="text-xs sm:text-sm text-gray-400">Connect to your Solana wallet</div>
              </div>
            </div>
          </Button>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="text-xs sm:text-sm text-gray-400">By connecting, you agree to the terms of service</div>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
