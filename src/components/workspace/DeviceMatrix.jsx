import { useEffect, useState } from "react";

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
  const [selectedBuild, setSelectedBuild] = useState(null);

  // Device tests loaded from Firestore
  const [deviceTests, setDeviceTests] = useState([]);

  // Device builds loaded from Firestore
  const [deviceBuilds, setDeviceBuilds] = useState([]);

  // Loading states
  const [loading, setLoading] = useState(true);
  const [buildLoading, setBuildLoading] = useState(true);

  // Build modal
  const [buildModalOpen, setBuildModalOpen] = useState(false);
  const [editingBuild, setEditingBuild] = useState(null);

  // Load device tests
  useEffect(() => {
    const loadDeviceTests = async () => {
      try {
        const data = await getDeviceTests();
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

  // Load device builds
  useEffect(() => {
    const loadBuilds = async () => {
      try {
        const data = await getDeviceBuilds();

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

  console.log("Selected game:", game);
  console.log("Selected platform:", platform);
  console.log("Firestore builds:", deviceBuilds);

  // Convert project slug to Firestore game value
  const buildGame =
    game === "snake-io"
      ? "snake"
      : game;

  // Only show builds for selected game + platform
  const filteredBuilds = deviceBuilds.filter(
    (build) =>
      build.game === buildGame &&
      build.platform === platform
  );

  // Calculate statistics
  const buildsWithStats = filteredBuilds.map(
    (build) => {
      const buildDevices = deviceTests.filter(
        (device) =>
          device.game === buildGame &&
          device.platform === platform &&
          device.build === build.version
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
        buildDevices.filter((device) => {
          const hasFail =
            testFields.some(
              (field) =>
                device[field] === "FAIL"
            );

          return (
            device.progress === 100 &&
            !hasFail
          );
        }).length;

      const failed =
        buildDevices.filter((device) =>
          testFields.some(
            (field) =>
              device[field] === "FAIL"
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

  const handleEditBuild = (build) => {
    setEditingBuild(build);
    setBuildModalOpen(true);
  };

  const handleDeleteBuild = async (build) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete Build v${build.version}?`
    );

    if (!confirmed) return;

    try {
      await deleteDeviceBuild(build.id);

      setDeviceBuilds((prev) =>
        prev.filter((item) => item.id !== build.id)
      );
    } catch (error) {
      console.error(
        "Error deleting device build:",
        error
      );

      alert("Failed to delete device build.");
    }
  };


  // Loading screen
  if (loading || buildLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-500">
          Loading device matrix...
        </p>
      </div>
    );
  }

  // If a build is selected
  if (selectedBuild) {
    return (
      <DeviceBuildDetails
        build={selectedBuild}
        game={game}
        platform={platform}
        deviceTests={deviceTests}
        setDeviceTests={setDeviceTests}
        onBack={() =>
          setSelectedBuild(null)
        }
      />
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex items-end justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Device Matrix
          </h1>

          <p className="mt-2 text-slate-500">
            View device testing results by build.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingBuild(null);
            setBuildModalOpen(true);
          }}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Add Build
        </button>

      </div>

      {/* Build Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {buildsWithStats.map(
          (build) => (
            <DeviceBuildCard
              key={build.id}
              build={build}
              onOpen={() =>
                setSelectedBuild(build)
              }
              onEdit={() =>
                handleEditBuild(build)
              }
              onDelete={() =>
                handleDeleteBuild(build)
              }
            />
          )
        )}

      </div>

      {/* Add / Edit Build Modal */}
      <DeviceBuildModal
        isOpen={buildModalOpen}
        build={editingBuild}
        game={buildGame}
        platform={platform}
        onClose={() => {
          setBuildModalOpen(false);
          setEditingBuild(null);
        }}
        onSubmit={async (newBuild) => {
          try {
            if (editingBuild) {
              // EDIT BUILD
              const updatedBuild = await updateDeviceBuild(
                editingBuild.id,
                {
                  ...newBuild,
                  game: buildGame,
                  platform: platform,
                }
              );

              setDeviceBuilds((prev) =>
                prev.map((build) => {
                  // If the edited build is now Latest,
                  // remove Latest from other builds
                  // of the same game + platform.
                  if (
                    updatedBuild.latest &&
                    build.game === buildGame &&
                    build.platform === platform &&
                    build.id !== updatedBuild.id
                  ) {
                    return {
                      ...build,
                      latest: false,
                    };
                  }

                  return build.id === updatedBuild.id
                    ? updatedBuild
                    : build;
                })
              );

            } else {
              // ADD BUILD
              const savedBuild = await addDeviceBuild({
                ...newBuild,
                game: buildGame,
                platform: platform,
              });

              setDeviceBuilds((prev) => {
                const updatedBuilds = prev.map((build) => {
                  // If the new build is Latest,
                  // remove Latest from other builds
                  // of the same game + platform.
                  if (
                    savedBuild.latest &&
                    build.game === buildGame &&
                    build.platform === platform
                  ) {
                    return {
                      ...build,
                      latest: false,
                    };
                  }

                  return build;
                });

                return [savedBuild, ...updatedBuilds];
              });
            }

            setBuildModalOpen(false);
            setEditingBuild(null);

          } catch (error) {
            console.error(
              "Error saving device build:",
              error
            );

            alert("Failed to save device build.");
          }
        }}
      />

    </div>
  );
}

export default DeviceMatrix;
