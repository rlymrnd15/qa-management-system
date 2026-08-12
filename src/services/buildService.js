import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const buildsCollection = collection(db, "builds");

// Get all builds
export const getBuilds = async () => {
  const snapshot = await getDocs(buildsCollection);

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// Add build
export const addBuild = async (build) => {
  const { id, ...data } = build;

  const docRef = await addDoc(
    buildsCollection,
    data
  );

  return {
    ...data,
    id: docRef.id,
  };
};

// Update build
export const updateBuild = async (id, build) => {
  const buildRef = doc(
    db,
    "builds",
    String(id)
  );

  const { id: ignoredId, ...data } = build;

  await updateDoc(buildRef, data);

  return {
    ...data,
    id: String(id),
  };
};

// Delete build
export const deleteBuild = async (id) => {
  const buildRef = doc(
    db,
    "builds",
    String(id)
  );

  await deleteDoc(buildRef);
};