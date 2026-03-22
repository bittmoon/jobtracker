import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { STATUS_OPTIONS } from "../utils/helpers";

const emptyForm = {
  company: "",
  position: "",
  status: "Applied",
  location: "",
  dateApplied: new Date().toISOString().split("T")[0],
};

const Modal = ({ isOpen, onClose, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        company: initialData.company || "",
        position: initialData.position || "",
        status: initialData.status || "Applied",
        location: initialData.location || "",
        dateApplied:
          initialData.dateApplied ||
          new Date().toISOString().split("T")[0],
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!formData.dateApplied) newErrors.dateApplied = "Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit(formData);
      onClose();
      setFormData(emptyForm);
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-surface-900 border border-surface-700/50 rounded-2xl shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-800">
          <h2 className="text-lg font-semibold text-surface-100">
            {isEditing ? "Edit Application" : "Add Application"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-surface-800 text-surface-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">
              Company *
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="e.g. Google"
              className={`input-field ${
                errors.company ? "border-danger-500 focus:border-danger-500" : ""
              }`}
            />
            {errors.company && (
              <p className="text-xs text-danger-400 mt-1">{errors.company}</p>
            )}
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">
              Position *
            </label>
            <input
              type="text"
              value={formData.position}
              onChange={(e) => handleChange("position", e.target.value)}
              placeholder="e.g. Frontend Engineer"
              className={`input-field ${
                errors.position ? "border-danger-500 focus:border-danger-500" : ""
              }`}
            />
            {errors.position && (
              <p className="text-xs text-danger-400 mt-1">{errors.position}</p>
            )}
          </div>

          {/* Status & Location */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="input-field"
              >
                {STATUS_OPTIONS.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-300 mb-1.5">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="e.g. Remote"
                className="input-field"
              />
            </div>
          </div>

          {/* Date Applied */}
          <div>
            <label className="block text-sm font-medium text-surface-300 mb-1.5">
              Date Applied *
            </label>
            <input
              type="date"
              value={formData.dateApplied}
              onChange={(e) => handleChange("dateApplied", e.target.value)}
              className={`input-field ${
                errors.dateApplied
                  ? "border-danger-500 focus:border-danger-500"
                  : ""
              }`}
            />
            {errors.dateApplied && (
              <p className="text-xs text-danger-400 mt-1">
                {errors.dateApplied}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting
                ? "Saving..."
                : isEditing
                ? "Update Application"
                : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
