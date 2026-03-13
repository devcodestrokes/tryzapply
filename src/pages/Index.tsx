import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchQuizAnalytics, type QuizAnalytics } from "@/lib/analytics";
import { BarChart3, Users, CheckCircle2, ShoppingCart, RefreshCw, Eye } from "lucide-react";

const VARIANT_LABELS: Record<string, { title: string; tag: string }> = {
  "testosterone-long": { title: "Testosterone Focus — Long", tag: "Testosterone" },
  "testosterone-short": { title: "Testosterone Focus — Short", tag: "Testosterone" },
  "energy-long": { title: "Energy Focus — Long", tag: "Energy" },
  "energy-short": { title: "Energy Focus — Short", tag: "Energy" },
};

const quizzes = [
  {
    title: "Testosterone Focus — Long",
    description: "Full 2-minute assessment with 11 questions analyzing symptoms, lifestyle, and risk factors.",
    path: "/quiz/testosterone-long",
    tag: "Testosterone",
    variant: "testosterone-long",
  },
  {
    title: "Testosterone Focus — Short",
    description: "Quick 60-second assessment with 5 key questions for fast results.",
    path: "/quiz/testosterone-short",
    tag: "Testosterone",
    variant: "testosterone-short",
  },
  {
    title: "Energy Focus — Long",
    description: "Full 2-minute assessment analyzing energy patterns, diet, and lifestyle factors.",
    path: "/quiz/energy-long",
    tag: "Energy",
    variant: "energy-long",
  },
  {
    title: "Energy Focus — Short",
    description: "Quick 60-second assessment to find the root cause of your fatigue.",
    path: "/quiz/energy-short",
    tag: "Energy",
    variant: "energy-short",
  },
];

const Index = () => {
  const [analytics, setAnalytics] = useState<QuizAnalytics[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAnalytics = async () => {
    setLoading(true);
    const data = await fetchQuizAnalytics();
    setAnalytics(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

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

  return (
    <div className="quiz-container">
      <div className="quiz-content !max-w-3xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-foreground">
          Quiz Funnel Dashboard
        </h1>
        <p className="text-muted-foreground text-center mb-6 text-sm">
          Real-time analytics for all quiz variants
        </p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8 w-full">
          <SummaryCard
            icon={<Eye className="w-4 h-4" />}
            label="Page Visits"
            value={totals.page_visits}
            loading={loading}
          />
          <SummaryCard
            icon={<Users className="w-4 h-4" />}
            label="Total Starts"
            value={totals.starts}
            loading={loading}
          />
          <SummaryCard
            icon={<CheckCircle2 className="w-4 h-4" />}
            label="Completions"
            value={totals.completions}
            loading={loading}
          />
          <SummaryCard
            icon={<ShoppingCart className="w-4 h-4" />}
            label="Claims"
            value={totals.claims}
            loading={loading}
          />
          <SummaryCard
            icon={<BarChart3 className="w-4 h-4" />}
            label="Completion Rate"
            value={`${completionRate}%`}
            loading={loading}
          />
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end mb-3 w-full">
          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Quiz List with Stats */}
        <div className="w-full flex flex-col gap-3">
          {quizzes.map((quiz) => {
            const stats = getStats(quiz.variant);
            const qCompRate = stats.starts > 0 ? Math.round((stats.completions / stats.starts) * 100) : 0;
            return (
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

                  {/* Inline Stats */}
                  <div className="flex gap-4 mt-2 text-xs">
                    <StatBadge label="Visits" value={stats.page_visits} loading={loading} />
                    <StatBadge label="Starts" value={stats.starts} loading={loading} />
                    <StatBadge label="Completed" value={stats.completions} loading={loading} />
                    <StatBadge label="Claims" value={stats.claims} loading={loading} />
                    <StatBadge label="Rate" value={`${qCompRate}%`} loading={loading} />
                  </div>
                </div>
                <span className="text-muted-foreground group-hover:text-primary transition-colors">→</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function SummaryCard({
  icon,
  label,
  value,
  loading,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  loading: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3 flex flex-col gap-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[11px] font-medium">{label}</span>
      </div>
      <p className="text-xl font-bold text-foreground">
        {loading ? <span className="animate-pulse text-muted-foreground">—</span> : value}
      </p>
    </div>
  );
}

function StatBadge({
  label,
  value,
  loading,
}: {
  label: string;
  value: number | string;
  loading: boolean;
}) {
  return (
    <span className="text-muted-foreground">
      <span className="font-semibold text-foreground">
        {loading ? "—" : value}
      </span>{" "}
      {label}
    </span>
  );
}

export default Index;
