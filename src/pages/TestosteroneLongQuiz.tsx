import QuizEngine from "@/components/quiz/QuizEngine";
import { testosteroneLongSteps } from "@/data/testosteroneQuizData";

const TestosteroneLongQuiz = () => (
  <QuizEngine
    steps={testosteroneLongSteps}
    focus="testosterone"
    variant="testosterone-long"
    headline="Find Out What's Really Happening With Your Testosterone"
    headlineSubtitle="This 2-minute assessment analyzes your symptoms, lifestyle, and risk factor in order to find a solution."
    testimonial={{
      quote:
        "I was skeptical at first that an online quiz could help me get my T levels back, but it was super easy, took maybe a minute, and… Let's just say me and my wife are VERY happy I took this quiz.",
      name: "ADAM",
    }}
  />
);

export default TestosteroneLongQuiz;
