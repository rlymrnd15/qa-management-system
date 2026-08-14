import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

import { db } from "../firebase";

const buildsCollection = collection(db, "deviceBuilds");

// ==============================
// GET ALL BUILDS
// ==============================

export const getBuilds = async () => {
  console.log("READING BUILDS COLLECTION...");

  const snapshot = await getDocs(buildsCollection);

  console.log("BUILDS SNAPSHOT SIZE:", snapshot.size);

  snapshot.forEach((document) => {
    console.log(
      "BUILD DOC:",
      document.id,
      document.data()
    );
  });

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// ==============================
// ADD BUILD
// ==============================

export const addBuild = async (build) => {
  const { id, ...data } = build;

  // If this build is marked as latest,
  // remove latest from other builds
  // with the same game + platform.
  if (data.latest) {
    const snapshot = await getDocs(buildsCollection);

    const updates = snapshot.docs
      .filter((document) => {
        const existingBuild = document.data();

        return (
          existingBuild.game === data.game &&
          existingBuild.platform === data.platform &&
          existingBuild.latest === true
        );
      })
      .map((document) =>
        updateDoc(document.ref, {
          latest: false,
        })
      );

    await Promise.all(updates);
  }

  const docRef = await addDoc(
    buildsCollection,
    data
  );

  return {
    ...data,
    id: docRef.id,
  };
};

// ==============================
// UPDATE BUILD
// ==============================

export const updateBuild = async (id, build) => {
  const buildRef = doc(
    db,
    "deviceBuilds",
    String(id)
  );

  const { id: ignoredId, ...data } = build;

  // If this build is being marked as latest,
  // remove latest from other builds
  // with the same game + platform.
  if (data.latest) {
    const snapshot = await getDocs(buildsCollection);

    const updates = snapshot.docs
      .filter((document) => {
        const existingBuild = document.data();

        return (
          document.id !== String(id) &&
          existingBuild.game === data.game &&
          existingBuild.platform === data.platform &&
          existingBuild.latest === true
        );
      })
      .map((document) =>
        updateDoc(document.ref, {
          latest: false,
        })
      );

    await Promise.all(updates);
  }

  await updateDoc(
    buildRef,
    data
  );

  return {
    ...data,
    id: String(id),
  };
};

// ==============================
// DELETE BUILD
// ==============================

export const deleteBuild = async (id) => {
  const buildRef = doc(
    db,
    "deviceBuilds",
    String(id)
  );

  await deleteDoc(buildRef);
};