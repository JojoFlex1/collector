"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, ArrowRight } from "lucide-react"

interface ProcessingViewProps {
  onComplete: () => void
}

export default function ProcessingView({ onComplete }: ProcessingViewProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Collecting dust from connected wallets",
    "Optimizing batch transactions",
    "Processing batch transactions",
    "Transferring to Base via bridge",
    "Complete",
  ]

  const startProcessing = () => {
    setIsProcessing(true)

    // Simulate processing steps
    let step = 0
    const interval = setInterval(() => {
      step += 1
      setCurrentStep(step)

      if (step >= steps.length - 1) {
        clearInterval(interval)
      }
    }, 2000)
  }

  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Batch Processing</h3>
        <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">
          We'll batch process your dust to minimize gas fees and transfer to Base via bridge.
        </p>

        <div className="mb-4 sm:mb-5">
          <div className="flex justify-between items-center mb-2 sm:mb-3">
            <span className="text-sm sm:text-base font-medium">Processing Status</span>
            <span className="text-sm sm:text-base text-gray-400">Step {isProcessing ? currentStep + 1 : 0} of 5</span>
          </div>
          <Progress value={isProcessing ? (currentStep + 1) * 20 : 0} className="h-2 sm:h-3" />
        </div>

        <div className="space-y-3 sm:space-y-5 mb-6 sm:mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                {currentStep > index ? (
                  <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                ) : currentStep === index ? (
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs sm:text-base">
                    {index + 1}
                  </div>
                ) : (
                  <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border border-gray-600 text-gray-600 flex items-center justify-center text-xs sm:text-base">
                    {index + 1}
                  </div>
                )}
              </div>
              <span className={`text-sm sm:text-base ${currentStep >= index ? "text-white" : "text-gray-500"}`}>
                {step}
              </span>
            </div>
          ))}
        </div>

        {currentStep >= steps.length - 1 ? (
          <Button
            onClick={onComplete}
            className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
          >
            Continue to Aggregate
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        ) : (
          <Button
            onClick={startProcessing}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
          >
            {isProcessing ? "Processing..." : "Start Processing"}
          </Button>
        )}
      </div>

      <div className="mt-6 sm:mt-8">
        <h3 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3">Processing Details</h3>
        <div className="bg-gray-800 rounded-lg p-4 sm:p-5 text-sm sm:text-base">
          {isProcessing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div>
                <div className="text-gray-400 mb-1 sm:mb-2">Estimated Gas Savings</div>
                <div className="font-medium">Calculating...</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1 sm:mb-2">Processing Fee</div>
                <div className="font-medium">0.5%</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1 sm:mb-2">Estimated Completion</div>
                <div className="font-medium">~2 minutes</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1 sm:mb-2">Batch Size</div>
                <div className="font-medium">Calculating...</div>
              </div>
            </div>
          ) : (
            <div className="text-center py-3 sm:py-4">
              <p className="text-gray-400">Processing details will appear here once started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
