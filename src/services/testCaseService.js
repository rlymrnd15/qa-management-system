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

const testCasesCollection = collection(db, "testCases");

// ==========================================
// GET ALL TEST CASES
// ==========================================
export const getTestCases = async () => {
  const snapshot = await getDocs(testCasesCollection);

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// ==========================================
// ADD TEST CASE
// ==========================================
export const addTestCase = async (testCase) => {
  const { id, ...data } = testCase;

  const docRef = await addDoc(testCasesCollection, {
    ...data,

    // IMPORTANT:
    // Save the actual Firebase server time
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    ...data,
    id: docRef.id,
  };
};

// ==========================================
// UPDATE TEST CASE
// ==========================================
export const updateTestCase = async (id, testCase) => {
  if (!id) {
    throw new Error("Test Case ID is missing.");
  }

  const testCaseRef = doc(
    db,
    "testCases",
    String(id)
  );

  const { id: ignoredId, ...data } = testCase;

  await updateDoc(testCaseRef, {
    ...data,

    // IMPORTANT:
    // Every edit updates the timestamp
    updatedAt: serverTimestamp(),
  });

  return {
    ...data,
    id: String(id),
  };
};

// ==========================================
// DELETE TEST CASE
// ==========================================
export const deleteTestCase = async (id) => {
  if (!id) {
    throw new Error("Test Case ID is missing.");
  }

  const testCaseRef = doc(
    db,
    "testCases",
    String(id)
  );

  await deleteDoc(testCaseRef);
};