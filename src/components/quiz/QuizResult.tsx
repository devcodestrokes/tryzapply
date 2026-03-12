import { useState } from "react";
import QuizReport from "./QuizReport";
import ResultsGraph from "./ResultsGraph";
import type { QuizStep } from "./QuizEngine";
import zapplyProduct from "@/assets/zapply-product.png";

interface QuizResultProps {
  focus: "testosterone" | "energy";
  answers: Record<number, number[]>;
  steps: QuizStep[];
  onClaim: () => void;
}

// Reuse scoring logic — simple version for risk score
function calcRiskScore(answers: Record<number, number[]>, steps: QuizStep[]): number {
  let riskScore = 0;
  steps.forEach((step, idx) => {
    if (step.type !== "question" || !answers[idx]) return;
    const selected = answers[idx];
    const q = (step.question ?? "").toLowerCase();
    if (q.includes("how old")) riskScore += [30, 22, 12, 5][selected[0]] ?? 10;
    else if (q.includes("energy at 3pm") || q.includes("energy at 3 pm")) riskScore += [25, 18, 8, 0][selected[0]] ?? 10;
    else if (q.includes("stress symptoms")) riskScore += selected[0] === 0 ? 15 : 0;
    else if (q.includes("start noticing")) riskScore += [20, 14, 8, 5][selected[0]] ?? 8;
    else if (q.includes("body composition")) riskScore += [0, 5, 12, 20][selected[0]] ?? 5;
    else if (q.includes("sleep")) riskScore += [20, 12, 2, 5][selected[0]] ?? 5;
    else if (q.includes("family history")) riskScore += selected[0] === 0 ? 12 : selected[0] === 2 ? 6 : 0;
    else if (q.includes("processed food")) riskScore += [18, 12, 4, 0][selected[0]] ?? 5;
  });
  return Math.min(100, Math.max(0, riskScore));
}

const QuizResult = ({ focus, answers, steps, onClaim }: QuizResultProps) => {
  const [step, setStep] = useState(0);
  const riskScore = calcRiskScore(answers, steps);

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 90);
  const dateStr = futureDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  if (step === 0) {
    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground">
          Summary of your Profile
        </h2>

        <QuizReport focus={focus} answers={answers} steps={steps} />

        <button onClick={() => setStep(1)} className="quiz-cta-button mt-6">
          CONTINUE
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
        <h3 className="text-lg md:text-xl font-bold text-center mb-2 text-foreground">
          The last solution you'll ever need
          {focus === "testosterone"
            ? " to feel like a man again."
            : " to get your energy back."}
        </h3>
        <p className="text-sm text-muted-foreground text-center mb-4">
          Based on your answers, we expect you to visibly increase{" "}
          {focus === "testosterone"
            ? "energy, strength and masculine drive"
            : "daily energy, mental clarity and vitality"}{" "}
          by <strong>{dateStr}</strong>
        </p>

        <ResultsGraph focus={focus} riskScore={riskScore} />

        <button onClick={() => setStep(2)} className="quiz-cta-button">
          Continue
        </button>
      </div>
    );
  }

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
      <h2 className="text-xl md:text-2xl font-bold text-center mb-2">
        {focus === "testosterone"
          ? "You'll Reclaim Your Energy & Drive With Just a 90-Day Supply from Zapply"
          : "You'll Reclaim Your Energy & Vitality With Just a 90-Day Supply from Zapply"}
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-2">
        Because you qualify, we guarantee you'll achieve all your goals with a
        90-day supply of our Natural{" "}
        {focus === "testosterone" ? "T-Optimization" : "Energy-Optimization"}{" "}
        System.
      </p>
      <p className="text-sm font-bold text-foreground text-center mb-4">
        If not, you'll receive a full refund - no questions asked!
      </p>

      <img
        src={zapplyProduct}
        alt="Zapply T1 supplement product"
        className="w-full max-w-md mx-auto rounded-xl mb-6"
      />

      <button onClick={onClaim} className="quiz-cta-button">
        CLAIM YOUR DISCOUNT
      </button>
    </div>
  );
};

export default QuizResult;
