/**
 * Format a date string to a readable format.
 */
export const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Get the CSS class for a status badge.
 */
export const getStatusBadgeClass = (status) => {
  const map = {
    Applied: "badge-applied",
    Interview: "badge-interview",
    Rejected: "badge-rejected",
    Offer: "badge-offer",
  };
  return `badge ${map[status] || "badge-applied"}`;
};

/**
 * Get month label from a date string.
 */
export const getMonthLabel = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
};

/**
 * Aggregate applications by month for chart data.
 */
export const aggregateByMonth = (applications) => {
  const months = {};
  applications.forEach((app) => {
    if (app.dateApplied) {
      const label = getMonthLabel(app.dateApplied);
      months[label] = (months[label] || 0) + 1;
    }
  });
  return Object.entries(months)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => {
      const dateA = new Date(`01 ${a.month}`);
      const dateB = new Date(`01 ${b.month}`);
      return dateA - dateB;
    });
};

/**
 * Aggregate applications by status for chart data.
 */
export const aggregateByStatus = (applications) => {
  const statuses = {};
  applications.forEach((app) => {
    statuses[app.status] = (statuses[app.status] || 0) + 1;
  });
  return Object.entries(statuses).map(([status, count]) => ({
    name: status,
    value: count,
  }));
};

/**
 * Get applications over time (cumulative) for line chart.
 */
export const getApplicationsOverTime = (applications) => {
  const sorted = [...applications]
    .filter((app) => app.dateApplied)
    .sort((a, b) => new Date(a.dateApplied) - new Date(b.dateApplied));

  let cumulative = 0;
  const data = [];
  const seen = new Set();

  sorted.forEach((app) => {
    const label = getMonthLabel(app.dateApplied);
    cumulative++;
    if (seen.has(label)) {
      data[data.length - 1].total = cumulative;
    } else {
      seen.add(label);
      data.push({ month: label, total: cumulative });
    }
  });

  return data;
};

/**
 * Chart color palette.
 */
export const CHART_COLORS = {
  Applied: "#38bdf8",
  Interview: "#fbbf24",
  Rejected: "#f87171",
  Offer: "#34d399",
};

export const STATUS_OPTIONS = ["Applied", "Interview", "Rejected", "Offer"];
