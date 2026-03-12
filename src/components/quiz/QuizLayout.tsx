import zapplyLogo from "/zapply-logo.svg";

interface QuizLayoutProps {
  children: React.ReactNode;
  progress?: number;
}

const QuizLayout = ({ children, progress }: QuizLayoutProps) => {
  return (
    <div className="quiz-container">
      {progress !== undefined && (
        <div className="w-full px-4 pt-4">
          <div className="quiz-progress-bar max-w-lg mx-auto">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <div className="quiz-content">{children}</div>
    </div>
  );
};

export default QuizLayout;
