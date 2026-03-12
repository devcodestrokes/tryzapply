import { useState } from "react";

interface QuizResultProps {
  focus: "testosterone" | "energy";
  onClaim: () => void;
}

const QuizResult = ({ focus, onClaim }: QuizResultProps) => {
  const [step, setStep] = useState(0);

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 90);
  const dateStr = futureDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  if (step === 0) {
    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-foreground">
          Summary of your Profile
        </h2>

        <div className="flex flex-col gap-4 mb-6">
          <img
            src="/images/profile-summary-1.png"
            alt="Profile summary chart"
            className="w-full rounded-xl"
          />
          <img
            src="/images/profile-summary-2.png"
            alt="Profile risk analysis"
            className="w-full rounded-xl"
          />
        </div>

        <button onClick={() => setStep(1)} className="quiz-cta-button">
          CONTINUE
        </button>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
        <h3 className="text-lg md:text-xl font-bold text-center mb-2">
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

        <img
          src="/images/results-graph.png"
          alt="Expected results timeline"
          className="w-full rounded-xl mb-6"
        />

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
        src="/images/product-guarantee.png"
        alt="Product guarantee"
        className="w-full rounded-xl mb-6"
      />

      <button onClick={onClaim} className="quiz-cta-button">
        CLAIM YOUR DISCOUNT
      </button>
    </div>
  );
};

export default QuizResult;
