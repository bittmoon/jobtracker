import { Search, X } from "lucide-react";
import { STATUS_OPTIONS } from "../utils/helpers";

const FilterBar = ({ filters, onFilterChange, onClear }) => {
  const handleChange = (field, value) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const hasFilters = filters.status || filters.company || filters.dateFrom || filters.dateTo;

  return (
    <div className="glass-card p-4 mb-6 animate-fade-in">
      <div className="flex flex-wrap items-end gap-3">
        {/* Status Filter */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-surface-400 mb-1.5">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => handleChange("status", e.target.value)}
            className="input-field"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Company Search */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-medium text-surface-400 mb-1.5">
            Company
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
            <input
              type="text"
              value={filters.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Search company..."
              className="input-field pl-9"
            />
          </div>
        </div>

        {/* Date From */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-surface-400 mb-1.5">
            From
          </label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => handleChange("dateFrom", e.target.value)}
            className="input-field"
          />
        </div>

        {/* Date To */}
        <div className="flex-1 min-w-[160px]">
          <label className="block text-xs font-medium text-surface-400 mb-1.5">
            To
          </label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => handleChange("dateTo", e.target.value)}
            className="input-field"
          />
        </div>

        {/* Clear Filters */}
        {hasFilters && (
          <button
            onClick={onClear}
            className="btn-secondary gap-1.5 text-xs whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
