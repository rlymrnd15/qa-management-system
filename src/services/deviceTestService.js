import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const deviceTestsCollection = collection(
  db,
  "deviceTests"
);

// Get all device tests from Firestore
export const getDeviceTests = async () => {
  const snapshot = await getDocs(
    deviceTestsCollection
  );

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// Add a device test
export const addDeviceTest = async (deviceTest) => {
  const { id, ...data } = deviceTest;

  const docRef = await addDoc(
    deviceTestsCollection,
    data
  );

  return {
    id: docRef.id,
    ...data,
  };
};

// Update a device test
export const updateDeviceTest = async (
  id,
  deviceTest
) => {
  const deviceRef = doc(
    db,
    "deviceTests",
    String(id)
  );

  const { id: ignoredId, ...data } = deviceTest;

  await updateDoc(
    deviceRef,
    data
  );

  return {
    id: String(id),
    ...data,
  };
};

// Delete a device test
export const deleteDeviceTest = async (id) => {
  const deviceRef = doc(
    db,
    "deviceTests",
    String(id)
  );

  await deleteDoc(deviceRef);
};