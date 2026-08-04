import { useState } from "react";
import BugTable from "../bugreport/BugTable";
import BugDetailsModal from "../bugreport/BugDetailsModal";
import ReportBugModal from "../bugreport/ReportBugModal";

function BuildDetails({
  build,
  bugs,
  setBugs,
  onBack,
}) {

    

  const buildBugs = bugs.filter(
    (bug) => bug.build === build.version
  );

  const [selectedBug, setSelectedBug] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
  return (
    <div>

      <button
        onClick={onBack}
        className="
          mb-8
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-slate-200
          bg-white
          px-5
          py-3
          font-medium
          shadow-sm
          transition
          hover:bg-slate-100
        "
      >
        ← Back to Builds
      </button>

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Build v{build.version}
          </h1>

          <p className="mt-2 text-slate-500">
            Released {build.releaseDate}
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

      <div className="mt-8 grid grid-cols-4 gap-4">

        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="text-sm text-slate-500">
            Total Bugs
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {build.totalBugs}
          </h2>
        </div>

        <div className="rounded-2xl bg-green-50 p-5">
          <p className="text-sm text-green-700">
            Fixed
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {build.fixed}
          </h2>
        </div>

        <div className="rounded-2xl bg-yellow-50 p-5">
          <p className="text-sm text-yellow-700">
            Pending
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {build.pending}
          </h2>
        </div>

        <div className="rounded-2xl bg-red-50 p-5">
          <p className="text-sm text-red-700">
            Open
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {build.open}
          </h2>
        </div>

      </div>
        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">
            Bugs ({buildBugs.length})
          </h2>

          {buildBugs.length === 0 ? (
            <p className="text-slate-500">
              No bugs found for this build.
            </p>
          ) : (
            <BugTable
              bugs={buildBugs}
              onViewBug={(bug) => {
                setSelectedBug(bug);
              }}
            />
          )}

        </div>

        <BugDetailsModal
          bug={selectedBug}
          onClose={() => setSelectedBug(null)}
        />

        <ReportBugModal
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          build={build}
          game={buildBugs[0]?.game}
          platform={buildBugs[0]?.platform}
          onSubmit={(newBug) => {
              setBugs((prevBugs) => [...prevBugs, newBug]);

            setOpenModal(false);
          }}
        />
    </div>
  );
}

export default BuildDetails;