interface QuizLayoutProps {
  children: React.ReactNode;
  progress?: number;
}

const QuizLayout = ({ children, progress }: QuizLayoutProps) => {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      {progress !== undefined && (
        <div className="w-full px-0 pt-0 sticky top-0 z-10 bg-background">
          <div className="w-full h-1.5 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto">
        {children}
      </div>
    </div>
  );
};

export default QuizLayout;
