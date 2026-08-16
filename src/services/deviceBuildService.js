import {
  collection,
  getDocs,
  getDoc,
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

// ==========================================
// GET BUILDS
// ==========================================
export const getDeviceBuilds = async () => {
  const snapshot = await getDocs(buildsCollection);

  return snapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id,
  }));
};

// ==========================================
// ADD BUILD
// ==========================================
export const addDeviceBuild = async (build) => {
  const { id, ...data } = build;

  // ------------------------------------------
  // CHECK FOR DUPLICATE BUILD
  // Same game + platform + version + date
  // ------------------------------------------
  const duplicateQuery = query(
    buildsCollection,
    where("game", "==", data.game),
    where("platform", "==", data.platform),
    where("version", "==", data.version),
    where("releaseDate", "==", data.releaseDate)
  );

  const duplicateSnapshot = await getDocs(
    duplicateQuery
  );

  if (!duplicateSnapshot.empty) {
    throw new Error(
      `Build v${data.version} with release date ${data.releaseDate} already exists for this game and platform.`
    );
  }

  // ------------------------------------------
  // IF NEW BUILD IS LATEST
  // REMOVE LATEST FROM OTHER BUILDS
  // ------------------------------------------
  if (data.latest) {
    const latestQuery = query(
      buildsCollection,
      where("game", "==", data.game),
      where("platform", "==", data.platform)
    );

    const latestSnapshot = await getDocs(
      latestQuery
    );

    const batch = writeBatch(db);

    latestSnapshot.docs.forEach((document) => {
      batch.update(document.ref, {
        latest: false,
      });
    });

    await batch.commit();
  }

  // ------------------------------------------
  // CREATE BUILD
  // ------------------------------------------
  const docRef = await addDoc(
    buildsCollection,
    data
  );

  return {
    ...data,
    id: docRef.id,
  };
};

// ==========================================
// UPDATE BUILD
// ==========================================
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

  // ------------------------------------------
  // CHECK FOR DUPLICATE BUILD
  // Exclude the build currently being edited
  // ------------------------------------------
  const duplicateQuery = query(
    buildsCollection,
    where("game", "==", data.game),
    where("platform", "==", data.platform),
    where("version", "==", data.version),
    where("releaseDate", "==", data.releaseDate)
  );

  const duplicateSnapshot = await getDocs(
    duplicateQuery
  );

  const duplicateExists =
    duplicateSnapshot.docs.some(
      (document) =>
        document.id !== String(id)
    );

  if (duplicateExists) {
    throw new Error(
      `Build v${data.version} with release date ${data.releaseDate} already exists for this game and platform.`
    );
  }

  // ------------------------------------------
  // IF EDITED BUILD IS LATEST
  // REMOVE LATEST FROM OTHER BUILDS
  // ------------------------------------------
  if (data.latest) {
    const latestQuery = query(
      buildsCollection,
      where("game", "==", data.game),
      where("platform", "==", data.platform)
    );

    const latestSnapshot = await getDocs(
      latestQuery
    );

    const batch = writeBatch(db);

    latestSnapshot.docs.forEach((document) => {
      if (document.id !== String(id)) {
        batch.update(document.ref, {
          latest: false,
        });
      }
    });

    await batch.commit();
  }

  // ------------------------------------------
  // UPDATE BUILD
  // ------------------------------------------
  await updateDoc(
    buildRef,
    data
  );

  return {
    ...data,
    id: String(id),
  };
};

// ==========================================
// DELETE BUILD + RELATED BUGS + DEVICE TESTS
// ==========================================
export const deleteDeviceBuild = async (id) => {
  const buildRef = doc(
    db,
    "deviceBuilds",
    String(id)
  );

  // Get the build itself
  const buildSnapshot = await getDoc(buildRef);

  if (!buildSnapshot.exists()) {
    throw new Error("Build not found.");
  }

  const buildData = buildSnapshot.data();

  const {
    game,
    platform,
    version,
  } = buildData;

  console.log("DELETE BUILD DATA:", {
    id,
    game,
    platform,
    version,
  });

  // Get ALL bug reports
  const bugSnapshot = await getDocs(
    collection(db, "bugReports")
  );

  // Get ALL device tests
  const deviceTestSnapshot = await getDocs(
    collection(db, "deviceTests")
  );

  const batch = writeBatch(db);

  let deletedBugs = 0;
  let deletedDeviceTests = 0;

  // ------------------------------------------
  // DELETE RELATED BUG REPORTS
  // ------------------------------------------
  bugSnapshot.docs.forEach((document) => {
    const bug = document.data();

    const sameGame =
      bug.game === game;

    const samePlatform =
      bug.platform === platform;

    const sameBuild =
      String(bug.build) === String(version);

    if (
      sameGame &&
      samePlatform &&
      sameBuild
    ) {
      console.log(
        "DELETING BUG:",
        document.id,
        bug
      );

      batch.delete(document.ref);
      deletedBugs++;
    }
  });

  // ------------------------------------------
  // DELETE RELATED DEVICE TESTS
  // ------------------------------------------
  deviceTestSnapshot.docs.forEach((document) => {
    const deviceTest = document.data();

    const sameGame =
      deviceTest.game === game;

    const samePlatform =
      deviceTest.platform === platform;

    const sameBuild =
      String(deviceTest.build) === String(version);

    if (
      sameGame &&
      samePlatform &&
      sameBuild
    ) {
      console.log(
        "DELETING DEVICE TEST:",
        document.id,
        deviceTest
      );

      batch.delete(document.ref);
      deletedDeviceTests++;
    }
  });

  // ------------------------------------------
  // DELETE THE BUILD
  // ------------------------------------------
  batch.delete(buildRef);

  // ------------------------------------------
  // COMMIT EVERYTHING
  // ------------------------------------------
  await batch.commit();

  console.log(
    "DELETE COMPLETE:",
    {
      build: version,
      deletedBugs,
      deletedDeviceTests,
    }
  );

  return {
    deletedBuildId: String(id),
    deletedBugReports: deletedBugs,
    deletedDeviceTests,
  };
};