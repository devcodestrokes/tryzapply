import { useState, useCallback, useRef, useEffect } from "react";
import QuizLayout from "./QuizLayout";
import QuizQuestion from "./QuizQuestion";
import type { QuizOption } from "./QuizQuestion";
import QuizInterstitial from "./QuizInterstitial";
import QuizLoading from "./QuizLoading";
import QuizResult from "./QuizResult";
import QuizTestimonial from "./QuizTestimonial";
import { generateSessionId, trackQuizEvent } from "@/lib/analytics";
import reportMan from "@/assets/report-man.png";

export type QuizStepType = "question" | "interstitial" | "loading" | "result";

export interface QuizStep {
  type: QuizStepType;
  // For question type
  question?: string;
  subtitle?: string;
  options?: QuizOption[];
  multiSelect?: boolean;
  whyWeAsk?: string;
  image?: string;
  // For interstitial type
  title?: string;
  interstitialSubtitle?: string;
  interstitialImage?: string;
  interstitialImages?: string[];
  autoAdvance?: boolean;
  autoAdvanceMs?: number;
}

interface QuizEngineProps {
  steps: QuizStep[];
  focus: "testosterone" | "energy";
  variant: string;
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
  variant,
  headline,
  headlineSubtitle,
  testimonial,
}: QuizEngineProps) => {
  const [currentStep, setCurrentStep] = useState(0); // start at first question
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const sessionIdRef = useRef(generateSessionId());
  const trackedRef = useRef({ start: false, complete: false });

  // Preload the report image early so it's cached when results show
  useEffect(() => {
    const img = new Image();
    img.src = reportMan;
  }, []);

  const totalSteps = steps.length;
  const progress = Math.round(((currentStep + 1) / (totalSteps + 1)) * 100);

  const handleAnswer = useCallback(
    (selected: number[]) => {
      // Track quiz start on first answer
      if (currentStep === 0 && !trackedRef.current.start) {
        trackedRef.current.start = true;
        trackQuizEvent(sessionIdRef.current, variant, "quiz_start");
      }
      setAnswers((prev) => ({ ...prev, [currentStep]: selected }));
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= steps.length && !trackedRef.current.complete) {
          trackedRef.current.complete = true;
          trackQuizEvent(sessionIdRef.current, variant, "quiz_complete");
        }
        return next;
      });
    },
    [currentStep, variant, steps.length]
  );

  const handleContinue = useCallback(() => {
    setCurrentStep((prev) => {
      const next = prev + 1;
      if (next >= steps.length && !trackedRef.current.complete) {
        trackedRef.current.complete = true;
        trackQuizEvent(sessionIdRef.current, variant, "quiz_complete");
      }
      return next;
    });
  }, [variant, steps.length]);

  const handleClaim = () => {
    trackQuizEvent(sessionIdRef.current, variant, "claim");
    window.open("https://tryzapply.com/products/testo-charge-90-capsules-gratis-e-book", "_blank");
  };

  const renderStep = () => {
    // Result screen
    if (currentStep >= totalSteps) {
      return <QuizResult focus={focus} answers={answers} steps={steps} onClaim={handleClaim} />;
    }

    const step = steps[currentStep];

    switch (step.type) {
      case "question":
        return (
          <div className="w-full flex flex-col">
            {currentStep === 0 && (
              <div className="w-fit animate-in fade-in slide-in-from-bottom-4 duration-400 mx-auto mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-4 text-foreground">
                  {headline}
                </h1>
                <p className="text-center text-muted-foreground text-sm md:text-base mb-4 flex items-center justify-center gap-2">
                  <img src="/tick-icon.svg" alt="" className="w-3 h-3" />
                  {headlineSubtitle}
                </p>
                <QuizTestimonial quote={testimonial.quote} name={testimonial.name} />
              </div>
            )}
            <QuizQuestion
              key={currentStep}
              question={step.question!}
              subtitle={step.subtitle}
              options={step.options!}
              multiSelect={step.multiSelect}
              whyWeAsk={step.whyWeAsk}
              image={currentStep === 0 ? undefined : step.image}
              onAnswer={handleAnswer}
            />
          </div>
        );
      case "interstitial":
        return (
          <QuizInterstitial
            key={currentStep}
            title={step.title!}
            subtitle={step.interstitialSubtitle}
            image={step.interstitialImage}
            images={step.interstitialImages}
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
    <QuizLayout progress={progress}>
      {renderStep()}
    </QuizLayout>
  );
};

export default QuizEngine;
