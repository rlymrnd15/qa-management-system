import { useEffect, useState } from "react";

import BugStats from "../bugreport/BugStats";
import SearchFilters from "../bugreport/SearchFilters";
import BuildsGrid from "../build/BuildsGrid";
import BuildDetails from "../build/BuildDetails";
import ReportBugModal from "../bugreport/ReportBugModal";
import AddBuildModal from "../build/AddBuildModal";

import { formatGameName } from "../../utils/formatGameName";

import {
  getBugReports,
  addBugReport,
} from "../../services/bugReportService";

import initialBuilds from "../../data/builds";

function BugReports({ game, platform }) {
  const [bugs, setBugs] = useState([]);
  const [buildList, setBuildList] = useState(initialBuilds);

  const [loading, setLoading] = useState(true);

  // IMPORTANT
  const [selectedBuild, setSelectedBuild] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openBuildModal, setOpenBuildModal] = useState(false);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [device, setDevice] = useState("All");

  // ==============================
  // LOAD BUGS
  // ==============================

  useEffect(() => {
    const loadBugs = async () => {
      try {
        const data = await getBugReports();
        setBugs(data);
      } catch (error) {
        console.error("Error loading bug reports:", error);
      } finally {
        setLoading(false);
      }
    };

    loadBugs();
  }, []);

  // ==============================
  // RESET SELECTED BUILD
  // ONLY WHEN GAME/PLATFORM CHANGES
  // ==============================

  useEffect(() => {
    setSelectedBuild(null);
  }, [game, platform]);

  // ==============================
  // GAME + PLATFORM BUGS
  // ==============================

  const gameBugs = bugs.filter(
    (bug) =>
      bug.game === game &&
      bug.platform === platform
  );

  // ==============================
  // FILTERS
  // ==============================

  const devices = [
    "All",
    ...new Set(
      gameBugs
        .map((bug) => bug.device)
        .filter(Boolean)
    ),
  ];

  const filteredBugs = gameBugs.filter((bug) => {
    const matchesSearch = (bug.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPriority =
      priority === "All" ||
      bug.priority === priority;

    const matchesStatus =
      status === "All" ||
      bug.status === status;

    const matchesDevice =
      device === "All" ||
      bug.device === device;

    return (
      matchesSearch &&
      matchesPriority &&
      matchesStatus &&
      matchesDevice
    );
  });

  // ==============================
  // ADD BUILD
  // ==============================

  const handleAddBuild = (newBuild) => {
    setBuildList((prevBuilds) => {
      let updatedBuilds;

      if (newBuild.latest) {
        updatedBuilds = prevBuilds.map((build) => ({
          ...build,
          latest: false,
        }));
      } else {
        updatedBuilds = [...prevBuilds];
      }

      return [
        newBuild,
        ...updatedBuilds,
      ];
    });

    setOpenBuildModal(false);
  };

  // ==============================
  // ADD BUG
  // ==============================

  const handleAddBug = async (newBug) => {
    try {
      const savedBug = await addBugReport({
        ...newBug,
        game,
        platform,
      });

      setBugs((prevBugs) => [
        savedBug,
        ...prevBugs,
      ]);

      setOpenModal(false);
    } catch (error) {
      console.error(
        "Error saving bug report:",
        error
      );

      alert("Failed to save bug report.");
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-500">
          Loading bug reports...
        </p>
      </div>
    );
  }

  // ==================================================
  // ⭐ BUILD DETAILS
  // THIS MUST COME BEFORE THE BUILD CARDS RETURN
  // ==================================================

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

  // ==============================
  // NORMAL BUILD CARDS PAGE
  // ==============================

  const platformName =
    {
      ios: "iOS",
      android: "Android",
      amazon: "Amazon",
    }[platform] || platform;

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Bug Reports
          </h1>

          <p className="mt-2 text-slate-500">
            {formatGameName(game)} • {platformName}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpenBuildModal(true)}
          className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Add Build
        </button>

      </div>

      {/* STATS */}
      <BugStats bugs={gameBugs} />

      {/* FILTERS */}
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

      {/* BUILD CARDS */}
      <BuildsGrid
        builds={buildList}
        bugs={gameBugs}
        onSelectBuild={(build) => {
          console.log("CLICKED BUILD:", build);

          setSelectedBuild(build);
        }}
      />

      {/* REPORT BUG */}
      <ReportBugModal
        isOpen={openModal}
        game={game}
        platform={platform}
        onClose={() => setOpenModal(false)}
        onSubmit={handleAddBug}
      />

      {/* ADD BUILD */}
      <AddBuildModal
        isOpen={openBuildModal}
        onClose={() => setOpenBuildModal(false)}
        onSubmit={handleAddBuild}
      />

    </div>
  );
}

export default BugReports;