"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DollarSign, CheckCircle2 } from "lucide-react"

export default function SwapView() {
  const [aggregateComplete, setAggregateComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize with zero values instead of hardcoded data
  const [availableBalance, setAvailableBalance] = useState(0)
  const estimatedReceive = (availableBalance * 0.99).toFixed(4)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      // In a real app, this would be fetched from an API
      setAvailableBalance(0)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleAggregate = () => {
    setAggregateComplete(true)
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Aggregate on Base</h3>
        <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
          Your aggregated dust is now on Base and automatically converted to ETH.
        </p>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-6 sm:py-8">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500 mb-3 sm:mb-4"></div>
              <p className="text-gray-400 text-sm sm:text-base">Loading balance data...</p>
            </div>
          ) : (
            <>
              <div className="mb-5 sm:mb-6">
                <div className="text-sm sm:text-base mb-2">Available Balance</div>
                <div className="flex items-center">
                  <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-blue-400 mr-2" />
                  <span className="text-2xl sm:text-3xl font-bold">${availableBalance.toFixed(2)}</span>
                </div>
                {availableBalance > 0 && (
                  <div className="text-sm text-gray-400 mt-1">Approximately {estimatedReceive} ETH</div>
                )}
              </div>

              {availableBalance > 0 ? (
                <>
                  {aggregateComplete ? (
                    <div className="bg-green-900/30 border border-green-700 rounded-lg p-4 sm:p-5 mb-5 sm:mb-6">
                      <div className="flex items-center text-green-400 mb-2">
                        <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 mr-2" />
                        <span className="font-medium text-sm sm:text-base">Aggregation Completed Successfully</span>
                      </div>
                      <p className="text-sm sm:text-base">
                        You've received {estimatedReceive} ETH in your Base wallet.
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={handleAggregate}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                    >
                      Aggregate Now
                    </Button>
                  )}
                </>
              ) : (
                <div className="text-center py-5 sm:py-6">
                  <p className="text-gray-400 text-sm sm:text-base mb-2 sm:mb-4">
                    No dust balance available to aggregate
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Complete the previous steps to collect and process dust first
                  </p>
                </div>
              )}

              <div className="mt-5 sm:mt-6">
                <Button
                  variant="outline"
                  className="w-full text-sm sm:text-base py-2 sm:py-3 border-dashed border-gray-600"
                >
                  Withdraw/Donate ❤️
                </Button>
                <p className="text-center text-xs sm:text-sm text-gray-400 mt-2">Coming Soon</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Transaction History</h3>
        <div className="bg-gray-800 rounded-lg p-4 sm:p-5">
          {aggregateComplete ? (
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 sm:p-4 bg-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-sm sm:text-base">Aggregate to ETH</div>
                  <div className="text-xs sm:text-sm text-gray-400">Just now</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-green-400 text-sm sm:text-base">+{estimatedReceive} ETH</div>
                  <div className="text-xs sm:text-sm text-gray-400">${availableBalance.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8 text-gray-400">
              <p className="text-sm sm:text-base">No transactions yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
