/* eslint-disable no-unused-vars */
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const StatCard = ({ title, value, icon: Icon, change, changeLabel, color = "primary" }) => {
  const colorMap = {
    primary: {
      bg: "hover:border-primary-500/30 hover:shadow-[0_8px_32px_-8px_rgba(59,130,246,0.2)]",
      icon: "bg-primary-500/10 text-primary-400 border border-primary-500/20 shadow-[inset_0_1px_2px_rgba(59,130,246,0.3)]",
    },
    accent: {
      bg: "hover:border-accent-500/30 hover:shadow-[0_8px_32px_-8px_rgba(139,92,246,0.2)]",
      icon: "bg-accent-500/10 text-accent-400 border border-accent-500/20 shadow-[inset_0_1px_2px_rgba(139,92,246,0.3)]",
    },
    warning: {
      bg: "hover:border-warning-500/30 hover:shadow-[0_8px_32px_-8px_rgba(245,158,11,0.2)]",
      icon: "bg-warning-500/10 text-warning-400 border border-warning-500/20 shadow-[inset_0_1px_2px_rgba(245,158,11,0.3)]",
    },
    danger: {
      bg: "hover:border-danger-500/30 hover:shadow-[0_8px_32px_-8px_rgba(239,68,68,0.2)]",
      icon: "bg-danger-500/10 text-danger-400 border border-danger-500/20 shadow-[inset_0_1px_2px_rgba(239,68,68,0.3)]",
    },
    info: {
      bg: "hover:border-info-500/30 hover:shadow-[0_8px_32px_-8px_rgba(14,165,233,0.2)]",
      icon: "bg-info-500/10 text-info-400 border border-info-500/20 shadow-[inset_0_1px_2px_rgba(14,165,233,0.3)]",
    },
  };

  const colors = colorMap[color] || colorMap.primary;

  const TrendIcon =
    change > 0 ? TrendingUp : change < 0 ? TrendingDown : Minus;
  const trendColor =
    change > 0
      ? "text-accent-400 bg-accent-500/10 border-accent-500/20"
      : change < 0
      ? "text-danger-400 bg-danger-500/10 border-danger-500/20"
      : "text-surface-400 bg-surface-800/50 border-surface-700/50";

  return (
    <div
      className={`glass-card p-5 group transition-all duration-300 ${colors.bg}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-sm font-medium text-surface-400 mb-1 group-hover:text-surface-300 transition-colors">{title}</h3>
          <p className="text-3xl font-bold text-surface-50">{value}</p>
        </div>
        <div
          className={`p-2.5 rounded-xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 ${colors.icon}`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        {change !== undefined && (
          <div className="flex items-center gap-1.5 mt-4">
            <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-md border ${trendColor}`}>
              <TrendIcon className="w-4 h-4 mr-1" />
              <span>{Math.abs(change)}%</span>
            </div>
            {changeLabel && (
              <span className="text-xs text-surface-500 font-medium">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
