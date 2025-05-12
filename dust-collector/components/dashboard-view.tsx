"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { RefreshCw, ArrowRight } from "lucide-react"
import WalletItem from "./wallet-item"
import DustBalanceItem from "./dust-balance-item"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useWalletContext } from "@/lib/wallet-context"
import type { DustBalance, ChartData } from "@/lib/types"

interface DashboardViewProps {
  onContinue: () => void
}

// Colors for the chart
const COLORS = ["#627EEA", "#26A17B", "#2A5ADA"]

export default function DashboardView({ onContinue }: DashboardViewProps) {
  const [selectedDust, setSelectedDust] = useState<DustBalance[]>([])
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [activeTab, setActiveTab] = useState("balances")
  const { wallets, connectMetaMask, connectPhantom } = useWalletContext()

  const totalValue = selectedDust
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.value, 0)
    .toFixed(2)

  // Check if wallets are connected
  const isEthereumConnected = wallets.some((wallet) => wallet.type === "metamask" && wallet.connected)
  const isSolanaConnected = wallets.some((wallet) => wallet.type === "phantom" && wallet.connected)

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-5">Connect Your Wallets</h3>

        <div className="space-y-3">
          {/* Ethereum Wallet Option */}
          <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-xs sm:text-base">
                E
              </div>
              <div>
                <div className="font-medium text-sm sm:text-base">Ethereum Wallet</div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {isEthereumConnected ? "Connected via MetaMask" : "Connect your Ethereum wallet to collect dust"}
                </div>
              </div>
            </div>
            {isEthereumConnected ? (
              <div className="flex items-center text-green-400 text-xs sm:text-base">
                <span>Connected</span>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-base px-3 sm:px-4 py-1 sm:py-2"
                onClick={connectMetaMask}
              >
                Connect
              </Button>
            )}
          </div>

          {/* Solana Wallet Option */}
          <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600 flex items-center justify-center text-xs sm:text-base">
                S
              </div>
              <div>
                <div className="font-medium text-sm sm:text-base">Solana Wallet</div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {isSolanaConnected ? "Connected via Phantom" : "Connect your Solana wallet to collect dust"}
                </div>
              </div>
            </div>
            {isSolanaConnected ? (
              <div className="flex items-center text-green-400 text-xs sm:text-base">
                <span>Connected</span>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="text-xs sm:text-base px-3 sm:px-4 py-1 sm:py-2"
                onClick={connectPhantom}
              >
                Connect
              </Button>
            )}
          </div>

          {/* Connected Wallets */}
          {wallets.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm sm:text-base font-medium mb-2">Connected Wallets</h4>
              <div className="space-y-3">
                {wallets.map((wallet) => (
                  <WalletItem key={wallet.id} wallet={wallet} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6 sm:mb-8">
        <div className="flex items-center justify-between mb-3 sm:mb-5">
          <h3 className="text-lg sm:text-xl font-medium">Dust Balances</h3>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 text-xs sm:text-base">
            <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
            Refresh
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4 sm:mb-5 mx-auto">
            <TabsTrigger value="balances" className="text-xs sm:text-base px-4 sm:px-6 py-1.5 sm:py-2">
              Balances
            </TabsTrigger>
            <TabsTrigger value="charts" className="text-xs sm:text-base px-4 sm:px-6 py-1.5 sm:py-2">
              Charts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="balances">
            <div className="space-y-3 mb-4 sm:mb-5">
              {wallets.length > 0 ? (
                selectedDust.length > 0 ? (
                  selectedDust.map((dust) => (
                    <DustBalanceItem
                      key={dust.id}
                      dust={dust}
                      onToggle={(id) => {
                        setSelectedDust(
                          selectedDust.map((item) => (item.id === id ? { ...item, selected: !item.selected } : item)),
                        )
                      }}
                    />
                  ))
                ) : (
                  <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-lg">
                    <p className="text-gray-400 text-sm sm:text-base">No dust balances found in connected wallets</p>
                  </div>
                )
              ) : (
                <div className="text-center p-4 sm:p-6 bg-gray-800 rounded-lg">
                  <p className="text-gray-400 text-sm sm:text-base">Connect a wallet to view dust balances</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="charts">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-3 sm:p-5">
                  <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">Dust Distribution</h4>
                  {wallets.length > 0 ? (
                    chartData.length > 0 ? (
                      <div className="h-48 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={chartData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`$${value}`, "Value"]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 sm:h-64 flex items-center justify-center">
                        <p className="text-gray-400 text-sm sm:text-base">No dust balances found to display in chart</p>
                      </div>
                    )
                  ) : (
                    <div className="h-48 sm:h-64 flex items-center justify-center">
                      <p className="text-gray-400 text-sm sm:text-base">Connect a wallet to view charts</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-3 sm:p-5">
                  <h4 className="text-sm sm:text-base font-medium mb-2 sm:mb-3">Dust Value by Token</h4>
                  {wallets.length > 0 ? (
                    chartData.length > 0 ? (
                      <div className="h-48 sm:h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={chartData}
                            margin={{
                              top: 5,
                              right: 20,
                              left: 10,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                            <YAxis tick={{ fontSize: 12 }} />
                            <Tooltip formatter={(value) => [`$${value}`, "Value"]} />
                            <Bar dataKey="value" fill="#3b82f6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    ) : (
                      <div className="h-48 sm:h-64 flex items-center justify-center">
                        <p className="text-gray-400 text-sm sm:text-base">No dust balances found to display in chart</p>
                      </div>
                    )
                  ) : (
                    <div className="h-48 sm:h-64 flex items-center justify-center">
                      <p className="text-gray-400 text-sm sm:text-base">Connect a wallet to view charts</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-5 bg-gray-800 rounded-lg gap-3 sm:gap-0">
          <div>
            <div className="text-sm sm:text-base text-gray-400">Total Selected Dust Value</div>
            <div className="text-xl sm:text-2xl font-bold">${totalValue}</div>
          </div>
          <Button
            onClick={onContinue}
            className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-2 px-4 sm:px-5 w-full sm:w-auto"
            disabled={wallets.length === 0 || selectedDust.length === 0}
          >
            Continue to Processing
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-6 sm:mt-8">
        <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Dust Settings</h3>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-3 sm:p-5">
            <div className="mb-4 sm:mb-5">
              <label className="text-sm sm:text-base font-medium mb-1 sm:mb-2 block">Define Dust Threshold</label>
              <div className="flex items-center gap-2 sm:gap-3">
                <input type="range" min="0.01" max="5" step="0.01" defaultValue="1" className="w-full" />
                <span className="text-sm sm:text-base font-medium">$1.00</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
                Balances below this value will be considered as dust
              </p>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <Checkbox id="auto-refresh" className="h-4 w-4 sm:h-5 sm:w-5" />
              <label
                htmlFor="auto-refresh"
                className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Automatically refresh balances
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
