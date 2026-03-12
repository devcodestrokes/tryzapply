import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

interface QuizLoadingProps {
  onComplete: () => void;
}

const steps = [
  "Analysing your profile",
  "Gathering relevant data",
  "Finalizing calculations",
  "Almost there...",
];

const QuizLoading = ({ onComplete }: QuizLoadingProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 800);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="w-full animate-in fade-in duration-400">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-8 text-foreground">
        Building your profile...
      </h2>
      <div className="flex flex-col gap-4 max-w-xs mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 transition-all duration-300 ${
              index < currentStep
                ? "quiz-loading-step-done"
                : index === currentStep
                ? "quiz-loading-step-active"
                : "text-muted-foreground/40"
            }`}
          >
            {index < currentStep ? (
              <Check className="w-5 h-5 text-quiz-success shrink-0" />
            ) : index === currentStep ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary shrink-0" />
            ) : (
              <div className="w-5 h-5 rounded-full border-2 border-muted shrink-0" />
            )}
            <span className="text-sm">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizLoading;
