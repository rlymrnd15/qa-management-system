import { useEffect, useState } from "react";
import ReportBugModal from "../bugreport/ReportBugModal";
import BugTable from "../bugreport/BugTable";
import BugStats from "../bugreport/BugStats";
import BugDetailsModal from "../bugreport/BugDetailsModal";
import SearchFilters from "../bugreport/SearchFilters";
import { formatGameName } from "../../utils/formatGameName";
import BuildCard from "../build/BuildCard";
import BuildsGrid from "../build/BuildsGrid";
import BuildStats from "../build/BuildStats";
import BuildDetails from "../build/BuildDetails";
import builds from "../../data/builds";
import initialBugs from "../../data/bugs";

function BugReports({
  game,
  platform,
}) {
    const [openModal, setOpenModal] = useState(false);
    const [bugs, setBugs] = useState(initialBugs);
    
    const [selectedBug, setSelectedBug] = useState(null);
    const [editingBug, setEditingBug] = useState(null);
    const [selectedBuild, setSelectedBuild] = useState(null);
    const [search, setSearch] = useState("");
    const [priority, setPriority] = useState("All");
    const [status, setStatus] = useState("All");
    const [device, setDevice] = useState("All");

    useEffect(() => {
      localStorage.setItem("bugs", JSON.stringify(bugs));
    }, [bugs]);

    const filteredBugs = bugs.filter((bug) => {
      const matchesSearch = bug.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPriority =
        priority === "All" || bug.priority === priority;

      const matchesStatus =
        status === "All" || bug.status === status;

      const matchesDevice =
        device === "All" || bug.device === device;

      return (
        matchesSearch &&
        matchesPriority &&
        matchesStatus &&
        matchesDevice
      );
    });
  
    const devices = [
    "All",
    ...new Set(bugs.map((bug) => bug.device)),
  ];
const platformName = {
    ios: "iOS",
    android: "Android",
    amazon: "Amazon",
  }[platform] || platform;
  

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


        <button
            onClick={() => setOpenModal(true)}
            className="
                rounded-xl
                bg-blue-600
                px-5
                py-3
                font-semibold
                text-white
                hover:bg-blue-700
            "
            >
            + Report Bug
        </button>

      </div>

      {/* Stats */}
      <BuildStats builds={builds} />


      {/* Search and Filters */}
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

      {selectedBuild ? (
        <BuildDetails
          build={selectedBuild}
          bugs={bugs}
          onBack={() => setSelectedBuild(null)}
        />
      ) : (
        <BuildsGrid
          builds={builds}
          onSelectBuild={setSelectedBuild}
        />
      )}

        <ReportBugModal
          isOpen={openModal}
          bug={editingBug}
          onClose={() => {
            setOpenModal(false);
            setEditingBug(null);
          }}
          onSubmit={(newBug) => {
            if (editingBug) {
              setBugs(
                bugs.map((bug) =>
                  bug.id === newBug.id ? newBug : bug
                )
              );
            } else {
              setBugs([...bugs, newBug]);
            }

            setOpenModal(false);
            setEditingBug(null);
          }}
        />

      <BugDetailsModal
        bug={selectedBug}
        onClose={() => setSelectedBug(null)}
        onEdit={(bug) => {
          setSelectedBug(null);
          setEditingBug(bug);
          setOpenModal(true);
        }}
        onDelete={(bug) => {
          const confirmed = window.confirm(
            `Are you sure you want to delete "${bug.title}"?`
          );

          if (!confirmed) return;

          setBugs((prevBugs) =>
            prevBugs.filter((item) => item.id !== bug.id)
          );

          setSelectedBug(null);
        }}
      />
    </div>
  );
}

export default BugReports;
