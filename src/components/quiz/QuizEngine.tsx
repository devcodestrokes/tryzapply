import { useState, useCallback } from "react";
import QuizLayout from "./QuizLayout";
import QuizQuestion, { type QuizOption } from "./QuizQuestion";
import QuizInterstitial from "./QuizInterstitial";
import QuizLoading from "./QuizLoading";
import QuizResult from "./QuizResult";
import QuizTestimonial from "./QuizTestimonial";

export type QuizStepType = "question" | "interstitial" | "loading" | "result";

export interface QuizStep {
  type: QuizStepType;
  // For question type
  question?: string;
  subtitle?: string;
  options?: QuizOption[];
  multiSelect?: boolean;
  whyWeAsk?: string;
  // For interstitial type
  title?: string;
  interstitialSubtitle?: string;
  autoAdvance?: boolean;
  autoAdvanceMs?: number;
}

interface QuizEngineProps {
  steps: QuizStep[];
  focus: "testosterone" | "energy";
  headline: string;
  headlineSubtitle: string;
  testimonial: {
    quote: string;
    name: string;
  };
}

const QuizEngine = ({
  steps,
  focus,
  headline,
  headlineSubtitle,
  testimonial,
}: QuizEngineProps) => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = intro
  const [answers, setAnswers] = useState<Record<number, number[]>>({});

  const totalSteps = steps.length;
  const progress = currentStep < 0 ? 0 : Math.round(((currentStep + 1) / (totalSteps + 1)) * 100);

  const handleAnswer = useCallback(
    (selected: number[]) => {
      setAnswers((prev) => ({ ...prev, [currentStep]: selected }));
      setCurrentStep((prev) => prev + 1);
    },
    [currentStep]
  );

  const handleContinue = useCallback(() => {
    setCurrentStep((prev) => prev + 1);
  }, []);

  const handleClaim = () => {
    window.open("https://mengotomars.com/products/30-day-supply-starter-kit", "_blank");
  };

  const renderStep = () => {
    // Intro screen
    if (currentStep === -1) {
      return (
        <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">
            {headline}
          </h1>
          <p className="text-center text-muted-foreground text-sm md:text-base mb-6">
            ✅ {headlineSubtitle}
          </p>
          <QuizTestimonial quote={testimonial.quote} name={testimonial.name} />
        </div>
      );
    }

    // Result screen
    if (currentStep >= totalSteps) {
      return <QuizResult focus={focus} onClaim={handleClaim} />;
    }

    const step = steps[currentStep];

    switch (step.type) {
      case "question":
        return (
          <QuizQuestion
            key={currentStep}
            question={step.question!}
            subtitle={step.subtitle}
            options={step.options!}
            multiSelect={step.multiSelect}
            whyWeAsk={step.whyWeAsk}
            onAnswer={handleAnswer}
          />
        );
      case "interstitial":
        return (
          <QuizInterstitial
            key={currentStep}
            title={step.title!}
            subtitle={step.interstitialSubtitle}
            autoAdvance={step.autoAdvance}
            autoAdvanceMs={step.autoAdvanceMs}
            onContinue={handleContinue}
          />
        );
      case "loading":
        return <QuizLoading key={currentStep} onComplete={handleContinue} />;
      default:
        return null;
    }
  };

  return (
    <QuizLayout progress={currentStep >= 0 ? progress : undefined}>
      {renderStep()}
      {currentStep === -1 && (
        <div className="w-full mt-2">
          <button onClick={handleContinue} className="quiz-cta-button">
            Start Assessment
          </button>
        </div>
      )}
    </QuizLayout>
  );
};

export default QuizEngine;
