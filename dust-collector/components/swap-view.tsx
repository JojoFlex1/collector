"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DollarSign, CheckCircle2 } from "lucide-react"

export default function SwapView() {
  const [swapComplete, setSwapComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize with zero values instead of hardcoded data
  const [availableBalance, setAvailableBalance] = useState(0)
  const [exchangeRate, setExchangeRate] = useState(0.99)
  const estimatedReceive = (availableBalance * exchangeRate).toFixed(2)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would be fetched from an API
      setAvailableBalance(0)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleSwap = () => {
    setSwapComplete(true)
  }

  return (
    <div>
      <div className="mb-8">
        <h3 className="text-xl font-medium mb-3">Aggregate on Base</h3>
        <p className="text-base text-gray-400 mb-6">
          Your aggregated dust is now on Base. Convert it to ETH for maximum utility.
        </p>

        <div className="bg-gray-800 rounded-lg p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400">Loading balance data...</p>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <div className="text-base mb-2">Available Balance</div>
                <div className="flex items-center">
                  <DollarSign className="h-7 w-7 text-blue-400 mr-2" />
                  <span className="text-3xl font-bold">${availableBalance.toFixed(2)}</span>
                </div>
              </div>

              {availableBalance > 0 ? (
                <>
                  <div className="mb-6">
                    <div className="text-base mb-2">Aggregate To</div>
                    <Select defaultValue="eth">
                      <SelectTrigger className="w-full bg-gray-700 text-base py-3">
                        <SelectValue>
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-sm">
                              E
                            </div>
                            ETH
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="eth">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-600 mr-2 flex items-center justify-center text-sm">
                              E
                            </div>
                            ETH
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-6 p-4 bg-gray-700 rounded-lg">
                    <div className="text-base">You'll receive approximately</div>
                    <div className="text-2xl font-bold">~{estimatedReceive} ETH</div>
                    <div className="text-sm text-gray-400 mt-2">Exchange rate: $1.00 = {exchangeRate} ETH</div>
                  </div>

                  {swapComplete ? (
                    <div className="bg-green-900/30 border border-green-700 rounded-lg p-5 mb-6">
                      <div className="flex items-center text-green-400 mb-2">
                        <CheckCircle2 className="h-6 w-6 mr-2" />
                        <span className="font-medium text-base">Aggregation Completed Successfully</span>
                      </div>
                      <p className="text-base">You've received {estimatedReceive} ETH in your Base wallet.</p>
                    </div>
                  ) : (
                    <Button onClick={handleSwap} className="w-full bg-blue-600 hover:bg-blue-700 text-base py-3">
                      Aggregate Now
                    </Button>
                  )}
                </>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-400 mb-4">No dust balance available to aggregate</p>
                  <p className="text-sm text-gray-500">Complete the previous steps to collect and process dust first</p>
                </div>
              )}

              <div className="mt-6">
                <Button variant="outline" className="w-full text-base py-3 border-dashed border-gray-600">
                  Withdraw/Donate ❤️
                </Button>
                <p className="text-center text-sm text-gray-400 mt-2">Coming Soon</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-medium mb-3">Transaction History</h3>
        <div className="bg-gray-800 rounded-lg p-5">
          {swapComplete ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-base">Aggregate to ETH</div>
                  <div className="text-sm text-gray-400">Just now</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-400 text-base">+{estimatedReceive} ETH</div>
                  <div className="text-sm text-gray-400">${availableBalance.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p className="text-base">No transactions yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
