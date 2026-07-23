import { useEffect, useState } from "react";
import ReportBugModal from "../bugreport/ReportBugModal";
import BugTable from "../bugreport/BugTable";
import BugStats from "../bugreport/BugStats";
import BugDetailsModal from "../bugreport/BugDetailsModal";
import SearchFilters from "../bugreport/SearchFilters";

const initialBugs = [
  {
    id: 1,
    title: "Game crashes when starting level",
    priority: "P0",
    impact: "User Issue",
    device: "iPhone 15 Pro",
    version: "2.5.1",
    status: "Open",
    reporter: "Raily",
    date: "July 21, 2026",
  },

  {
    id: 2,
    title: "Button overlaps on settings page",
    priority: "P2",
    impact: "User Issue",
    device: "Samsung S24",
    version: "2.5.1",
    status: "Fixed",
    reporter: "Raily",
    date: "July 20, 2026",
  },

  {
    id: 3,
    title: "Missing analytics logs",
    priority: "P1",
    impact: "Logging Issue",
    device: "Amazon Fire Tablet",
    version: "2.5.0",
    status: "Pending",
    reporter: "QA Tester",
    date: "July 19, 2026",
  },
];

function BugReports() {
    const [openModal, setOpenModal] = useState(false);
    const [bugs, setBugs] = useState(() => {
      const savedBugs = localStorage.getItem("bugs");

      return savedBugs
        ? JSON.parse(savedBugs)
        : initialBugs;
    });
    
    const [selectedBug, setSelectedBug] = useState(null);
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

  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Bug Reports
          </h1>

          <p className="mt-2 text-slate-500">
            Track and manage reported game issues.
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
      <BugStats bugs={bugs} />


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

      <BugTable
        bugs={filteredBugs}
        onViewBug={(bug) => {
          setSelectedBug(bug);
        }}
      />

        <ReportBugModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          onSubmit={(newBug) => {

              setBugs([
                  ...bugs,
                  newBug
              ]);
              setOpenModal(false);
          }}
      />
      <BugDetailsModal
        bug={selectedBug}
        onClose={() => setSelectedBug(null)}
    />

    </div>
  );
}

export default BugReports;
