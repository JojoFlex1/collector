
import { Button } from "@/components/ui/button";

interface StepProps {
  stepNumber: number;
  title: string;
  isActive?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
}

export const Step = ({ stepNumber, title, isActive = false, isCompleted = false, onClick }: StepProps) => {
  const baseClasses = "px-6 py-3 rounded-md text-center transition-colors";
  let classes = baseClasses;
  
  if (isActive) {
    classes += " bg-web3-blue text-white";
  } else if (isCompleted) {
    classes += " text-muted-foreground hover:bg-blue-900/20 cursor-pointer";
  } else {
    classes += " text-muted-foreground";
  }
  
  return (
    <Button 
      variant="ghost" 
      className={classes} 
      onClick={onClick}
      disabled={!isCompleted && !isActive}
    >
      {stepNumber}. {title}
    </Button>
  );
};

interface StepsProgressProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const StepsProgress = ({ currentStep, onStepClick }: StepsProgressProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-y-0 md:space-x-2 mb-8">
      <Step 
        stepNumber={1} 
        title="Collect Dust" 
        isActive={currentStep === 1}
        isCompleted={currentStep > 1}
        onClick={() => onStepClick(1)}
      />
      <Step 
        stepNumber={2} 
        title="Process & Transfer" 
        isActive={currentStep === 2}
        isCompleted={currentStep > 2}
        onClick={() => onStepClick(2)}
      />
      <Step 
        stepNumber={3} 
        title="Aggregate on Base" 
        isActive={currentStep === 3}
        onClick={() => onStepClick(3)}
      />
    </div>
  );
};
