import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getApplications,
  addApplication,
  updateApplication,
  deleteApplication,
} from "../services/applicationService";

/**
 * Custom hook for managing job applications with Firestore.
 */
const useApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApplications = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getApplications(user.uid);
      setApplications(data);
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleAdd = async (applicationData) => {
    try {
      setError(null);
      const newApp = await addApplication(user.uid, applicationData);
      setApplications((prev) => [newApp, ...prev]);
      return newApp;
    } catch (err) {
      console.error("Error adding application:", err);
      setError("Failed to add application.");
      throw err;
    }
  };

  const handleUpdate = async (id, applicationData) => {
    try {
      setError(null);
      const updated = await updateApplication(id, applicationData);
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...updated } : app))
      );
      return updated;
    } catch (err) {
      console.error("Error updating application:", err);
      setError("Failed to update application.");
      throw err;
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
    } catch (err) {
      console.error("Error deleting application:", err);
      setError("Failed to delete application.");
      throw err;
    }
  };

  return {
    applications,
    loading,
    error,
    addApplication: handleAdd,
    updateApplication: handleUpdate,
    deleteApplication: handleDelete,
    refreshApplications: fetchApplications,
  };
};

export default useApplications;
