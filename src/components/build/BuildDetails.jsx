import { useState } from "react";

import BugTable from "../bugreport/BugTable";
import BugDetailsModal from "../bugreport/BugDetailsModal";
import ReportBugModal from "../bugreport/ReportBugModal";
import { useAuth } from "../../context/AuthContext";

import {
  addBugReport,
  updateBugReport,
  deleteBugReport,
} from "../../services/bugReportService";

function BuildDetails({
  build,
  bugs,
  setBugs,
  onBack,
  game,
  platform,
}) {
  const { role } = useAuth();
  const isDev = role?.toLowerCase() === "dev";

  const [selectedBug, setSelectedBug] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [editingBug, setEditingBug] = useState(null);

  console.log("BUILD DETAILS RECEIVED:", build);
  console.log("ALL BUGS:", bugs);
  console.log("GAME:", game);
  console.log("PLATFORM:", platform);

  // ==========================================
  // BUGS FOR THIS BUILD
  // ==========================================

  const buildBugs = bugs.filter(
    (bug) =>
      String(bug.build) === String(build.version) &&
      bug.game === game &&
      bug.platform === platform
  );

  console.log("BUGS FOR THIS BUILD:", buildBugs);

  // ==========================================
  // BUG STATUS COUNTS
  // ==========================================

  const totalBugs = buildBugs.length;

  const open = buildBugs.filter(
    (bug) => bug.status === "Open"
  ).length;

  const resolved = buildBugs.filter(
    (bug) => bug.status === "Resolved"
  ).length;

  const investigation = buildBugs.filter(
    (bug) => bug.status === "Investigation"
  ).length;

  const ongoingFix = buildBugs.filter(
    (bug) => bug.status === "Ongoing Fix"
  ).length;

  const notABug = buildBugs.filter(
    (bug) => bug.status === "Not a Bug"
  ).length;

  // ==========================================
  // ADD / EDIT BUG
  // ==========================================

  const handleSubmit = async (newBug) => {
    try {
      console.log("HANDLE SUBMIT:", newBug);
      console.log(
        "EDITING BUG AT SUBMIT:",
        editingBug
      );

      if (editingBug) {
        // EDIT
        const updatedBug = await updateBugReport(
          editingBug.id,
          {
            ...newBug,
            game,
            platform,
            build: build.version,
          }
        );

        setBugs((prev) =>
          prev.map((bug) =>
            bug.id === editingBug.id
              ? updatedBug
              : bug
          )
        );

      } else {
        // ADD
        const savedBug = await addBugReport({
          ...newBug,
          game,
          platform,
          build: build.version,
        });

        setBugs((prev) => [
          savedBug,
          ...prev,
        ]);
      }

      setOpenModal(false);
      setEditingBug(null);

    } catch (error) {
      console.error(
        "Error saving bug:",
        error
      );

      alert(
        "Failed to save bug report."
      );
    }
  };

  // ==========================================
  // DEVELOPER UPDATE
  // ==========================================

  const handleUpdateDeveloperChanges = async (
    updatedBug
  ) => {
    try {
      const savedBug =
        await updateBugReport(
          updatedBug.id,
          updatedBug
        );

      setBugs((prev) =>
        prev.map((bug) =>
          bug.id === savedBug.id
            ? savedBug
            : bug
        )
      );

      setSelectedBug(savedBug);

    } catch (error) {
      console.error(
        "Error updating developer changes:",
        error
      );

      alert(
        "Failed to update developer changes."
      );
    }
  };

  // ==========================================
  // DELETE BUG
  // ==========================================

  const handleDelete = async (bug) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${bug.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteBugReport(
        bug.id
      );

      setBugs((prev) =>
        prev.filter(
          (item) =>
            item.id !== bug.id
        )
      );

      setSelectedBug(null);

    } catch (error) {
      console.error(
        "Error deleting bug:",
        error
      );

      alert(
        "Failed to delete bug report."
      );
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div>

      {/* BACK */}
      <button
        onClick={onBack}
        className="
          mb-8
          rounded-xl
          border
          border-slate-200
          bg-white
          px-5
          py-3
          font-medium
          shadow-sm
          hover:bg-slate-100
        "
      >
        ← Back to Builds
      </button>

      {/* HEADER */}
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
          onClick={() => {
            setEditingBug(null);
            setOpenModal(true);
          }}
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

      {/* ========================================
          STATS
      ======================================== */}

      <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">

        {/* TOTAL */}
        <div className="rounded-2xl bg-slate-100 p-5">
          <p className="text-sm text-slate-500">
            Total Bugs
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {totalBugs}
          </h2>
        </div>

        {/* OPEN */}
        <div className="rounded-2xl bg-blue-50 p-5">
          <p className="text-sm text-blue-700">
            Open
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {open}
          </h2>
        </div>

        {/* INVESTIGATION */}
        <div className="rounded-2xl bg-yellow-50 p-5">
          <p className="text-sm text-yellow-700">
            Investigation
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {investigation}
          </h2>
        </div>

        {/* ONGOING FIX */}
        <div className="rounded-2xl bg-orange-50 p-5">
          <p className="text-sm text-orange-700">
            Ongoing Fix
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {ongoingFix}
          </h2>
        </div>

        {/* RESOLVED */}
        <div className="rounded-2xl bg-green-50 p-5">
          <p className="text-sm text-green-700">
            Resolved
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {resolved}
          </h2>
        </div>

        {/* NOT A BUG */}
        <div className="rounded-2xl bg-slate-50 p-5">
          <p className="text-sm text-slate-600">
            Not a Bug
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {notABug}
          </h2>
        </div>

      </div>

      {/* ========================================
          BUG LIST
      ======================================== */}

      <div className="mt-10">

        <h2 className="mb-4 text-2xl font-bold">
          Bugs ({buildBugs.length})
        </h2>

        {buildBugs.length === 0 ? (

          <div className="
            rounded-2xl
            border
            border-slate-200
            bg-white
            p-8
            text-center
          ">

            <p className="font-semibold text-slate-700">
              No bugs found for this build.
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Click "+ Report Bug" to add a bug
              to Build v{build.version}.
            </p>

          </div>

        ) : (

          <BugTable
            bugs={buildBugs}
            onViewBug={(bug) => {
              setSelectedBug(bug);
            }}
          />

        )}

      </div>

      {/* ========================================
          BUG DETAILS
      ======================================== */}

      <BugDetailsModal
        bug={selectedBug}
        build={build}
        builds={[build]}
        onClose={() =>
          setSelectedBug(null)
        }
        isDev={isDev}
        onUpdate={
          handleUpdateDeveloperChanges
        }
        onEdit={(bug) => {
          setSelectedBug(null);
          setEditingBug(bug);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* ========================================
          REPORT BUG
      ======================================== */}

      <ReportBugModal
        isOpen={openModal}
        bug={editingBug}
        build={build}
        game={game}
        platform={platform}
        onClose={() => {
          setOpenModal(false);
          setEditingBug(null);
        }}
        onSubmit={handleSubmit}
      />

    </div>
  );
}

export default BuildDetails;