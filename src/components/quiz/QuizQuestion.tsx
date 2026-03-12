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
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
      {/* Question title always centered at top */}
      <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
        {question}
      </h2>
      {subtitle && (
        <p className="text-center text-muted-foreground mb-4 text-sm">{subtitle}</p>
      )}

      {image ? (
        /* Desktop: image left, options right | Mobile: stacked */
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 w-full mt-4">
          <div className="flex justify-center md:justify-end md:flex-1 mb-4 md:mb-0">
            <img
              src={image}
              alt=""
              className="h-56 sm:h-64 md:h-[22rem] lg:h-[26rem] w-auto object-contain drop-shadow-lg"
            />
          </div>
          <div className="md:flex-1 w-full">
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
        <div className="max-w-lg mx-auto w-full">
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
