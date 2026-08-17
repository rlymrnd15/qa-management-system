import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import BugStats from "../bugreport/BugStats";
import SearchFilters from "../bugreport/SearchFilters";

import BuildsGrid from "../build/BuildsGrid";
import BuildDetails from "../build/BuildDetails";

import { formatGameName } from "../../utils/formatGameName";
import AddBuildModal from "../build/AddBuildModal";

import { getBugReports } from "../../services/bugReportService";

import {
  getDeviceBuilds,
  addDeviceBuild,
  updateDeviceBuild,
  deleteDeviceBuild,
} from "../../services/deviceBuildService";

function BugReports({
  game,
  platform,
}) {
  const { role } = useAuth();

  const isDev =
    role?.toLowerCase() === "dev";

  const [bugs, setBugs] = useState([]);
  const [buildList, setBuildList] = useState([]);

  const [loading, setLoading] = useState(true);

  // Currently selected build
  const [selectedBuild, setSelectedBuild] =
    useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [priority, setPriority] =
    useState("All");
  const [status, setStatus] =
    useState("All");
  const [device, setDevice] =
    useState("All");

  // Build modal
  const [openBuildModal, setOpenBuildModal] =
    useState(false);
  const [editingBuild, setEditingBuild] =
    useState(null);

  // ==========================================
  // NORMALIZE GAME
  // ==========================================
  // Snake.io uses "snake-io" in the UI,
  // but "snake" in Firestore.
  const buildGame =
    game === "snake-io"
      ? "snake"
      : game;

  // ==========================================
  // LOAD BUGS + BUILDS
  // ==========================================
  useEffect(() => {
    const loadData = async () => {
      try {
        const [
          bugData,
          buildData,
        ] = await Promise.all([
          getBugReports(),
          getDeviceBuilds(),
        ]);

        console.log(
          "BUGS:",
          bugData
        );

        console.log(
          "BUILDS FROM FIRESTORE:",
          buildData
        );

        buildData.forEach((build) => {
          console.log(
            "BUG REPORT BUILD:",
            {
              id: build.id,
              version: build.version,
              game: build.game,
              platform: build.platform,
              releaseDate:
                build.releaseDate,
              latest: build.latest,
              description:
                build.description,
            }
          );
        });

        console.log(
          "CURRENT GAME:",
          game
        );

        console.log(
          "NORMALIZED GAME:",
          buildGame
        );

        console.log(
          "CURRENT PLATFORM:",
          platform
        );

        setBugs(bugData);
        setBuildList(buildData);

      } catch (error) {
        console.error(
          "Error loading bug reports/builds:",
          error
        );

        alert(
          error.message ||
            "Failed to load bug reports."
        );

      } finally {
        setLoading(false);
      }
    };

    loadData();

  }, [game, platform, buildGame]);

  // ==========================================
  // BUGS FOR CURRENT GAME + PLATFORM
  // ==========================================
  const gameBugs = bugs.filter(
    (bug) =>
      bug.game === game &&
      bug.platform === platform
  );

  // ==========================================
  // BUILDS FOR CURRENT GAME + PLATFORM
  // ==========================================
  const gameBuilds =
    buildList.filter(
      (build) =>
        build.game === buildGame &&
        build.platform === platform
    );

  console.log(
    "FILTERED BUG REPORT BUILDS:",
    gameBuilds
  );

  // ==========================================
  // EDIT BUILD
  // ==========================================
  const handleEditBuild = (build) => {
    console.log(
      "EDIT BUILD:",
      build
    );

    setEditingBuild(build);
    setOpenBuildModal(true);
  };

  // ==========================================
  // DELETE BUILD
  // ==========================================
  const handleDeleteBuild = async (
    build
  ) => {
    const confirmed =
      window.confirm(
        `Are you sure you want to delete Build v${build.version}?`
      );

    if (!confirmed) return;

    try {
      await deleteDeviceBuild(
        build.id
      );

      setBuildList(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== build.id
          )
      );

    } catch (error) {
      console.error(
        "Error deleting build:",
        error
      );

      alert(
        "Failed to delete build."
      );
    }
  };

  // ==========================================
  // DEVICES
  // ==========================================
  const devices = [
    "All",
    ...new Set(
      gameBugs
        .map(
          (bug) =>
            bug.device
        )
        .filter(Boolean)
    ),
  ];

  // ==========================================
  // PLATFORM NAME
  // ==========================================
  const platformName = {
    ios: "iOS",
    android: "Android",
    amazon: "Amazon",
  }[platform] || platform;

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-500">
          Loading bug reports...
        </p>
      </div>
    );
  }

  // ==========================================
  // SELECTED BUILD
  // ==========================================
  if (selectedBuild) {
    return (
      <BuildDetails
        build={selectedBuild}
        bugs={bugs}
        setBugs={setBugs}
        game={game}
        platform={platform}
        onBack={() =>
          setSelectedBuild(null)
        }
      />
    );
  }

  // ==========================================
  // RENDER
  // ==========================================
  return (
    <div>

      {/* ========================================
          HEADER
      ======================================== */}
      <div className="mb-8 flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Bug Reports
          </h1>

          <p className="mt-2 text-slate-500">
            {formatGameName(game)} •{" "}
            {platformName}
          </p>

        </div>

        {isDev && (
          <button
            onClick={() => {
              setEditingBuild(null);
              setOpenBuildModal(true);
            }}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Build
          </button>
        )}

      </div>

      {/* ========================================
          BUG STATS
      ======================================== */}
      <BugStats
        bugs={gameBugs}
      />

      {/* ========================================
          FILTERS
      ======================================== */}
      <SearchFilters
        search={search}
        setSearch={setSearch}

        priority={priority}
        setPriority={setPriority}

        status={status}
        setStatus={setStatus}

        device={device}
        setDevice={setDevice}

        devices={devices}
      />

      {/* ========================================
          BUILDS
      ======================================== */}
      <BuildsGrid
        builds={gameBuilds}
        bugs={gameBugs}
        isDev={isDev}

        onSelectBuild={(build) => {
          console.log(
            "SELECTED BUILD FROM BUG REPORTS:",
            build
          );

          setSelectedBuild(build);
        }}

        onEditBuild={
          handleEditBuild
        }

        onDeleteBuild={
          handleDeleteBuild
        }
      />

      {/* ========================================
          ADD / EDIT BUILD MODAL
      ======================================== */}
      <AddBuildModal
        isOpen={openBuildModal}

        build={editingBuild}

        game={buildGame}

        platform={platform}

        onClose={() => {
          setOpenBuildModal(false);
          setEditingBuild(null);
        }}

        onSubmit={async (
          newBuild
        ) => {

          try {

            // ==================================
            // EDIT BUILD
            // ==================================
            if (editingBuild) {

              const updatedBuild =
                await updateDeviceBuild(
                  editingBuild.id,
                  {
                    ...newBuild,

                    // IMPORTANT:
                    // Always use normalized game.
                    game: buildGame,

                    platform:
                      platform,
                  }
                );

              setBuildList(
                (prevBuilds) =>
                  prevBuilds.map(
                    (build) => {

                      // If edited build is Latest,
                      // remove Latest from other
                      // builds of same game/platform.
                      if (
                        updatedBuild.latest &&
                        build.game ===
                          buildGame &&
                        build.platform ===
                          platform &&
                        build.id !==
                          updatedBuild.id
                      ) {
                        return {
                          ...build,
                          latest: false,
                        };
                      }

                      return build.id ===
                        updatedBuild.id
                        ? updatedBuild
                        : build;
                    }
                  )
              );

            }

            // ==================================
            // ADD BUILD
            // ==================================
            else {

              const savedBuild =
                await addDeviceBuild({
                  ...newBuild,

                  // IMPORTANT:
                  // Snake.io is saved as "snake"
                  // so Device Matrix can find it.
                  game: buildGame,

                  platform:
                    platform,
                });

              setBuildList(
                (prevBuilds) => {

                  const updatedBuilds =
                    savedBuild.latest
                      ? prevBuilds.map(
                          (build) => {

                            if (
                              build.game ===
                                buildGame &&
                              build.platform ===
                                platform
                            ) {
                              return {
                                ...build,
                                latest: false,
                              };
                            }

                            return build;
                          }
                        )
                      : prevBuilds;

                  return [
                    savedBuild,
                    ...updatedBuilds,
                  ];
                }
              );
            }

            setOpenBuildModal(
              false
            );

            setEditingBuild(
              null
            );

          } catch (error) {

            console.error(
              "Error saving build:",
              error
            );

            alert(
              error.message ||
                "Failed to save build."
            );
          }
        }}
      />

    </div>
  );
}

export default BugReports;