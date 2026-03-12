import QuizEngine from "@/components/quiz/QuizEngine";
import { energyLongSteps } from "@/data/energyQuizData";

const EnergyLongQuiz = () => (
  <QuizEngine
    steps={energyLongSteps}
    focus="energy"
    headline="Find Out Why You're Always Tired (And How To Fix It)"
    headlineSubtitle="This 2-minute assessment analyzes your energy patterns, diet, and lifestyle to find the root cause of your fatigue."
    testimonial={{
      quote:
        "I used to crash every afternoon at 3pm. After taking this quiz and following the plan, I have steady energy from morning to night. Game changer.",
      name: "JAMES",
    }}
  />
);

export default EnergyLongQuiz;
