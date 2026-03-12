import { AlertTriangle, TrendingDown, BarChart3, Zap, Activity } from "lucide-react";
import reportMan from "@/assets/report-man.png";
import type { QuizStep } from "./QuizEngine";

interface QuizReportProps {
  focus: "testosterone" | "energy";
  answers: Record<number, number[]>;
  steps: QuizStep[];
}

/* ── Scoring logic ────────────────────────────────────────── */
function analyzeAnswers(
  focus: "testosterone" | "energy",
  answers: Record<number, number[]>,
  steps: QuizStep[]
) {
  let riskScore = 0; // 0-100, higher = worse

  steps.forEach((step, idx) => {
    if (step.type !== "question" || !answers[idx]) return;
    const selected = answers[idx];
    const q = (step.question ?? "").toLowerCase();

    // Age — older = higher risk
    if (q.includes("how old")) {
      const ageIdx = selected[0];
      riskScore += [30, 22, 12, 5][ageIdx] ?? 10;
    }
    // Energy at 3pm
    else if (q.includes("energy at 3pm") || q.includes("energy at 3 pm")) {
      riskScore += [25, 18, 8, 0][selected[0]] ?? 10;
    }
    // Stress symptoms
    else if (q.includes("stress symptoms")) {
      riskScore += selected[0] === 0 ? 15 : 0;
    }
    // When noticed changes
    else if (q.includes("start noticing")) {
      riskScore += [20, 14, 8, 5][selected[0]] ?? 8;
    }
    // Body composition
    else if (q.includes("body composition")) {
      riskScore += [0, 5, 12, 20][selected[0]] ?? 5;
    }
    // Sleep
    else if (q.includes("sleep")) {
      riskScore += [20, 12, 2, 5][selected[0]] ?? 5;
    }
    // Family history
    else if (q.includes("family history")) {
      riskScore += selected[0] === 0 ? 12 : selected[0] === 2 ? 6 : 0;
    }
    // Processed foods
    else if (q.includes("processed food")) {
      riskScore += [18, 12, 4, 0][selected[0]] ?? 5;
    }
  });

  // Clamp to 0-100
  riskScore = Math.min(100, Math.max(0, riskScore));

  // Determine severity level
  let level: "Low" | "Medium" | "High" | "Very High";
  let levelPosition: number; // percentage from right for the indicator
  let declinePattern: string;
  let rootCauses: string;

  if (riskScore < 25) {
    level = "Low";
    levelPosition = 75;
    declinePattern = "Early Stage";
  } else if (riskScore < 50) {
    level = "Medium";
    levelPosition = 50;
    declinePattern = "Moderate";
  } else if (riskScore < 75) {
    level = "High";
    levelPosition = 25;
    declinePattern = "Progressive";
  } else {
    level = "Very High";
    levelPosition = 10;
    declinePattern = "Accelerated";
  }

  // Root causes based on answers
  const causes: string[] = [];
  steps.forEach((step, idx) => {
    if (step.type !== "question" || !answers[idx]) return;
    const q = (step.question ?? "").toLowerCase();
    if (q.includes("stress") && answers[idx][0] === 0) causes.push("Stress");
    if (q.includes("sleep") && answers[idx][0] <= 1) causes.push("Poor Sleep");
    if (q.includes("processed") && answers[idx][0] <= 1) causes.push("Diet");
    if (q.includes("body composition") && answers[idx][0] >= 2) causes.push("Body Fat");
  });
  if (causes.length === 0) causes.push("Lifestyle");
  rootCauses = causes.slice(0, 2).join(" & ");

  const isTesto = focus === "testosterone";
  const assessmentStatus = riskScore >= 50 ? "DECLINING" : riskScore >= 25 ? "SUBOPTIMAL" : "NEEDS ATTENTION";
  const assessmentDesc = isTesto
    ? riskScore >= 50
      ? "Your testosterone production is significantly below peak. This results from accumulated stress, metabolic slowdown, and environmental toxins."
      : riskScore >= 25
        ? "Your testosterone levels show signs of decline. Early intervention can prevent further deterioration and restore optimal function."
        : "Your testosterone levels show early warning signs. Taking action now can prevent future decline and keep you performing at your best."
    : riskScore >= 50
      ? "Your energy systems are significantly below optimal. This results from accumulated stress, poor recovery, and nutrient deficiencies."
      : riskScore >= 25
        ? "Your energy production is showing signs of decline. Targeted support can help restore your natural vitality."
        : "Your energy levels show room for improvement. Optimizing now can unlock significantly better daily performance.";

  const improvementLevel = riskScore >= 50 ? "HIGH" : riskScore >= 25 ? "MODERATE" : "GOOD";
  const qualityImpact = riskScore >= 50 ? "Substantial" : riskScore >= 25 ? "Moderate" : "Noticeable";

  return {
    level,
    levelPosition,
    declinePattern,
    rootCauses,
    assessmentStatus,
    assessmentDesc,
    improvementLevel,
    qualityImpact,
    riskScore,
  };
}

const QuizReport = ({ focus, answers, steps }: QuizReportProps) => {
  const analysis = analyzeAnswers(focus, answers, steps);
  const isTesto = focus === "testosterone";
  const title = isTesto ? "Level of T Decline" : "Level of Energy Decline";
  const assessmentTitle = isTesto
    ? `Testosterone Assessment: ${analysis.assessmentStatus}`
    : `Energy Assessment: ${analysis.assessmentStatus}`;

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-xl font-black text-foreground tracking-tight">
          {title}
        </h2>
        <span className="px-3 py-1 border-2 border-primary rounded-md text-xs font-black text-primary uppercase tracking-widest">
          {analysis.level}
        </span>
      </div>

      {/* Man Image */}
      <div className="flex justify-center mb-4 relative z-10">
        <img
          src={reportMan}
          alt="Assessment subject"
          className="w-48 h-auto object-contain"
        />
      </div>

      {/* Level Bar */}
      <div className="relative mb-1">
        {/* "Your Level" tooltip */}
        <div className="flex justify-end mb-1" style={{ paddingRight: `${analysis.levelPosition - 5}%` }}>
          <div className="bg-foreground text-background text-xs font-bold px-3 py-1.5 rounded-md relative">
            YOUR LEVEL
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-foreground rotate-45" />
          </div>
        </div>

        {/* Bar */}
        <div className="w-full h-4 rounded-full relative" style={{ background: 'linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) 60%, hsl(0, 70%, 50%) 100%)' }}>
          {/* Indicator */}
          <div
            className="absolute top-1/2 -translate-y-1/2"
            style={{ right: `${analysis.levelPosition}%` }}
          >
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
            {analysis.assessmentDesc}
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
            <p className="text-sm font-black text-foreground">{analysis.declinePattern}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Room for Improvement:
            </p>
            <p className="text-sm font-black text-foreground">{analysis.improvementLevel}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Root Causes:
            </p>
            <p className="text-sm font-black text-foreground">{analysis.rootCauses}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary shrink-0" />
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              Quality of Life Impact:
            </p>
            <p className="text-sm font-black text-foreground">{analysis.qualityImpact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizReport;
