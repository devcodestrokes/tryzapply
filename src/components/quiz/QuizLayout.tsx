interface QuizLayoutProps {
  children: React.ReactNode;
  progress?: number;
}

const LightningSvg = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M70 0L0 115h45L30 200l90-125H75L110 0H70Z"
      fill="currentColor"
    />
  </svg>
);

const QuizLayout = ({ children, progress }: QuizLayoutProps) => {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col relative overflow-hidden">
      {/* Large lightning bolt - top right */}
      <LightningSvg className="absolute -top-10 -right-10 w-[300px] h-[450px] md:w-[400px] md:h-[600px] text-primary/[0.04] rotate-12 pointer-events-none select-none" />

      {/* Small lightning bolt - bottom left */}
      <LightningSvg className="absolute -bottom-8 -left-8 w-[200px] h-[300px] md:w-[280px] md:h-[420px] text-primary/[0.03] -rotate-[25deg] pointer-events-none select-none" />

      {/* Medium lightning bolt - center left */}
      <LightningSvg className="absolute top-[35%] -left-4 w-[100px] h-[150px] md:w-[140px] md:h-[210px] text-primary/[0.02] rotate-[15deg] pointer-events-none select-none" />

      {/* Decorative circles */}
      <div className="absolute top-[15%] right-[8%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-40 h-40 md:w-60 md:h-60 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />

      {/* Subtle dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-primary/[0.02] via-transparent to-primary/[0.03]" />

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
      <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto relative z-[1]">
        {children}
      </div>
    </div>
  );
};

export default QuizLayout;
