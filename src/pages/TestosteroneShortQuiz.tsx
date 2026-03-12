import QuizEngine from "@/components/quiz/QuizEngine";
import { testosteroneShortSteps } from "@/data/testosteroneQuizData";

const TestosteroneShortQuiz = () => (
  <QuizEngine
    steps={testosteroneShortSteps}
    focus="testosterone"
    headline="Find Out What's Really Happening With Your Testosterone"
    headlineSubtitle="This quick assessment analyzes your symptoms to find a solution — takes under 60 seconds."
    testimonial={{
      quote:
        "Took me less than a minute and completely changed how I approach my health. My energy and drive are back!",
      name: "MARCUS",
    }}
  />
);

export default TestosteroneShortQuiz;
