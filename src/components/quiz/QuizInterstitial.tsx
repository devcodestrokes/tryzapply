import { useEffect, useState } from "react";

interface QuizInterstitialProps {
  title: string;
  subtitle?: string;
  image?: string;
  images?: string[];
  autoAdvance?: boolean;
  autoAdvanceMs?: number;
  showContinue?: boolean;
  onContinue: () => void;
}

const QuizInterstitial = ({
  title,
  subtitle,
  image,
  images,
  autoAdvance = false,
  autoAdvanceMs = 2000,
  showContinue = true,
  onContinue,
}: QuizInterstitialProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const allImages = images && images.length > 0 ? images : image ? [image] : [];

  useEffect(() => {
    if (autoAdvance) {
      const timer = setTimeout(onContinue, autoAdvanceMs);
      return () => clearTimeout(timer);
    }
  }, [autoAdvance, autoAdvanceMs, onContinue]);

  useEffect(() => {
    if (allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [allImages.length]);

  return (
    <div className="w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-400">
      <div className="text-4xl mb-4">💪</div>
      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">{title}</h2>
      {subtitle && (
        <p className="text-muted-foreground text-sm md:text-base mb-4">{subtitle}</p>
      )}
      {allImages.length > 0 && (
        <div className="flex flex-col items-center mb-6">
          <div className="relative overflow-hidden rounded-xl" style={{ minHeight: "280px" }}>
            {allImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Transformation result ${i + 1}`}
                className={`max-h-72 md:max-h-96 w-auto object-contain transition-all duration-500 ${
                  i === currentImageIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95 absolute inset-0 m-auto"
                }`}
              />
            ))}
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 mt-3">
              {allImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentImageIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          )}
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
