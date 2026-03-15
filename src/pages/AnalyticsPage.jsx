import useApplications from "../hooks/useApplications";
import ChartCard from "../components/ChartCard";
import StatCard from "../components/StatCard";
import {
  aggregateByStatus,
  aggregateByMonth,
  getApplicationsOverTime,
  CHART_COLORS,
  STATUS_OPTIONS,
} from "../utils/helpers";
import {
  BarChart3,
  Briefcase,
  Target,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-surface-400">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
            {entry.value} {entry.name || ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AnalyticsPage = () => {
  const { applications, loading } = useApplications();

  const statusData = aggregateByStatus(applications);
  const monthData = aggregateByMonth(applications);
  const timelineData = getApplicationsOverTime(applications);

  const totalApps = applications.length;
  const interviews = applications.filter((a) => a.status === "Interview").length;
  const offers = applications.filter((a) => a.status === "Offer").length;
  const responseRate =
    totalApps > 0
      ? Math.round(((interviews + offers) / totalApps) * 100)
      : 0;
  const offerRate =
    totalApps > 0 ? Math.round((offers / totalApps) * 100) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-100 flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-primary-400" />
          Analytics
        </h1>
        <p className="text-surface-400 text-sm mt-1">
          Detailed insights into your job application activity
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={totalApps}
          icon={Briefcase}
          color="primary"
        />
        <StatCard
          title="Response Rate"
          value={`${responseRate}%`}
          icon={Target}
          color="info"
        />
        <StatCard
          title="Offer Rate"
          value={`${offerRate}%`}
          icon={Award}
          color="accent"
        />
        <StatCard
          title="Avg per Month"
          value={
            monthData.length > 0
              ? Math.round(totalApps / monthData.length)
              : 0
          }
          icon={Clock}
          color="warning"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Applications Per Month (Bar Chart) */}
        <ChartCard
          title="Applications Per Month"
          subtitle="Number of applications submitted each month"
        >
          {monthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(100,116,139,0.1)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(100,116,139,0.2)" }}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(100,116,139,0.2)" }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="url(#barGradient)"
                  radius={[6, 6, 0, 0]}
                  name="applications"
                />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-surface-500 text-sm">
              No data available yet
            </div>
          )}
        </ChartCard>

        {/* Applications by Status (Pie Chart) */}
        <ChartCard
          title="Status Distribution"
          subtitle="Current breakdown of application statuses"
        >
          {statusData.length > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={100}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {statusData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={CHART_COLORS[entry.name] || "#6366f1"}
                        stroke="transparent"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
                {statusData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor:
                          CHART_COLORS[entry.name] || "#6366f1",
                      }}
                    />
                    <span className="text-xs text-surface-400">
                      {entry.name}: {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-surface-500 text-sm">
              No data available yet
            </div>
          )}
        </ChartCard>

        {/* Applications Over Time (Line/Area Chart) */}
        <ChartCard
          title="Growth Over Time"
          subtitle="Cumulative job applications over time"
          className="lg:col-span-2"
        >
          {timelineData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(100,116,139,0.1)"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(100,116,139,0.2)" }}
                />
                <YAxis
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  axisLine={{ stroke: "rgba(100,116,139,0.2)" }}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#818cf8"
                  strokeWidth={2}
                  fill="url(#areaGradient)"
                  name="total applications"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-surface-500 text-sm">
              No data available yet
            </div>
          )}
        </ChartCard>
      </div>

      {/* Status Breakdown Cards */}
      <div className="glass-card p-5">
        <h3 className="text-base font-semibold text-surface-100 mb-4">
          Status Breakdown
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {STATUS_OPTIONS.map((status) => {
            const count = applications.filter((a) => a.status === status).length;
            const percentage =
              totalApps > 0 ? Math.round((count / totalApps) * 100) : 0;
            return (
              <div
                key={status}
                className="p-4 rounded-xl bg-surface-800/40 border border-surface-800/50 text-center"
              >
                <div
                  className="w-3 h-3 rounded-full mx-auto mb-2"
                  style={{
                    backgroundColor: CHART_COLORS[status],
                  }}
                />
                <p className="text-2xl font-bold text-surface-100">{count}</p>
                <p className="text-xs text-surface-400 mt-0.5">{status}</p>
                <div className="mt-2 h-1.5 bg-surface-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: CHART_COLORS[status],
                    }}
                  />
                </div>
                <p className="text-xs text-surface-500 mt-1">{percentage}%</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
