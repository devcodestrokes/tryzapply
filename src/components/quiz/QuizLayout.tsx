import lightningBolt from "@/assets/lightning-bolt.png";

interface QuizLayoutProps {
  children: React.ReactNode;
  progress?: number;
}

const QuizLayout = ({ children, progress }: QuizLayoutProps) => {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col relative overflow-hidden">
      {/* Background lightning bolt watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={lightningBolt}
          alt=""
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-[0.04] select-none"
        />
      </div>

      {/* Subtle gradient blending */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/[0.03] via-transparent to-primary/[0.02]" />

      {progress !== undefined && (
        <div className="w-full px-0 pt-0 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
          <div className="w-full h-1.5 bg-muted">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto relative z-[1]">
        {children}
      </div>
    </div>
  );
};

export default QuizLayout;
