import { useEffect, useState } from "react";
import { format } from "date-fns";
import { fetchQuizAnalytics, type QuizAnalytics, type DateRange } from "@/lib/analytics";
import { BarChart3, Users, CheckCircle2, ShoppingCart, RefreshCw, Eye, TrendingUp, CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TIME_PRESETS: { label: string; value: string; getRange: () => DateRange }[] = [
  {
    label: "Today",
    value: "today",
    getRange: () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return { from: start.toISOString() };
    },
  },
  {
    label: "Last 7 days",
    value: "7d",
    getRange: () => {
      const d = new Date();
      d.setDate(d.getDate() - 7);
      return { from: d.toISOString() };
    },
  },
  {
    label: "Last 30 days",
    value: "30d",
    getRange: () => {
      const d = new Date();
      d.setDate(d.getDate() - 30);
      return { from: d.toISOString() };
    },
  },
  {
    label: "Last 90 days",
    value: "90d",
    getRange: () => {
      const d = new Date();
      d.setDate(d.getDate() - 90);
      return { from: d.toISOString() };
    },
  },
  {
    label: "All time",
    value: "all",
    getRange: () => ({}),
  },
];

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

const Index = () => {
  const [analytics, setAnalytics] = useState<QuizAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [timePreset, setTimePreset] = useState("all");
  const [customFrom, setCustomFrom] = useState<Date | undefined>();
  const [customTo, setCustomTo] = useState<Date | undefined>();

  const getRange = (): DateRange => {
    if (timePreset === "custom") {
      return {
        from: customFrom ? customFrom.toISOString() : undefined,
        to: customTo ? new Date(customTo.getFullYear(), customTo.getMonth(), customTo.getDate(), 23, 59, 59).toISOString() : undefined,
      };
    }
    const preset = TIME_PRESETS.find((p) => p.value === timePreset);
    return preset ? preset.getRange() : {};
  };

  const loadAnalytics = async () => {
    setLoading(true);
    const data = await fetchQuizAnalytics(getRange());
    setAnalytics(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAnalytics();
  }, [timePreset, customFrom, customTo]);

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

        {/* Time Range Filter + Refresh */}
        <div className="flex flex-wrap items-center justify-between mb-4 w-full gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={timePreset} onValueChange={setTimePreset}>
              <SelectTrigger className="w-[160px] h-9 text-xs">
                <SelectValue placeholder="Time range" />
              </SelectTrigger>
              <SelectContent>
                {TIME_PRESETS.map((p) => (
                  <SelectItem key={p.value} value={p.value} className="text-xs">
                    {p.label}
                  </SelectItem>
                ))}
                <SelectItem value="custom" className="text-xs">Custom range</SelectItem>
              </SelectContent>
            </Select>

            {timePreset === "custom" && (
              <>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("h-9 text-xs gap-1.5 px-3", !customFrom && "text-muted-foreground")}>
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {customFrom ? format(customFrom, "MMM d, yyyy") : "From"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={customFrom}
                      onSelect={setCustomFrom}
                      disabled={(date) => date > new Date() || (customTo ? date > customTo : false)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <span className="text-xs text-muted-foreground">→</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("h-9 text-xs gap-1.5 px-3", !customTo && "text-muted-foreground")}>
                      <CalendarIcon className="w-3.5 h-3.5" />
                      {customTo ? format(customTo, "MMM d, yyyy") : "To"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={customTo}
                      onSelect={setCustomTo}
                      disabled={(date) => date > new Date() || (customFrom ? date < customFrom : false)}
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </>
            )}
          </div>
          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8 w-full">
          <SummaryCard icon={<Eye className="w-4 h-4" />} label="Page Visits" value={totals.page_visits} loading={loading} />
          <SummaryCard icon={<Users className="w-4 h-4" />} label="Total Starts" value={totals.starts} loading={loading} />
          <SummaryCard icon={<CheckCircle2 className="w-4 h-4" />} label="Completions" value={totals.completions} loading={loading} />
          <SummaryCard icon={<ShoppingCart className="w-4 h-4" />} label="Claims" value={totals.claims} loading={loading} />
          <SummaryCard icon={<BarChart3 className="w-4 h-4" />} label="Completion Rate" value={`${completionRate}%`} loading={loading} />
          <SummaryCard icon={<TrendingUp className="w-4 h-4" />} label="Conversion Rate" value={`${claimRate}%`} loading={loading} />
        </div>

        {/* Quiz List with Stats (non-clickable) */}
        <div className="w-full flex flex-col gap-3">
          {quizzes.map((quiz) => {
            const stats = getStats(quiz.variant);
            const qCompRate = stats.starts > 0 ? Math.round((stats.completions / stats.starts) * 100) : 0;
            return (
              <div key={quiz.variant} className="quiz-option">
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function SummaryCard({ icon, label, value, loading }: { icon: React.ReactNode; label: string; value: number | string; loading: boolean }) {
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

function StatBadge({ label, value, loading }: { label: string; value: number | string; loading: boolean }) {
  return (
    <span className="text-muted-foreground">
      <span className="font-semibold text-foreground">{loading ? "—" : value}</span> {label}
    </span>
  );
}

export default Index;
