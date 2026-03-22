import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../services/firebase";
import {
  addApplication,
  updateApplication,
  deleteApplication,
} from "../services/applicationService";
import { addNotification } from "../services/notificationService";

/**
 * Custom hook for managing job applications with Firestore.
 * Uses real-time onSnapshot listener for instant data reflection.
 */
const useApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const unsubRef = useRef(null);

  // Use user.uid as a stable dependency instead of the full user object
  const uid = user?.uid;

  useEffect(() => {
    // Clean up any previous listener
    if (unsubRef.current) {
      unsubRef.current();
      unsubRef.current = null;
    }

    if (!uid) {
      setApplications([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const q = query(
      collection(db, "applications"),
      where("userId", "==", uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setApplications(data);
        setLoading(false);
      },
      (err) => {
        console.error("Error listening to applications:", err);
        setError("Failed to load applications.");
        setLoading(false);
      }
    );

    unsubRef.current = unsubscribe;

    return () => {
      unsubscribe();
      unsubRef.current = null;
    };
  }, [uid]);

  const handleAdd = useCallback(
    async (applicationData) => {
      try {
        setError(null);
        const newApp = await addApplication(uid, applicationData);
        setApplications((prev) => [newApp, ...prev]);
        toast.success("Application added successfully");
        // Fire-and-forget — don't block the UI
        addNotification(uid, "added", `Added: ${applicationData.position} at ${applicationData.company}`);
        return newApp;
      } catch (err) {
        console.error("Error adding application:", err);
        setError("Failed to add application.");
        toast.error("Failed to add application");
        throw err;
      }
    },
    [uid]
  );

  const handleUpdate = useCallback(async (id, applicationData) => {
    try {
      setError(null);
      const updated = await updateApplication(id, applicationData);
      // Optimistic update; onSnapshot will reconcile
      setApplications((prev) =>
        prev.map((app) => (app.id === id ? { ...app, ...updated } : app))
      );
      toast.success("Application updated");
      addNotification(uid, "updated", `Updated: ${applicationData.position || ""} ${applicationData.company ? "at " + applicationData.company : ""}`.trim());
      return updated;
    } catch (err) {
      console.error("Error updating application:", err);
      setError("Failed to update application.");
      toast.error("Failed to update application");
      throw err;
    }
  }, [uid]);

  const handleDelete = useCallback(async (id) => {
    try {
      setError(null);
      // Optimistic removal
      setApplications((prev) => prev.filter((app) => app.id !== id));
      await deleteApplication(id);
      toast.success("Application deleted");
      addNotification(uid, "deleted", "Removed an application");
    } catch (err) {
      console.error("Error deleting application:", err);
      setError("Failed to delete application.");
      toast.error("Failed to delete application");
      throw err;
    }
  }, [uid]);

  return {
    applications,
    loading,
    error,
    addApplication: handleAdd,
    updateApplication: handleUpdate,
    deleteApplication: handleDelete,
  };
};

export default useApplications;
