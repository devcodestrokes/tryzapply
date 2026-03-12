import lightningBolt from "@/assets/lightning-bolt.png";

interface QuizLayoutProps {
  children: React.ReactNode;
  progress?: number;
}

const QuizLayout = ({ children, progress }: QuizLayoutProps) => {
  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col relative overflow-hidden">
      {/* Large lightning bolt - top right */}
      <img
        src={lightningBolt}
        alt=""
        className="absolute -top-20 -right-20 w-[400px] h-[400px] md:w-[550px] md:h-[550px] opacity-[0.05] rotate-12 pointer-events-none select-none"
      />

      {/* Small lightning bolt - bottom left */}
      <img
        src={lightningBolt}
        alt=""
        className="absolute -bottom-16 -left-16 w-[250px] h-[250px] md:w-[350px] md:h-[350px] opacity-[0.03] -rotate-[25deg] pointer-events-none select-none"
      />

      {/* Decorative circles */}
      <div className="absolute top-[15%] right-[8%] w-48 h-48 md:w-72 md:h-72 rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-40 h-40 md:w-60 md:h-60 rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute top-[40%] left-[15%] w-24 h-24 md:w-32 md:h-32 rounded-full bg-primary/[0.02] blur-2xl pointer-events-none" />

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
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 w-full max-w-6xl mx-auto relative z-[1]">
        {children}
      </div>
    </div>
  );
};

export default QuizLayout;
