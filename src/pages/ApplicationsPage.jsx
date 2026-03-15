import { useState, useMemo } from "react";
import useApplications from "../hooks/useApplications";
import JobTable from "../components/JobTable";
import FilterBar from "../components/FilterBar";
import Modal from "../components/Modal";
import { Plus, Briefcase } from "lucide-react";

const emptyFilters = {
  status: "",
  company: "",
  dateFrom: "",
  dateTo: "",
};

const ApplicationsPage = () => {
  const {
    applications,
    loading,
    error,
    addApplication,
    updateApplication,
    deleteApplication,
  } = useApplications();

  const [filters, setFilters] = useState(emptyFilters);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState(null);

  // Apply filters
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (filters.status && app.status !== filters.status) return false;
      if (
        filters.company &&
        !app.company.toLowerCase().includes(filters.company.toLowerCase())
      )
        return false;
      if (filters.dateFrom && app.dateApplied < filters.dateFrom) return false;
      if (filters.dateTo && app.dateApplied > filters.dateTo) return false;
      return true;
    });
  }, [applications, filters]);

  const handleAdd = async (data) => {
    await addApplication(data);
  };

  const handleEdit = (app) => {
    setEditingApp(app);
    setModalOpen(true);
  };

  const handleUpdate = async (data) => {
    await updateApplication(editingApp.id, data);
    setEditingApp(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      await deleteApplication(id);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingApp(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-100 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-primary-400" />
            Applications
          </h1>
          <p className="text-surface-400 text-sm mt-1">
            Manage and track all your job applications
          </p>
        </div>
        <button
          onClick={() => {
            setEditingApp(null);
            setModalOpen(true);
          }}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" />
          Add Application
        </button>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={setFilters}
        onClear={() => setFilters(emptyFilters)}
      />

      {/* Error */}
      {error && (
        <div className="p-3 rounded-xl bg-danger-500/10 border border-danger-500/20 text-danger-400 text-sm">
          {error}
        </div>
      )}

      {/* Results Info */}
      {!loading && applications.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-surface-500">
            Showing{" "}
            <span className="font-medium text-surface-300">
              {filteredApplications.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-surface-300">
              {applications.length}
            </span>{" "}
            applications
          </p>
        </div>
      )}

      {/* Table */}
      <JobTable
        applications={filteredApplications}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSubmit={editingApp ? handleUpdate : handleAdd}
        initialData={editingApp}
      />
    </div>
  );
};

export default ApplicationsPage;
