interface QuizLayoutProps {
  children: React.ReactNode;
  progress?: number;
}

const QuizLayout = ({ children, progress }: QuizLayoutProps) => {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      {progress !== undefined && (
        <div className="w-full px-4 sm:px-6 pt-4 sticky top-0 z-10 bg-background">
          <div className="quiz-progress-bar max-w-2xl mx-auto">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-6 sm:py-8 max-w-2xl mx-auto w-full">
        {children}
      </div>
    </div>
  );
};

export default QuizLayout;
