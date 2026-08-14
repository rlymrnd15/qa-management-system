import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";

import BugStats from "../bugreport/BugStats";
import BugDetailsModal from "../bugreport/BugDetailsModal";
import SearchFilters from "../bugreport/SearchFilters";

import BuildsGrid from "../build/BuildsGrid";
import BuildDetails from "../build/BuildDetails";

import { formatGameName } from "../../utils/formatGameName";
import AddBuildModal from "../build/AddBuildModal";

import { getBugReports } from "../../services/bugReportService";
import {
  getBuilds,
  addBuild,
} from "../../services/buildService";

function BugReports({
  game,
  platform,
}) {
  const { role } = useAuth();

  const isDev = role === "dev";

  const [bugs, setBugs] = useState([]);
  const [buildList, setBuildList] = useState([]);

  const [loading, setLoading] = useState(true);

  // THIS controls which build is currently open
  const [selectedBuild, setSelectedBuild] = useState(null);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [device, setDevice] = useState("All");

  const [openBuildModal, setOpenBuildModal] = useState(false);

  // Load bugs
  useEffect(() => {
    const loadData = async () => {
      try {
        const [bugData, buildData] = await Promise.all([
          getBugReports(),
          getBuilds(),
        ]);

        console.log("BUGS:", bugData);
console.log("BUILDS:", buildData);
console.log("CURRENT GAME:", game);
console.log("CURRENT PLATFORM:", platform);

        setBugs(bugData);
        setBuildList(buildData);
      } catch (error) {
        console.error("Error loading bug reports/builds:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Bugs for current game + platform
  const gameBugs = bugs.filter(
    (bug) =>
      bug.game === game &&
      bug.platform === platform
  );

  const gameBuilds = buildList.filter(
    (build) =>
      build.game === game &&
      build.platform === platform
  );
  

  // Devices
  const devices = [
    "All",
    ...new Set(
      gameBugs
        .map((bug) => bug.device)
        .filter(Boolean)
    ),
  ];

  // Platform name
  const platformName = {
    ios: "iOS",
    android: "Android",
    amazon: "Amazon",
  }[platform] || platform;

  // Loading
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
  // IF A BUILD IS SELECTED
  // SHOW THAT BUILD'S BUGS
  // ==========================================

  if (selectedBuild) {
    return (
      <BuildDetails
        build={selectedBuild}
        bugs={bugs}
        setBugs={setBugs}
        game={game}
        platform={platform}
        onBack={() => setSelectedBuild(null)}
      />
    );
  }

  // ==========================================
  // OTHERWISE SHOW BUILD CARDS
  // ==========================================

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Bug Reports
          </h1>

          <p className="mt-2 text-slate-500">
            {formatGameName(game)} • {platformName}
          </p>
        </div>

        {isDev && (
          <button
            onClick={() => setOpenBuildModal(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + Add Build
          </button>
        )}
      </div>

      {/* Stats */}
      <BugStats bugs={gameBugs} />

      {/* Filters */}
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

      {/* Build Cards */}
      <BuildsGrid
        builds={gameBuilds}
        bugs={gameBugs}
        onSelectBuild={(build) => {
          console.log("Selected build:", build);
          setSelectedBuild(build);
        }}
      />

      <AddBuildModal
        isOpen={openBuildModal}
        onClose={() => setOpenBuildModal(false)}
        game={game}
        platform={platform}
        onSubmit={async (newBuild) => {
          try {
            const savedBuild = await addBuild({
              ...newBuild,
              game,
              platform,
            });

            setBuildList((prevBuilds) => {
              const updatedBuilds = savedBuild.latest
                ? prevBuilds.map((build) => ({
                    ...build,
                    latest: false,
                  }))
                : prevBuilds;

              return [savedBuild, ...updatedBuilds];
            });

            setOpenBuildModal(false);

          } catch (error) {
            console.error("Error saving build:", error);
            alert("Failed to save build.");
          }
        }}
      />
    </div>
  );
}

export default BugReports;