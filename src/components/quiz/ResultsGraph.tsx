import { Area, AreaChart, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from "recharts";

interface ResultsGraphProps {
  focus: "testosterone" | "energy";
  riskScore: number; // 0-100 from quiz answers
}

const ResultsGraph = ({ focus, riskScore }: ResultsGraphProps) => {
  const isTesto = focus === "testosterone";
  const label = isTesto ? "T" : "Energy";

  // Starting level based on risk (higher risk = lower starting point)
  const startLevel = Math.max(10, 50 - riskScore * 0.4);
  // Goal improvement percentage
  const goalIncrease = riskScore >= 50 ? 60 : riskScore >= 25 ? 45 : 30;

  const today = new Date();
  const months: string[] = [];
  for (let i = 0; i <= 3; i++) {
    const d = new Date(today);
    d.setMonth(d.getMonth() + i);
    months.push(
      i === 0
        ? "TODAY"
        : d.toLocaleDateString("en-US", { month: "short", day: "numeric" }).toUpperCase()
    );
  }

  // Growth curve — slow start, accelerating
  const goalLevel = startLevel + goalIncrease;
  const data = [
    { name: months[0], level: startLevel, goal: null },
    { name: months[1], level: startLevel + goalIncrease * 0.15, goal: null },
    { name: months[2], level: startLevel + goalIncrease * 0.45, goal: null },
    { name: months[3], level: goalLevel, goal: goalLevel },
  ];

  // Y-axis ticks
  const yTicks = [
    { value: 15, label: `LOW\n${label}-LEVELS` },
    { value: 45, label: `NORMAL\n${label}-LEVELS` },
    { value: 75, label: `HIGH\n${label}-LEVELS` },
  ];

  return (
    <div className="w-full bg-card border border-border rounded-xl p-4 mb-6">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
          <defs>
            <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(30, 100%, 55%)" stopOpacity={0.8} />
              <stop offset="100%" stopColor="hsl(30, 100%, 55%)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            tick={{ fontSize: 10, fontWeight: 700, fill: "hsl(var(--foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={false}
          />
          <YAxis
            domain={[0, 90]}
            ticks={[15, 45, 75]}
            tickFormatter={(value: number) => {
              const t = yTicks.find((y) => y.value === value);
              return t ? t.label.split("\n")[0] : "";
            }}
            tick={{ fontSize: 9, fontWeight: 700, fill: "hsl(var(--muted-foreground))" }}
            axisLine={{ stroke: "hsl(var(--border))" }}
            tickLine={false}
            width={55}
          />
          <ReferenceLine y={45} stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <ReferenceLine y={75} stroke="hsl(var(--border))" strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="level"
            stroke="hsl(30, 100%, 50%)"
            strokeWidth={3}
            fill="url(#graphGradient)"
            dot={(props: any) => {
              const { cx, cy, index } = props;
              if (index === 0) {
                return (
                  <g key={index}>
                    <circle cx={cx} cy={cy} r={6} fill="hsl(var(--foreground))" stroke="hsl(var(--background))" strokeWidth={2} />
                    <rect x={cx - 40} y={cy + 10} width={80} height={20} rx={4} fill="hsl(var(--foreground))" />
                    <text x={cx} y={cy + 23} textAnchor="middle" fill="hsl(var(--background))" fontSize={9} fontWeight={800}>
                      YOU ARE HERE
                    </text>
                  </g>
                );
              }
              if (index === 3) {
                return (
                  <g key={index}>
                    <circle cx={cx} cy={cy} r={7} fill="hsl(var(--background))" stroke="hsl(30, 100%, 50%)" strokeWidth={3} />
                    <rect x={cx - 55} y={cy - 28} width={110} height={20} rx={4} fill="hsl(30, 100%, 50%)" />
                    <text x={cx} y={cy - 15} textAnchor="middle" fill="white" fontSize={9} fontWeight={800}>
                      GOAL: {goalIncrease}% INCREASE
                    </text>
                  </g>
                );
              }
              return <circle key={index} cx={cx} cy={cy} r={0} />;
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultsGraph;
