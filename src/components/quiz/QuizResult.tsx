interface QuizResultProps {
  focus: "testosterone" | "energy";
  onClaim: () => void;
}

const QuizResult = ({ focus, onClaim }: QuizResultProps) => {
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 90);
  const dateStr = futureDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-400">
      <div className="quiz-result-card mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-3 text-foreground">
          Summary of your Profile
        </h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Risk Level</span>
            <span className="font-bold text-primary">Moderate-High</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Primary Concern</span>
            <span className="font-bold">
              {focus === "testosterone" ? "Low Testosterone" : "Low Energy"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <span className="text-muted-foreground">Recovery Potential</span>
            <span className="font-bold text-quiz-success">High</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-muted-foreground">Recommended Plan</span>
            <span className="font-bold">90-Day Protocol</span>
          </div>
        </div>
      </div>

      <div className="quiz-result-card mb-6">
        <h3 className="text-lg font-bold text-center mb-2">
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
      </div>

      <div className="quiz-result-card mb-6 text-center">
        <h3 className="text-lg font-bold mb-2">
          {focus === "testosterone"
            ? "You'll Reclaim Your Energy & Drive With Just a 90-Day Supply from Zapply"
            : "You'll Reclaim Your Energy & Vitality With Just a 90-Day Supply from Zapply"}
        </h3>
        <p className="text-sm text-muted-foreground mb-2">
          Because you qualify, we guarantee you'll achieve all your goals with a
          90-day supply of our Natural{" "}
          {focus === "testosterone" ? "T-Optimization" : "Energy-Optimization"}{" "}
          System.
        </p>
        <p className="text-sm font-bold text-foreground mb-4">
          If not, you'll receive a full refund - no questions asked!
        </p>
      </div>

      <button onClick={onClaim} className="quiz-cta-button">
        CLAIM YOUR DISCOUNT
      </button>
    </div>
  );
};

export default QuizResult;
