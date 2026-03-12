import QuizEngine from "@/components/quiz/QuizEngine";
import { energyShortSteps } from "@/data/energyQuizData";

const EnergyShortQuiz = () => (
  <QuizEngine
    steps={energyShortSteps}
    focus="energy"
    headline="Find Out Why You're Always Tired (And How To Fix It)"
    headlineSubtitle="This quick assessment finds the root cause of your fatigue — takes under 60 seconds."
    testimonial={{
      quote:
        "Quick quiz, life-changing results. My energy levels are completely different now.",
      name: "DANIEL",
    }}
  />
);

export default EnergyShortQuiz;
