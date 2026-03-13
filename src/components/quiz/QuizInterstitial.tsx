import { useEffect } from "react";

interface QuizInterstitialProps {
  title: string;
  subtitle?: string;
  image?: string;
  autoAdvance?: boolean;
  autoAdvanceMs?: number;
  showContinue?: boolean;
  onContinue: () => void;
}

const QuizInterstitial = ({
  title,
  subtitle,
  autoAdvance = false,
  autoAdvanceMs = 2000,
  showContinue = true,
  onContinue,
}: QuizInterstitialProps) => {
  useEffect(() => {
    if (autoAdvance) {
      const timer = setTimeout(onContinue, autoAdvanceMs);
      return () => clearTimeout(timer);
    }
  }, [autoAdvance, autoAdvanceMs, onContinue]);

  return (
    <div className="w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-400">
      <div className="text-4xl mb-4">💪</div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base mb-6">{subtitle}</p>
      )}
      {showContinue && (
        <button onClick={onContinue} className="quiz-cta-button">
          Continue
        </button>
      )}
    </div>
  );
};

export default QuizInterstitial;
