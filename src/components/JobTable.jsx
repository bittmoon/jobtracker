import { Edit3, Trash2, MapPin, Calendar } from "lucide-react";
import { formatDate, getStatusBadgeClass } from "../utils/helpers";

const JobTable = ({ applications, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="w-8 h-8 border-3 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-surface-400 text-sm">Loading applications...</p>
      </div>
    );
  }

  if (!applications || applications.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="w-16 h-16 rounded-2xl bg-surface-800 flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-7 h-7 text-surface-500" />
        </div>
        <h3 className="text-lg font-semibold text-surface-300 mb-1">
          No applications yet
        </h3>
        <p className="text-sm text-surface-500">
          Start tracking your job applications by adding one above.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-surface-800/50">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Company
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Position
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Status
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Location
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Date Applied
              </th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-surface-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-800/30">
            {applications.map((app) => (
              <tr
                key={app.id}
                className="hover:bg-surface-900 border-b border-surface-800/30 last:border-0 transition-colors"
              >
                <td className="px-5 py-4">
                  <span className="text-sm font-medium text-surface-200">
                    {app.company}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-surface-300">
                    {app.position}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className={getStatusBadgeClass(app.status)}>
                    {app.status}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1.5 text-sm text-surface-400">
                    <MapPin className="w-3.5 h-3.5" />
                    {app.location || "N/A"}
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-surface-400">
                    {formatDate(app.dateApplied)}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit(app)}
                      className="p-2 rounded-lg hover:bg-primary-500/10 text-surface-400 hover:text-primary-400 transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(app.id)}
                      className="p-2 rounded-lg hover:bg-danger-500/10 text-surface-400 hover:text-danger-400 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden">
        {applications.map((app) => (
          <div key={app.id} className="p-4 space-y-3 border-b border-surface-800/50 last:border-0">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-semibold text-surface-200">
                  {app.company}
                </h4>
                <p className="text-xs text-surface-400 mt-0.5">
                  {app.position}
                </p>
              </div>
              <span className={getStatusBadgeClass(app.status)}>
                {app.status}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-xs text-surface-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {app.location || "N/A"}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(app.dateApplied)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEdit(app)}
                  className="p-1.5 rounded-lg hover:bg-primary-500/10 text-surface-400 hover:text-primary-400 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDelete(app.id)}
                  className="p-1.5 rounded-lg hover:bg-danger-500/10 text-surface-400 hover:text-danger-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobTable;
