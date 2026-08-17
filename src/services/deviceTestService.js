import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";

const deviceTestsCollection = collection(
  db,
  "deviceTests"
);

// ==========================================
// GET ALL DEVICE TESTS
// ==========================================
export const getDeviceTests = async () => {
  const snapshot = await getDocs(
    deviceTestsCollection
  );

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// ==========================================
// GET SINGLE DEVICE TEST
// ==========================================
export const getDeviceTest = async (id) => {
  const deviceTestRef = doc(
    db,
    "deviceTests",
    String(id)
  );

  const snapshot = await getDoc(
    deviceTestRef
  );

  if (!snapshot.exists()) {
    throw new Error("Device test not found.");
  }

  return {
    ...snapshot.data(),
    id: snapshot.id,
  };
};

// ==========================================
// ADD DEVICE TEST
// ==========================================
export const addDeviceTest = async (
  deviceTest
) => {
  const { id, ...data } = deviceTest;

  const docRef = await addDoc(
    deviceTestsCollection,
    {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  return {
    ...data,
    id: docRef.id,
  };
};

// ==========================================
// UPDATE DEVICE TEST
// ==========================================
export const updateDeviceTest = async (
  id,
  deviceTest
) => {

  // IMPORTANT:
  // Define the document reference before using it.
  const deviceTestRef = doc(
    db,
    "deviceTests",
    String(id)
  );

  const { id: ignoredId, ...data } =
    deviceTest;

  // Update Firestore document
  await updateDoc(
    deviceTestRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    }
  );

  // Return updated object
  return {
    ...data,
    id: String(id),
  };
};

// ==========================================
// DELETE DEVICE TEST
// ==========================================
export const deleteDeviceTest = async (
  id
) => {

  const deviceTestRef = doc(
    db,
    "deviceTests",
    String(id)
  );

  await deleteDoc(
    deviceTestRef
  );

  return {
    deletedDeviceTestId: String(id),
  };
};