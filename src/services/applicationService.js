import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION_NAME = "applications";

/**
 * Get all job applications for a specific user.
 */
export const getApplications = async (userId) => {
  const q = query(
    collection(db, COLLECTION_NAME),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/**
 * Add a new job application.
 */
export const addApplication = async (userId, applicationData) => {
  const docRef = await addDoc(collection(db, COLLECTION_NAME), {
    ...applicationData,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return { id: docRef.id, ...applicationData, userId };
};

/**
 * Update an existing job application.
 */
export const updateApplication = async (applicationId, applicationData) => {
  const docRef = doc(db, COLLECTION_NAME, applicationId);
  await updateDoc(docRef, {
    ...applicationData,
    updatedAt: serverTimestamp(),
  });
  return { id: applicationId, ...applicationData };
};

/**
 * Delete a job application.
 */
export const deleteApplication = async (applicationId) => {
  const docRef = doc(db, COLLECTION_NAME, applicationId);
  await deleteDoc(docRef);
};
