import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const bugsCollection = collection(db, "bugReports");

// Get all bug reports
export const getBugReports = async () => {
  const snapshot = await getDocs(bugsCollection);

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// Add bug report
export const addBugReport = async (bug) => {
  const { id, ...data } = bug;

  const docRef = await addDoc(bugsCollection, data);

  return {
    ...data,
    id: docRef.id,
  };
};

// Update bug report
export const updateBugReport = async (id, bug) => {
  const bugRef = doc(db, "bugReports", String(id));

  const { id: ignoredId, ...data } = bug;

  await updateDoc(bugRef, data);

  return {
    ...data,
    id: String(id),
  };
};

// Delete bug report
export const deleteBugReport = async (id) => {
  const bugRef = doc(db, "bugReports", String(id));

  await deleteDoc(bugRef);
};