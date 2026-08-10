import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  writeBatch,
} from "firebase/firestore";

import { db } from "../firebase";

const buildsCollection = collection(
  db,
  "deviceBuilds"
);

// Get all builds
export const getDeviceBuilds = async () => {
  const snapshot = await getDocs(buildsCollection);

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// Add build
export const addDeviceBuild = async (build) => {
  const { id, ...data } = build;

  // If this build is marked as latest,
  // remove latest status from other builds
  // of the same game + platform.
  if (data.latest) {
    const q = query(
      buildsCollection,
      where("game", "==", data.game),
      where("platform", "==", data.platform)
    );

    const snapshot = await getDocs(q);

    const batch = writeBatch(db);

    snapshot.docs.forEach((document) => {
      batch.update(document.ref, {
        latest: false,
      });
    });

    await batch.commit();
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

// Update build
export const updateDeviceBuild = async (
  id,
  build
) => {
  const buildRef = doc(
    db,
    "deviceBuilds",
    String(id)
  );

  const { id: ignoredId, ...data } = build;

  // If this build is being marked as latest,
  // remove latest status from other builds
  // of the same game + platform.
  if (data.latest) {
    const q = query(
      buildsCollection,
      where("game", "==", data.game),
      where("platform", "==", data.platform)
    );

    const snapshot = await getDocs(q);

    const batch = writeBatch(db);

    snapshot.docs.forEach((document) => {
      if (document.id !== String(id)) {
        batch.update(document.ref, {
          latest: false,
        });
      }
    });

    await batch.commit();
  }

  await updateDoc(buildRef, data);

  return {
    ...data,
    id: String(id),
  };
};

// Delete build
export const deleteDeviceBuild = async (id) => {
  const buildRef = doc(
    db,
    "deviceBuilds",
    String(id)
  );

  await deleteDoc(buildRef);
};