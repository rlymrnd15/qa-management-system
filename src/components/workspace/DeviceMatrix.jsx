import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import DeviceBuildCard from "../devicematrix/DeviceBuildCard";
import DeviceBuildDetails from "../devicematrix/DeviceBuildDetails";
import DeviceBuildModal from "../devicematrix/DeviceBuildModal";

import { getDeviceTests } from "../../services/deviceTestService";

import {
  getDeviceBuilds,
  addDeviceBuild,
  updateDeviceBuild,
  deleteDeviceBuild,
} from "../../services/deviceBuildService";

function DeviceMatrix({
  game,
  platform,
}) {
  const { role } = useAuth();

  const isDev =
    role?.toLowerCase() === "dev";

  const [selectedBuild, setSelectedBuild] =
    useState(null);

  const [deviceTests, setDeviceTests] =
    useState([]);

  const [deviceBuilds, setDeviceBuilds] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [buildLoading, setBuildLoading] =
    useState(true);

  const [buildModalOpen, setBuildModalOpen] =
    useState(false);

  const [editingBuild, setEditingBuild] =
    useState(null);

  // ==========================================
  // LOAD DEVICE TESTS
  // ==========================================
  useEffect(() => {
    const loadDeviceTests =
      async () => {
        try {
          const data =
            await getDeviceTests();

          setDeviceTests(data);
        } catch (error) {
          console.error(
            "Error loading device tests:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    loadDeviceTests();
  }, []);

  // ==========================================
  // LOAD BUILDS
  // ==========================================
  useEffect(() => {
    const loadBuilds =
      async () => {
        try {
          const data =
            await getDeviceBuilds();

          setDeviceBuilds(data);
        } catch (error) {
          console.error(
            "Error loading device builds:",
            error
          );
        } finally {
          setBuildLoading(false);
        }
      };

    loadBuilds();
  }, []);

  // ==========================================
  // DEBUG
  // ==========================================
  console.log(
    "================================="
  );

  console.log(
    "DEVICE MATRIX GAME:",
    game
  );

  console.log(
    "DEVICE MATRIX PLATFORM:",
    platform
  );

  console.log(
    "DEVICE BUILDS:",
    deviceBuilds
  );

  console.log(
    "================================="
  );

  // ==========================================
  // GAME MAPPING
  // ==========================================
  const buildGame =
    game === "snake-io"
      ? "snake"
      : game;

  // ==========================================
  // FILTER BUILDS
  // ==========================================
  const filteredBuilds =
    deviceBuilds.filter(
      (build) =>
        build.game === buildGame &&
        build.platform === platform
    );

  // ==========================================
  // BUILD STATISTICS
  // ==========================================
  const buildsWithStats =
    filteredBuilds.map(
      (build) => {
        const buildDevices =
          deviceTests.filter(
            (device) =>
              device.game ===
                buildGame &&
              device.platform ===
                platform &&
              String(device.build) ===
                String(build.version)
          );

        const totalDevices =
          buildDevices.length;

        const testFields = [
          "generalTest",
          "deviceHeating",
          "upgradeTesting",
          "adsTesting",
          "uiTesting",
          "destructiveTesting",
          "badInternet",
          "performanceTesting",
          "iapTesting",
          "viralSocial",
        ];

        const passed =
          buildDevices.filter(
            (device) => {
              const hasFail =
                testFields.some(
                  (field) =>
                    device[field] ===
                    "FAIL"
                );

              return (
                device.progress ===
                  100 &&
                !hasFail
              );
            }
          ).length;

        const failed =
          buildDevices.filter(
            (device) =>
              testFields.some(
                (field) =>
                  device[field] ===
                  "FAIL"
              )
          ).length;

        return {
          ...build,
          totalDevices,
          passed,
          failed,
        };
      }
    );

  // ==========================================
  // EDIT BUILD
  // ==========================================
  const handleEditBuild = (
    build
  ) => {
    console.log(
      "EDITING BUILD:",
      build
    );

    setEditingBuild(build);
    setBuildModalOpen(true);
  };

  // ==========================================
  // DELETE BUILD
  // ==========================================
  const handleDeleteBuild =
    async (build) => {
      const confirmed =
        window.confirm(
          `Are you sure you want to delete Build v${build.version}?`
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteDeviceBuild(
          build.id
        );

        setDeviceBuilds(
          (prev) =>
            prev.filter(
              (item) =>
                item.id !== build.id
            )
        );

        // If the deleted build was
        // currently selected, go back.
        if (
          selectedBuild?.id ===
          build.id
        ) {
          setSelectedBuild(null);
        }

      } catch (error) {
        console.error(
          "Error deleting device build:",
          error
        );

        alert(
          error.message ||
            "Failed to delete device build."
        );
      }
    };

  // ==========================================
  // SAVE BUILD
  // ==========================================
  const handleSaveBuild =
    async (newBuild) => {
      try {
        // ====================================
        // EDIT
        // ====================================
        if (editingBuild) {
          console.log(
            "EDITING EXISTING BUILD:",
            editingBuild
          );

          console.log(
            "NEW VALUES:",
            newBuild
          );

          const updatedBuild =
            await updateDeviceBuild(
              editingBuild.id,
              {
                ...newBuild,
                game: buildGame,
                platform,
              }
            );

          console.log(
            "UPDATED BUILD RETURNED:",
            updatedBuild
          );

          setDeviceBuilds(
            (prev) => {
              return prev.map(
                (build) => {
                  // If the updated build
                  // is now latest, remove
                  // latest from other builds.
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

                  if (
                    build.id ===
                    updatedBuild.id
                  ) {
                    return {
                      ...build,
                      ...updatedBuild,
                    };
                  }

                  return build;
                }
              );
            }
          );

          // Update selected build too
          // if currently viewing it.
          setSelectedBuild(
            (current) => {
              if (
                current?.id ===
                updatedBuild.id
              ) {
                return {
                  ...current,
                  ...updatedBuild,
                };
              }

              return current;
            }
          );
        }

        // ====================================
        // ADD
        // ====================================
        else {
          console.log(
            "ADDING NEW BUILD:",
            newBuild
          );

          const savedBuild =
            await addDeviceBuild({
              ...newBuild,
              game: buildGame,
              platform,
            });

          setDeviceBuilds(
            (prev) => {
              let updatedBuilds =
                prev;

              if (
                savedBuild.latest
              ) {
                updatedBuilds =
                  prev.map(
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
                  );
              }

              return [
                savedBuild,
                ...updatedBuilds,
              ];
            }
          );
        }

        // ====================================
        // CLOSE MODAL
        // ====================================
        setBuildModalOpen(false);
        setEditingBuild(null);

      } catch (error) {
        console.error(
          "Error saving device build:",
          error
        );

        alert(
          error.message ||
            "Failed to save device build."
        );
      }
    };

  // ==========================================
  // LOADING
  // ==========================================
  if (
    loading ||
    buildLoading
  ) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-500">
          Loading device matrix...
        </p>
      </div>
    );
  }

  // ==========================================
  // BUILD DETAILS
  // ==========================================
  if (selectedBuild) {
    return (
      <DeviceBuildDetails
        build={selectedBuild}
        game={game}
        platform={platform}
        deviceTests={deviceTests}
        setDeviceTests={
          setDeviceTests
        }
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
      <div className="mb-8 flex items-end justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Device Matrix
          </h1>

          <p className="mt-2 text-slate-500">
            View device testing results by build.
          </p>
        </div>

        {isDev && (
          <button
            onClick={() => {
              setEditingBuild(null);
              setBuildModalOpen(true);
            }}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Build
          </button>
        )}

      </div>

      {/* ========================================
          BUILD CARDS
      ======================================== */}
      {buildsWithStats.length === 0 ? (

        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
          <p className="font-semibold text-slate-700">
            No builds found.
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Add a build to start device testing.
          </p>
        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {buildsWithStats.map(
            (build) => (
              <DeviceBuildCard
                key={build.id}
                build={build}
                onOpen={() =>
                  setSelectedBuild(
                    build
                  )
                }
                onEdit={() =>
                  handleEditBuild(
                    build
                  )
                }
                onDelete={() =>
                  handleDeleteBuild(
                    build
                  )
                }
              />
            )
          )}

        </div>

      )}

      {/* ========================================
          ADD / EDIT BUILD MODAL
      ======================================== */}
      <DeviceBuildModal
        isOpen={buildModalOpen}
        build={editingBuild}
        game={buildGame}
        platform={platform}
        onClose={() => {
          setBuildModalOpen(false);
          setEditingBuild(null);
        }}
        onSubmit={
          handleSaveBuild
        }
      />

    </div>
  );
}

export default DeviceMatrix;