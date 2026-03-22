import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import useApplications from "../hooks/useApplications";
import { fetchRemoteJobs, getTrendingRoles } from "../services/apiService";
import StatCard from "../components/StatCard";
import ChartCard from "../components/ChartCard";
import {
  aggregateByStatus,
  aggregateByMonth,
  formatDate,
  getStatusBadgeClass,
  CHART_COLORS,
} from "../utils/helpers";
import {
  Briefcase,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
  ExternalLink,
  MapPin,
  Sparkles,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-800 border border-surface-700 rounded-lg px-3 py-2 shadow-xl">
        <p className="text-xs text-surface-400">{label}</p>
        <p className="text-sm font-semibold text-surface-100">
          {payload[0].value} {payload[0].name || "applications"}
        </p>
      </div>
    );
  }
  return null;
};

const DashboardPage = () => {
  const { user } = useAuth();
  const { applications } = useApplications();
  const [remoteJobs, setRemoteJobs] = useState([]);
  const [trendingRoles, setTrendingRoles] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(true);

  useEffect(() => {
    const loadJobs = async () => {
      try {
        const jobs = await fetchRemoteJobs("software-dev", 50);
        setRemoteJobs(jobs.slice(0, 5));
        setTrendingRoles(getTrendingRoles(jobs));
      } catch (error) {
        console.error("Failed to load remote jobs:", error);
      } finally {
        setJobsLoading(false);
      }
    };
    loadJobs();
  }, []);

  const { totalApps, interviews, offers, rejected } = useMemo(() => {
    const totalApps = applications.length;
    let interviews = 0, offers = 0, rejected = 0;
    applications.forEach((a) => {
      if (a.status === "Interview") interviews++;
      if (a.status === "Offer") offers++;
      if (a.status === "Rejected") rejected++;
    });
    return { totalApps, interviews, offers, rejected };
  }, [applications]);

  const statusData = useMemo(() => aggregateByStatus(applications), [applications]);
  const monthData = useMemo(() => aggregateByMonth(applications), [applications]);

  const firstName = user?.displayName?.split(" ")[0] || "there";

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-surface-100">
          Welcome back, <span className="gradient-text">{firstName}</span> 👋
        </h1>
        <p className="text-surface-400 text-sm mt-1">
          Here's an overview of your job application activity.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Applications"
          value={totalApps}
          icon={Briefcase}
          color="primary"
          change={12}
          changeLabel="vs last month"
        />
        <StatCard
          title="Interviews"
          value={interviews}
          icon={Clock}
          color="warning"
          change={8}
          changeLabel="in progress"
        />
        <StatCard
          title="Offers Received"
          value={offers}
          icon={CheckCircle2}
          color="accent"
          change={offers > 0 ? 100 : 0}
          changeLabel="success rate"
        />
        <StatCard
          title="Rejected"
          value={rejected}
          icon={XCircle}
          color="danger"
          change={rejected > 0 ? -5 : 0}
          changeLabel="less than avg"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Applications by Status"
          subtitle="Distribution of current application statuses"
        >
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
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
          ) : (
            <div className="h-[240px] flex items-center justify-center text-surface-500 text-sm">
              Add applications to see status distribution
            </div>
          )}
          {statusData.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
              {statusData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{
                      backgroundColor: CHART_COLORS[entry.name] || "#6366f1",
                    }}
                  />
                  <span className="text-xs text-surface-400">
                    {entry.name} ({entry.value})
                  </span>
                </div>
              ))}
            </div>
          )}
        </ChartCard>

        <ChartCard
          title="Monthly Applications"
          subtitle="Applications submitted per month"
        >
          {monthData.length > 0 ? (
            <ResponsiveContainer width="100%" height={280}>
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
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  name="applications"
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] flex items-center justify-center text-surface-500 text-sm">
              Add applications to see monthly trends
            </div>
          )}
        </ChartCard>
      </div>

      {/* API Integration Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Trending Roles */}
        <div className="glass-card p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-primary-400" />
            <h3 className="text-base font-semibold text-surface-100">
              Trending Job Roles
            </h3>
          </div>
          {jobsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 bg-surface-800 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : trendingRoles.length > 0 ? (
            <div className="space-y-2">
              {trendingRoles.map((role, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-surface-800/40 hover:bg-surface-800/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-primary-500/10 text-primary-400 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-surface-200 truncate max-w-[200px]">
                      {role.role}
                    </span>
                  </div>
                  <span className="text-xs text-surface-500">
                    {role.count} {role.count === 1 ? "listing" : "listings"}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-surface-500">No trending data available</p>
          )}
        </div>

        {/* Latest Tech Jobs */}
        <div className="glass-card p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-accent-400" />
            <h3 className="text-base font-semibold text-surface-100">
              Latest Remote Jobs
            </h3>
          </div>
          {jobsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-16 bg-surface-800 rounded-lg animate-pulse"
                />
              ))}
            </div>
          ) : remoteJobs.length > 0 ? (
            <div className="space-y-2">
              {remoteJobs.map((job) => (
                <a
                  key={job.id}
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start justify-between p-3 rounded-xl bg-surface-800/40 hover:bg-surface-800/80 transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-surface-200 group-hover:text-primary-400 transition-colors truncate">
                      {job.title}
                    </h4>
                    <p className="text-xs text-surface-500 mt-0.5">
                      {job.company_name}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-surface-500">
                      <MapPin className="w-3 h-3" />
                      <span>{job.candidate_required_location || "Remote"}</span>
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-surface-500 group-hover:text-primary-400 transition-colors shrink-0 mt-1" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-surface-500">No job listings available</p>
          )}
        </div>
      </div>

      {/* Recent Applications */}
      {applications.length > 0 && (
        <div className="glass-card p-5 animate-fade-in">
          <h3 className="text-base font-semibold text-surface-100 mb-4">
            Recent Applications
          </h3>
          <div className="space-y-2">
            {applications.slice(0, 5).map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-800/30 hover:bg-surface-800/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center shrink-0">
                    <Briefcase className="w-4 h-4 text-primary-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-surface-200 truncate">
                      {app.position}
                    </p>
                    <p className="text-xs text-surface-500">{app.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-surface-500 hidden sm:block">
                    {formatDate(app.dateApplied)}
                  </span>
                  <span className={getStatusBadgeClass(app.status)}>
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
