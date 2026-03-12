import { AlertTriangle, TrendingDown, BarChart3, Zap, Activity } from "lucide-react";
import tiredMan from "@/assets/tired-man.png";

interface QuizReportProps {
  focus: "testosterone" | "energy";
}

const QuizReport = ({ focus }: QuizReportProps) => {
  const isTesto = focus === "testosterone";
  const title = isTesto ? "Level of T Decline" : "Level of Energy Decline";
  const assessmentTitle = isTesto
    ? "Testosterone Assessment: DECLINING"
    : "Energy Assessment: DECLINING";
  const assessmentDesc = isTesto
    ? "Your testosterone production is significantly below peak. This results from accumulated stress, metabolic slowdown, and environmental toxins."
    : "Your energy systems are significantly below optimal. This results from accumulated stress, poor recovery, and nutrient deficiencies.";

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-xl font-black text-foreground tracking-tight">
          {title}
        </h2>
        <span className="px-3 py-1 border-2 border-primary rounded-md text-xs font-black text-primary uppercase tracking-widest">
          High Level
        </span>
      </div>

      {/* Man Image */}
      <div className="flex justify-center -mb-2 relative z-10">
        <img
          src={tiredMan}
          alt="Assessment subject"
          className="w-48 h-auto object-contain"
        />
      </div>

      {/* Level Bar */}
      <div className="relative mb-1">
        {/* "Your Level" tooltip */}
        <div className="flex justify-end pr-[22%] mb-1">
          <div className="bg-foreground text-background text-xs font-bold px-3 py-1.5 rounded-md relative">
            YOUR LEVEL
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
          </div>
        </div>

        {/* Bar */}
        <div className="w-full h-4 rounded-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-500 relative">
          {/* Indicator */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[20%]">
            <div className="w-7 h-7 rounded-full border-[3px] border-primary bg-background shadow-lg" />
          </div>
        </div>

        {/* Labels */}
        <div className="flex justify-between mt-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
          <span>Low</span>
          <span>Normal</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>

      {/* Assessment Box */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mt-4 flex gap-3 items-start">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <AlertTriangle className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="font-black text-sm text-foreground mb-1">
            {assessmentTitle}
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {assessmentDesc}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-5">
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Decline Pattern:
            </p>
            <p className="text-sm font-black text-foreground">Progressive</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Room for Improvement:
            </p>
            <p className="text-sm font-black text-foreground">HIGH</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Root Causes:
            </p>
            <p className="text-sm font-black text-foreground">
              {isTesto ? "Cortisol Environmental" : "Stress & Nutrition"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Quality of Life Impact:
            </p>
            <p className="text-sm font-black text-foreground">Substantial</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizReport;
