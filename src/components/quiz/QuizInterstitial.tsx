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
  image,
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
        <p className="text-muted-foreground text-sm md:text-base mb-4">{subtitle}</p>
      )}
      {image && (
        <div className="flex justify-center mb-6">
          <img src={image} alt="Before and after transformation" className="max-h-72 md:max-h-96 w-auto rounded-xl object-contain" />
        </div>
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
