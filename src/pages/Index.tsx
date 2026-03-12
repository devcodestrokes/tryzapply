import { Link } from "react-router-dom";
import zapplyLogo from "/zapply-logo.svg";

const Index = () => {
  const quizzes = [
    {
      title: "Testosterone Focus — Long",
      description: "Full 2-minute assessment with 11 questions analyzing symptoms, lifestyle, and risk factors.",
      path: "/quiz/testosterone-long",
      tag: "Testosterone",
    },
    {
      title: "Testosterone Focus — Short",
      description: "Quick 60-second assessment with 5 key questions for fast results.",
      path: "/quiz/testosterone-short",
      tag: "Testosterone",
    },
    {
      title: "Energy Focus — Long",
      description: "Full 2-minute assessment analyzing energy patterns, diet, and lifestyle factors.",
      path: "/quiz/energy-long",
      tag: "Energy",
    },
    {
      title: "Energy Focus — Short",
      description: "Quick 60-second assessment to find the root cause of your fatigue.",
      path: "/quiz/energy-short",
      tag: "Energy",
    },
  ];

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <img src={zapplyLogo} alt="Zapply" className="h-8" />
      </div>
      <div className="quiz-content">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-foreground">
          Quiz Funnel Dashboard
        </h1>
        <p className="text-muted-foreground text-center mb-8 text-sm">
          Select a quiz variant to preview
        </p>
        <div className="w-full flex flex-col gap-4">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.path}
              to={quiz.path}
              className="quiz-option group hover:shadow-lg"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {quiz.tag}
                  </span>
                </div>
                <p className="font-bold text-sm text-foreground">{quiz.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{quiz.description}</p>
              </div>
              <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
            </Link>
          ))}
        </div>
      </div>
      <div className="quiz-footer">
        © Zapply 2025
      </div>
    </div>
  );
};

export default Index;
