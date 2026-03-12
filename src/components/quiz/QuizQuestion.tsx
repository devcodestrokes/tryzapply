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
      {/* Image */}
      {image && (
        <div className="flex justify-center mb-4">
          <img
            src={image}
            alt=""
            className="h-40 sm:h-52 w-auto object-contain"
          />
        </div>
      )}

      <h2 className="text-xl md:text-2xl font-bold text-center mb-2 text-foreground">
        {question}
      </h2>
      {subtitle && (
        <p className="text-center text-muted-foreground mb-6 text-sm">{subtitle}</p>
      )}
      <div className="flex flex-col gap-3 mt-6">
        {options.map((option, index) => {
          const IconComp = option.icon ? iconMap[option.icon] : null;
          return (
            <button
              key={index}
              onClick={() => handleSelect(index)}
              className={`quiz-option ${
                selected.includes(index) ? "quiz-option-selected" : ""
              }`}
            >
              <span className="quiz-option-number">
                {index + 1}
              </span>
              {IconComp && <IconComp className="w-5 h-5 shrink-0" />}
              <span className="font-medium text-sm md:text-base">{option.label}</span>
            </button>
          );
        })}
      </div>

      {multiSelect && selected.length > 0 && (
        <button
          onClick={() => onAnswer(selected)}
          className="quiz-cta-button mt-6"
        >
          Continue
        </button>
      )}

      {whyWeAsk && (
        <div className="mt-6 p-4 bg-accent rounded-xl">
          <p className="text-xs font-bold text-foreground mb-1">Why we ask</p>
          <p className="text-xs text-muted-foreground">{whyWeAsk}</p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
