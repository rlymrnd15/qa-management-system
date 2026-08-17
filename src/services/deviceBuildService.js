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
  serverTimestamp,
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
  console.log("READING BUILDS COLLECTION...");

  const snapshot = await getDocs(
    buildsCollection
  );

  console.log(
    "BUILDS SNAPSHOT SIZE:",
    snapshot.size
  );

  return snapshot.docs.map((document) => {
    const data = document.data();

    console.log(
      "BUILD DOC:",
      document.id,
      data
    );

    return {
      ...data,
      id: document.id,
    };
  });
};

// ==========================================
// ADD BUILD
// ==========================================
export const addDeviceBuild = async (
  build
) => {
  console.log(
    "ADDING DEVICE BUILD:",
    build
  );

  const data = {
    game: build.game,
    platform: build.platform,
    version: build.version,
    releaseDate: build.releaseDate,
    latest: Boolean(build.latest),
    description: build.description || "",
  };

  // ==========================================
  // CHECK DUPLICATE
  // ==========================================
  const duplicateQuery = query(
    buildsCollection,
    where("game", "==", data.game),
    where("platform", "==", data.platform),
    where("version", "==", data.version),
    where(
      "releaseDate",
      "==",
      data.releaseDate
    )
  );

  const duplicateSnapshot =
    await getDocs(duplicateQuery);

  if (!duplicateSnapshot.empty) {
    throw new Error(
      `Build v${data.version} with release date ${data.releaseDate} already exists for this game and platform.`
    );
  }

  // ==========================================
  // HANDLE LATEST
  // ==========================================
  if (data.latest) {
    const latestQuery = query(
      buildsCollection,
      where("game", "==", data.game),
      where("platform", "==", data.platform)
    );

    const latestSnapshot =
      await getDocs(latestQuery);

    const batch = writeBatch(db);

    latestSnapshot.docs.forEach(
      (document) => {
        batch.update(document.ref, {
          latest: false,
        });
      }
    );

    await batch.commit();
  }

  // ==========================================
  // CREATE
  // ==========================================
  const docRef = await addDoc(
    buildsCollection,
    {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
  );

  console.log(
    "BUILD CREATED:",
    docRef.id
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
  console.log(
    "================================="
  );

  console.log(
    "UPDATING DEVICE BUILD"
  );

  console.log(
    "BUILD ID:",
    id
  );

  console.log(
    "NEW BUILD DATA:",
    build
  );

  console.log(
    "================================="
  );

  if (!id) {
    throw new Error(
      "Cannot update build: missing build ID."
    );
  }

  // ==========================================
  // BUILD DOCUMENT REFERENCE
  // ==========================================
  const buildId = String(id);

  const buildRef = doc(
    db,
    "deviceBuilds",
    buildId
  );

  // ==========================================
  // CHECK THAT BUILD EXISTS
  // ==========================================
  const currentSnapshot =
    await getDoc(buildRef);

  if (!currentSnapshot.exists()) {
    throw new Error(
      `Build with ID ${buildId} does not exist.`
    );
  }

  const currentBuild =
    currentSnapshot.data();

  console.log(
    "CURRENT FIRESTORE BUILD:",
    currentBuild
  );

  // ==========================================
  // ONLY SAVE THESE FIELDS
  // ==========================================
  const data = {
    game:
      build.game ??
      currentBuild.game,

    platform:
      build.platform ??
      currentBuild.platform,

    version:
      build.version ??
      currentBuild.version,

    releaseDate:
      build.releaseDate ??
      currentBuild.releaseDate,

    latest:
      Boolean(
        build.latest ??
        currentBuild.latest
      ),

    description:
      build.description ??
      currentBuild.description ??
      "",
  };

  console.log(
    "FINAL DATA TO FIRESTORE:",
    data
  );

  // ==========================================
  // CHECK DUPLICATE
  // ==========================================
  const duplicateQuery = query(
    buildsCollection,
    where("game", "==", data.game),
    where("platform", "==", data.platform),
    where("version", "==", data.version),
    where(
      "releaseDate",
      "==",
      data.releaseDate
    )
  );

  const duplicateSnapshot =
    await getDocs(duplicateQuery);

  const duplicateExists =
    duplicateSnapshot.docs.some(
      (document) =>
        document.id !== buildId
    );

  if (duplicateExists) {
    throw new Error(
      `Build v${data.version} with release date ${data.releaseDate} already exists for this game and platform.`
    );
  }

  // ==========================================
  // UPDATE LATEST STATUS
  // ==========================================
  if (data.latest) {
    const latestQuery = query(
      buildsCollection,
      where("game", "==", data.game),
      where("platform", "==", data.platform)
    );

    const latestSnapshot =
      await getDocs(latestQuery);

    const batch = writeBatch(db);

    latestSnapshot.docs.forEach(
      (document) => {
        if (document.id !== buildId) {
          batch.update(document.ref, {
            latest: false,
            updatedAt: serverTimestamp(),
          });
        }
      }
    );

    await batch.commit();
  }

  // ==========================================
  // UPDATE CURRENT BUILD
  // ==========================================
  await updateDoc(buildRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });

  console.log(
    "BUILD UPDATED SUCCESSFULLY:",
    buildId
  );

  // ==========================================
  // RETURN UPDATED BUILD
  // ==========================================
  return {
    ...data,
    id: buildId,
  };
};

// ==========================================
// DELETE BUILD
// + RELATED BUGS
// + RELATED DEVICE TESTS
// ==========================================
export const deleteDeviceBuild = async (
  id
) => {
  const buildId = String(id);

  const buildRef = doc(
    db,
    "deviceBuilds",
    buildId
  );

  // ==========================================
  // GET BUILD
  // ==========================================
  const buildSnapshot =
    await getDoc(buildRef);

  if (!buildSnapshot.exists()) {
    throw new Error(
      "Build not found."
    );
  }

  const buildData =
    buildSnapshot.data();

  const {
    game,
    platform,
    version,
  } = buildData;

  console.log(
    "DELETE BUILD DATA:",
    {
      id: buildId,
      game,
      platform,
      version,
    }
  );

  // ==========================================
  // GET BUG REPORTS
  // ==========================================
  const bugSnapshot =
    await getDocs(
      collection(
        db,
        "bugReports"
      )
    );

  // ==========================================
  // GET DEVICE TESTS
  // ==========================================
  const deviceTestSnapshot =
    await getDocs(
      collection(
        db,
        "deviceTests"
      )
    );

  const batch = writeBatch(db);

  let deletedBugs = 0;
  let deletedDeviceTests = 0;

  // ==========================================
  // DELETE RELATED BUGS
  // ==========================================
  bugSnapshot.docs.forEach(
    (document) => {
      const bug =
        document.data();

      const sameGame =
        bug.game === game;

      const samePlatform =
        bug.platform === platform;

      const sameBuild =
        String(bug.build) ===
        String(version);

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

        batch.delete(
          document.ref
        );

        deletedBugs++;
      }
    }
  );

  // ==========================================
  // DELETE RELATED DEVICE TESTS
  // ==========================================
  deviceTestSnapshot.docs.forEach(
    (document) => {
      const deviceTest =
        document.data();

      const sameGame =
        deviceTest.game === game;

      const samePlatform =
        deviceTest.platform ===
        platform;

      const sameBuild =
        String(
          deviceTest.build
        ) === String(version);

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

        batch.delete(
          document.ref
        );

        deletedDeviceTests++;
      }
    }
  );

  // ==========================================
  // DELETE BUILD
  // ==========================================
  batch.delete(buildRef);

  // ==========================================
  // COMMIT
  // ==========================================
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
    deletedBuildId: buildId,
    deletedBugReports:
      deletedBugs,
    deletedDeviceTests:
      deletedDeviceTests,
  };
};