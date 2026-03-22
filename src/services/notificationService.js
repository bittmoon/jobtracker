import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  limit as firestoreLimit,
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION = "notifications";

/**
 * Add a notification for a user.
 * @param {string} userId
 * @param {string} type - "added" | "updated" | "deleted"
 * @param {string} message - Human readable message
 */
export const addNotification = async (userId, type, message) => {
  try {
    await addDoc(collection(db, COLLECTION), {
      userId,
      type,
      message,
      read: false,
      createdAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Error adding notification:", err);
  }
};

/**
 * Subscribe to real-time notifications for a user.
 * @param {string} userId
 * @param {function} callback - receives array of notifications
 * @returns {function} unsubscribe
 */
export const subscribeToNotifications = (userId, callback) => {
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    firestoreLimit(20)
  );

  return onSnapshot(q, (snapshot) => {
    const notifications = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(notifications);
  });
};

/**
 * Mark a notification as read.
 */
export const markNotificationRead = async (notifId) => {
  try {
    await updateDoc(doc(db, COLLECTION, notifId), { read: true });
  } catch (err) {
    console.error("Error marking notification as read:", err);
  }
};

/**
 * Mark all notifications as read for a user.
 */
export const markAllRead = async (notifications) => {
  const promises = notifications
    .filter((n) => !n.read)
    .map((n) => updateDoc(doc(db, COLLECTION, n.id), { read: true }));
  await Promise.all(promises);
};
