import { useState } from "react";
import {
  Battery, Dumbbell, Heart, Brain, Scale,
  BatteryLow, TrendingDown, Wind, Zap,
  Moon, Frown, Coffee, Ban,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  battery: Battery,
  dumbbell: Dumbbell,
  heart: Heart,
  brain: Brain,
  scale: Scale,
  "battery-low": BatteryLow,
  "trending-down": TrendingDown,
  wind: Wind,
  zap: Zap,
  moon: Moon,
  frown: Frown,
  coffee: Coffee,
  ban: Ban,
};

export interface QuizOption {
  label: string;
  emoji?: string;
  icon?: string;
  optionImage?: string;
}

interface QuizQuestionProps {
  question: string;
  subtitle?: string;
  options: QuizOption[];
  multiSelect?: boolean;
  whyWeAsk?: string;
  image?: string;
  onAnswer: (selected: number[]) => void;
}

const QuizQuestion = ({
  question,
  subtitle,
  options,
  multiSelect = false,
  whyWeAsk,
  image,
  onAnswer,
}: QuizQuestionProps) => {
  const [selected, setSelected] = useState<number[]>([]);
  const hasOptionImages = options.some((o) => o.optionImage);

  const handleSelect = (index: number) => {
    if (multiSelect) {
      setSelected((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setSelected([index]);
      setTimeout(() => onAnswer([index]), 300);
    }
  };

  return (
    <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-400">

      {image ? (
        /* Desktop: image left, question+options right | Mobile: image bottom */
        <div className="flex flex-col-reverse md:flex-row md:gap-8 w-full flex-1">
          <div className="flex justify-center md:justify-start md:flex-1 mb-4 md:mb-0 md:self-stretch md:items-end hidden md:flex order-first">
            <img
              src={image}
              alt=""
              className="h-48 sm:h-56 md:h-full max-h-[50vh] md:max-h-[70vh] w-auto object-contain object-bottom drop-shadow-lg"
            />
          </div>
          <div className="md:flex-1 w-full flex flex-col justify-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
              {question}
            </h2>
            {subtitle && (
              <p className="text-muted-foreground mb-4 text-sm">{subtitle}</p>
            )}
            <div className="flex flex-col gap-3">
              {options.map((option, index) => {
                const IconComp = option.icon ? iconMap[option.icon] : null;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`quiz-option ${selected.includes(index) ? "quiz-option-selected" : ""}`}
                  >
                    <span className="quiz-option-number">{index + 1}</span>
                    {IconComp && <IconComp className="w-5 h-5 shrink-0" />}
                    <span className="font-medium text-sm md:text-base">{option.label}</span>
                  </button>
                );
              })}
            </div>
            {multiSelect && selected.length > 0 && (
              <button onClick={() => onAnswer(selected)} className="quiz-cta-button mt-6">Continue</button>
            )}
            {whyWeAsk && (
              <div className="mt-6 p-4 bg-accent rounded-xl">
                <p className="text-xs font-bold text-foreground mb-1">Why we ask</p>
                <p className="text-xs text-muted-foreground">{whyWeAsk}</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* No image: centered layout */
        <div className="max-w-lg mx-auto w-full flex-1 flex flex-col justify-center">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
            {question}
          </h2>
          {subtitle && (
            <p className="text-center text-muted-foreground mb-4 text-sm">{subtitle}</p>
          )}
          {hasOptionImages ? (
            <div className="grid grid-cols-2 gap-3 mt-4">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`relative flex flex-col items-center rounded-2xl border-2 p-3 transition-all duration-200 cursor-pointer ${
                    selected.includes(index)
                      ? "border-primary bg-primary/10 shadow-md"
                      : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
                  }`}
                >
                  {option.optionImage && (
                    <img
                      src={option.optionImage}
                      alt={option.label}
                      className="h-32 sm:h-40 w-auto object-contain mb-2"
                    />
                  )}
                  <span className="font-medium text-sm text-foreground">{option.label}</span>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3 mt-4">
              {options.map((option, index) => {
                const IconComp = option.icon ? iconMap[option.icon] : null;
                return (
                  <button
                    key={index}
                    onClick={() => handleSelect(index)}
                    className={`quiz-option ${selected.includes(index) ? "quiz-option-selected" : ""}`}
                  >
                    <span className="quiz-option-number">{index + 1}</span>
                    {IconComp && <IconComp className="w-5 h-5 shrink-0" />}
                    <span className="font-medium text-sm md:text-base">{option.label}</span>
                  </button>
                );
              })}
            </div>
          )}
          {multiSelect && selected.length > 0 && (
            <button onClick={() => onAnswer(selected)} className="quiz-cta-button mt-6">Continue</button>
          )}
          {whyWeAsk && (
            <div className="mt-6 p-4 bg-accent rounded-xl">
              <p className="text-xs font-bold text-foreground mb-1">Why we ask</p>
              <p className="text-xs text-muted-foreground">{whyWeAsk}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
