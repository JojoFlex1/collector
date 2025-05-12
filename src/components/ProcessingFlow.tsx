
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface ProcessingStep {
  id: number;
  label: string;
  completed: boolean;
  active: boolean;
}

interface ProcessingFlowProps {
  steps: ProcessingStep[];
  currentStep: number;
  totalSteps: number;
  processing: boolean;
  onComplete: () => void;
}

export const ProcessingFlow = ({
  steps,
  currentStep,
  totalSteps,
  processing,
  onComplete
}: ProcessingFlowProps) => {
  // Calculate progress percentage
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-2">Batch Processing</h3>
        <p className="text-muted-foreground">
          We'll batch process your dust to minimize gas fees and transfer to Base via bridge.
        </p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Processing Status</span>
          <span>Step {currentStep} of {totalSteps}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="space-y-4">
        {steps.map((step) => (
          <div 
            key={step.id}
            className={`flex items-center space-x-3 ${
              step.active ? 'text-foreground' : 'text-muted-foreground'
            }`}
          >
            {step.completed ? (
              <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                <Check className="h-5 w-5" />
              </div>
            ) : (
              <div className={`w-8 h-8 rounded-full ${
                step.active ? 'bg-web3-blue text-white' : 'bg-muted text-muted-foreground'
              } flex items-center justify-center font-medium`}>
                {step.id}
              </div>
            )}
            <span>{step.label}</span>
          </div>
        ))}
      </div>
      
      <Button 
        disabled={processing} 
        onClick={onComplete} 
        className="w-full bg-web3-blue hover:bg-blue-700 text-white py-6 text-lg"
      >
        {processing ? "Processing..." : "Continue"}
      </Button>
      
      <div>
        <h4 className="text-lg font-medium mb-2">Processing Details</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Optimizing transactions for minimum gas usage</p>
          <p>• Batching multiple token transfers together</p>
          <p>• Using Base bridge for cross-chain transfers</p>
        </div>
      </div>
    </div>
  );
};
