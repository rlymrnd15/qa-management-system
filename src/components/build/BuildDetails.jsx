import { useEffect, useState } from "react";

import ReportBugModal from "../bugreport/ReportBugModal";
import BugStats from "../bugreport/BugStats";
import BugDetailsModal from "../bugreport/BugDetailsModal";
import SearchFilters from "../bugreport/SearchFilters";

import BuildsGrid from "../build/BuildsGrid";
import BuildDetails from "../build/BuildDetails";

import { formatGameName } from "../../utils/formatGameName";

import {
  getBugReports,
} from "../../services/bugReportService";

import initialBuilds from "../../data/builds";

function BugReports({
  game,
  platform,
}) {
  const [bugs, setBugs] = useState([]);
  const [buildList, setBuildList] = useState(initialBuilds);

  const [loading, setLoading] = useState(true);

  const [selectedBug, setSelectedBug] = useState(null);

  const [selectedBuild, setSelectedBuild] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [device, setDevice] = useState("All");

  // ==============================
  // LOAD BUGS FROM FIRESTORE
  // ==============================

  useEffect(() => {
    const loadBugs = async () => {
      try {
        const data = await getBugReports();

        setBugs(data);
      } catch (error) {
        console.error(
          "Error loading bug reports:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadBugs();
  }, []);

  // ==============================
  // ONLY CURRENT GAME + PLATFORM
  // ==============================

  const gameBugs = bugs.filter(
    (bug) =>
      bug.game === game &&
      bug.platform === platform
  );

  // ==============================
  // SEARCH + FILTERS
  // ==============================

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
  // DEVICE FILTER OPTIONS
  // ==============================

  const devices = [
    "All",
    ...new Set(
      gameBugs
        .map((bug) => bug.device)
        .filter(Boolean)
    ),
  ];

  // ==============================
  // PLATFORM NAME
  // ==============================

  const platformName = {
    ios: "iOS",
    android: "Android",
    amazon: "Amazon",
  }[platform] || platform;

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

  // ==============================
  // BUILD DETAILS PAGE
  // ==============================

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
  // BUILD CARDS PAGE
  // ==============================

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

      </div>

      {/* STATS */}
      <BugStats bugs={gameBugs} />

      {/* SEARCH + FILTERS */}
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
        onSelectBuild={setSelectedBuild}
      />

      {/* BUG DETAILS */}
      <BugDetailsModal
        bug={selectedBug}
        onClose={() =>
          setSelectedBug(null)
        }
      />

      {/* REPORT BUG MODAL */}
      <ReportBugModal
        isOpen={openModal}
        game={game}
        platform={platform}
        onClose={() =>
          setOpenModal(false)
        }
        onSubmit={() =>
          setOpenModal(false)
        }
      />

    </div>
  );
}

export default BugReports;