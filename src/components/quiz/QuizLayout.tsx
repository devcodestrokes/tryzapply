import marsLogo from "@/assets/mars-men-logo.png";

interface QuizLayoutProps {
  children: React.ReactNode;
  progress?: number;
}

const QuizLayout = ({ children, progress }: QuizLayoutProps) => {
  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <img src={marsLogo} alt="Mars Men" className="h-10" />
      </div>
      {progress !== undefined && (
        <div className="w-full px-4 pt-2">
          <div className="quiz-progress-bar max-w-lg mx-auto">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <div className="quiz-content">{children}</div>
      <div className="quiz-footer">
        © Zapply 2025{" "}
        <a href="#" className="underline">Terms of Service</a>{" • "}
        <a href="#" className="underline">Privacy Policy</a>
      </div>
    </div>
  );
};

export default QuizLayout;
