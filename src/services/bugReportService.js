import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const bugsCollection = collection(
  db,
  "bugReports"
);

// ==========================================
// GET ALL BUG REPORTS
// ==========================================
export const getBugReports = async () => {
  const snapshot = await getDocs(
    bugsCollection
  );

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// ==========================================
// ADD BUG REPORT
// ==========================================
export const addBugReport = async (bug) => {
  const { id, ...data } = bug;

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined
    )
  );

  const docRef = await addDoc(
    bugsCollection,
    {
      ...cleanData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  return {
    ...cleanData,
    id: docRef.id,
  };
};

// ==========================================
// UPDATE BUG REPORT
// ==========================================
export const updateBugReport = async (
  id,
  bug
) => {
  if (!id) {
    throw new Error("Bug ID is missing.");
  }

  const bugRef = doc(
    db,
    "bugReports",
    String(id)
  );

  const { id: ignoredId, ...data } = bug;

  const cleanData = Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) => value !== undefined
    )
  );

  await updateDoc(bugRef, {
    ...cleanData,
    updatedAt: serverTimestamp(),
  });

  return {
    ...cleanData,
    id: String(id),
  };
};

// ==========================================
// DELETE BUG REPORT
// ==========================================
export const deleteBugReport = async (id) => {
  if (!id) {
    throw new Error("Bug ID is missing.");
  }

  const bugRef = doc(
    db,
    "bugReports",
    String(id)
  );

  await deleteDoc(bugRef);
};