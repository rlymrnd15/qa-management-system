import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const testCasesCollection = collection(db, "testCases");

// Get all test cases
export const getTestCases = async () => {
  const snapshot = await getDocs(testCasesCollection);

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// Add test case
export const addTestCase = async (testCase) => {
  const { id, ...data } = testCase;

  const docRef = await addDoc(testCasesCollection, data);

  return {
    ...data,
    id: docRef.id,
  };
};

// Update test case
export const updateTestCase = async (id, testCase) => {
  const testCaseRef = doc(
    db,
    "testCases",
    String(id)
  );

  const { id: ignoredId, ...data } = testCase;

  await updateDoc(testCaseRef, data);

  return {
    ...data,
    id: String(id),
  };
};

// Delete test case
export const deleteTestCase = async (id) => {
  const testCaseRef = doc(
    db,
    "testCases",
    String(id)
  );

  await deleteDoc(testCaseRef);
};