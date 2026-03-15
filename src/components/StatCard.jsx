import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, change, changeLabel, color = "primary" }) => {
  const colorMap = {
    primary: {
      bg: "from-primary-500/10 to-primary-600/5",
      icon: "bg-primary-500/10 text-primary-400",
      border: "border-primary-500/10",
    },
    accent: {
      bg: "from-accent-500/10 to-accent-600/5",
      icon: "bg-accent-500/10 text-accent-400",
      border: "border-accent-500/10",
    },
    warning: {
      bg: "from-warning-400/10 to-warning-500/5",
      icon: "bg-warning-400/10 text-warning-400",
      border: "border-warning-400/10",
    },
    danger: {
      bg: "from-danger-400/10 to-danger-500/5",
      icon: "bg-danger-400/10 text-danger-400",
      border: "border-danger-400/10",
    },
    info: {
      bg: "from-info-400/10 to-info-500/5",
      icon: "bg-info-400/10 text-info-400",
      border: "border-info-400/10",
    },
  };

  const colors = colorMap[color] || colorMap.primary;

  const TrendIcon =
    change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;
  const trendColor =
    change > 0
      ? "text-accent-400"
      : change < 0
      ? "text-danger-400"
      : "text-surface-400";

  return (
    <div
      className={`glass-card p-5 bg-gradient-to-br ${colors.bg} border ${colors.border}`}
      style={{ animationDelay: "0.1s" }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-2.5 rounded-xl ${colors.icon}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
            <TrendIcon className="w-3.5 h-3.5" />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="text-2xl font-bold text-surface-100 mb-1">{value}</h3>
        <p className="text-sm text-surface-400">{title}</p>
        {changeLabel && (
          <p className="text-xs text-surface-500 mt-1">{changeLabel}</p>
        )}
      </div>
    </div>
  );
};

export default StatCard;
