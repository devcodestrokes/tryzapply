import { useEffect, useState, useCallback } from "react";
import { fetchQuizAnalytics, type QuizAnalytics, type DateRange } from "@/lib/analytics";
import { BarChart3, Users, CheckCircle2, ShoppingCart, RefreshCw, Eye, TrendingUp } from "lucide-react";
import { DateRangePicker } from "@/components/DateRangePicker";
import { motion, AnimatePresence } from "framer-motion";

const quizzes = [
  {
    title: "Testosterone Focus — Long",
    description: "Full 2-minute assessment with 11 questions analyzing symptoms, lifestyle, and risk factors.",
    tag: "Testosterone",
    variant: "testosterone-long",
  },
  {
    title: "Testosterone Focus — Short",
    description: "Quick 60-second assessment with 5 key questions for fast results.",
    tag: "Testosterone",
    variant: "testosterone-short",
  },
  {
    title: "Energy Focus — Long",
    description: "Full 2-minute assessment analyzing energy patterns, diet, and lifestyle factors.",
    tag: "Energy",
    variant: "energy-long",
  },
  {
    title: "Energy Focus — Short",
    description: "Quick 60-second assessment to find the root cause of your fatigue.",
    tag: "Energy",
    variant: "energy-short",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const Index = () => {
  const [analytics, setAnalytics] = useState<QuizAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentRange, setCurrentRange] = useState<DateRange>({});

  const loadAnalytics = useCallback(async (range: DateRange) => {
    setLoading(true);
    const data = await fetchQuizAnalytics(range);
    setAnalytics(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadAnalytics(currentRange);
  }, [currentRange, loadAnalytics]);

  const handleRangeChange = (range: DateRange) => {
    setCurrentRange(range);
  };

  const getStats = (variant: string) => {
    const found = analytics.find((a) => a.quiz_variant === variant);
    return found || { page_visits: 0, starts: 0, completions: 0, claims: 0 };
  };

  const totals = analytics.reduce(
    (acc, a) => ({
      page_visits: acc.page_visits + a.page_visits,
      starts: acc.starts + a.starts,
      completions: acc.completions + a.completions,
      claims: acc.claims + a.claims,
    }),
    { page_visits: 0, starts: 0, completions: 0, claims: 0 }
  );

  const completionRate = totals.starts > 0 ? Math.round((totals.completions / totals.starts) * 100) : 0;
  const claimRate = totals.completions > 0 ? Math.round((totals.claims / totals.completions) * 100) : 0;

  const summaryCards = [
    { icon: <Eye className="w-4 h-4" />, label: "Page Visits", value: totals.page_visits },
    { icon: <Users className="w-4 h-4" />, label: "Total Starts", value: totals.starts },
    { icon: <CheckCircle2 className="w-4 h-4" />, label: "Completions", value: totals.completions },
    { icon: <ShoppingCart className="w-4 h-4" />, label: "Claims", value: totals.claims },
    { icon: <BarChart3 className="w-4 h-4" />, label: "Completion Rate", value: `${completionRate}%` },
    { icon: <TrendingUp className="w-4 h-4" />, label: "Conversion Rate", value: `${claimRate}%` },
  ];

  return (
    <div className="quiz-container">
      <div className="quiz-content !max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          className="text-2xl md:text-3xl font-bold text-center mb-2 text-foreground"
        >
          Quiz Funnel Dashboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-muted-foreground text-center mb-6 text-sm"
        >
          Real-time analytics for all quiz variants
        </motion.p>

        {/* Time Range Filter + Refresh */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex items-center justify-between mb-4 w-full gap-3"
        >
          <DateRangePicker onChange={handleRangeChange} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => loadAnalytics(currentRange)}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </motion.button>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 w-full"
        >
          {summaryCards.map((card, i) => (
            <motion.div key={card.label} variants={itemVariants}>
              <SummaryCard icon={card.icon} label={card.label} value={card.value} loading={loading} />
            </motion.div>
          ))}
        </motion.div>

        {/* Funnel Visualization */}
        <FunnelGraph totals={totals} loading={loading} />

        {/* Quiz List with Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col gap-3"
        >
          {quizzes.map((quiz) => {
            const stats = getStats(quiz.variant);
            const qCompRate = stats.starts > 0 ? Math.round((stats.completions / stats.starts) * 100) : 0;
            return (
              <motion.div
                key={quiz.variant}
                variants={itemVariants}
                whileHover={{ scale: 1.01, y: -2 }}
                className="quiz-option cursor-default"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {quiz.tag}
                    </span>
                  </div>
                  <p className="font-bold text-sm text-foreground">{quiz.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{quiz.description}</p>
                  <div className="flex gap-4 mt-2 text-xs">
                    <StatBadge label="Visits" value={stats.page_visits} loading={loading} />
                    <StatBadge label="Starts" value={stats.starts} loading={loading} />
                    <StatBadge label="Completed" value={stats.completions} loading={loading} />
                    <StatBadge label="Claims" value={stats.claims} loading={loading} />
                    <StatBadge label="Rate" value={`${qCompRate}%`} loading={loading} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

/* ── Funnel Visualization ── */
function FunnelGraph({ totals, loading }: { totals: { page_visits: number; starts: number; completions: number; claims: number }; loading: boolean }) {
  const max = Math.max(totals.page_visits, 1);
  const stages = [
    { label: "Visits", value: totals.page_visits, color: "bg-primary/20" },
    { label: "Starts", value: totals.starts, color: "bg-primary/40" },
    { label: "Completions", value: totals.completions, color: "bg-primary/70" },
    { label: "Claims", value: totals.claims, color: "bg-primary" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
      className="w-full mb-8 rounded-xl border border-border bg-card p-4"
    >
      <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Conversion Funnel</p>
      <div className="flex flex-col gap-2.5">
        {stages.map((stage, i) => {
          const pct = max > 0 ? (stage.value / max) * 100 : 0;
          const dropoff = i > 0 && stages[i - 1].value > 0
            ? Math.round(((stages[i - 1].value - stage.value) / stages[i - 1].value) * 100)
            : null;
          return (
            <div key={stage.label} className="flex items-center gap-3">
              <span className="text-[11px] font-medium text-muted-foreground w-[80px] text-right shrink-0">
                {stage.label}
              </span>
              <div className="flex-1 h-7 bg-muted/30 rounded-md overflow-hidden relative">
                <motion.div
                  className={`h-full rounded-md ${stage.color} flex items-center justify-end pr-2`}
                  initial={{ width: 0 }}
                  animate={{ width: loading ? "0%" : `${Math.max(pct, 2)}%` }}
                  transition={{ delay: 0.4 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <AnimatePresence>
                    {!loading && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 + i * 0.12 }}
                        className="text-[11px] font-bold text-foreground"
                      >
                        {stage.value}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              {dropoff !== null && !loading && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.12 }}
                  className="text-[10px] text-destructive/70 font-medium w-[40px] shrink-0"
                >
                  −{dropoff}%
                </motion.span>
              )}
              {(dropoff === null || loading) && <span className="w-[40px] shrink-0" />}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ── Summary Card ── */
function SummaryCard({ icon, label, value, loading }: { icon: React.ReactNode; label: string; value: number | string; loading: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -3, boxShadow: "0 8px 25px -8px hsl(var(--primary) / 0.15)" }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="rounded-xl border border-border bg-card p-3 flex flex-col gap-1 cursor-default"
    >
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.p
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="text-xl font-bold text-muted-foreground animate-pulse"
          >
            —
          </motion.p>
        ) : (
          <motion.p
            key={`value-${value}`}
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="text-xl font-bold text-foreground"
          >
            {value}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Stat Badge ── */
function StatBadge({ label, value, loading }: { label: string; value: number | string; loading: boolean }) {
  return (
    <span className="text-muted-foreground">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} className="font-semibold text-foreground">—</motion.span>
        ) : (
          <motion.span
            key={`v-${value}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-semibold text-foreground"
          >
            {value}
          </motion.span>
        )}
      </AnimatePresence>{" "}
      {label}
    </span>
  );
}

export default Index;
