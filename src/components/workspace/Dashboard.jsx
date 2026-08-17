import { useEffect, useState } from "react";

import DashboardStats from "../dashboard/DashboardStats";
import PriorityChart from "../dashboard/PriorityChart";
import RecentBugs from "../dashboard/RecentBugs";

import { getBugReports } from "../../services/bugReportService";

import {
  getDeviceBuilds,
} from "../../services/deviceBuildService";

import { formatGameName } from "../../utils/formatGameName";

function Dashboard({
  game,
  platform,
}) {
  const [bugs, setBugs] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // NORMALIZE GAME
  // ==========================================
  // UI uses "snake-io"
  // Firestore uses "snake"
  const buildGame =
    game === "snake-io"
      ? "snake"
      : game;

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);

        const [
          bugData,
          buildData,
        ] = await Promise.all([
          getBugReports(),
          getDeviceBuilds(),
        ]);

        console.log(
          "DASHBOARD BUG DATA:",
          bugData
        );

        console.log(
          "DASHBOARD BUILD DATA:",
          buildData
        );

        setBugs(bugData);
        setBuilds(buildData);

      } catch (error) {
        console.error(
          "Error loading dashboard data:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();

  }, [game, platform]);

  // ==========================================
  // FILTER BUGS
  // ==========================================
  const gameBugs = bugs.filter(
    (bug) =>
      bug.game === game &&
      bug.platform === platform
  );

  // ==========================================
  // FILTER BUILDS
  // ==========================================
  const gameBuilds =
    builds.filter(
      (build) =>
        build.game === buildGame &&
        build.platform === platform
    );

  // ==========================================
  // DEBUG
  // ==========================================
  console.log(
    "DASHBOARD GAME:",
    game
  );

  console.log(
    "DASHBOARD NORMALIZED GAME:",
    buildGame
  );

  console.log(
    "DASHBOARD PLATFORM:",
    platform
  );

  console.log(
    "DASHBOARD BUGS:",
    gameBugs
  );

  console.log(
    "DASHBOARD BUILDS:",
    gameBuilds
  );

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
          Loading dashboard...
        </p>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD
  // ==========================================
  return (
    <div>

      {/* ========================================
          HEADER
      ======================================== */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          QA Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          {formatGameName(game)} •{" "}
          {platformName}
        </p>

      </div>

      {/* ========================================
          STATS
      ======================================== */}
      <DashboardStats
        builds={gameBuilds}
        bugs={gameBugs}
      />

      {/* ========================================
          CHARTS / RECENT BUGS
      ======================================== */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <PriorityChart
          bugs={gameBugs}
        />

        <RecentBugs
          bugs={gameBugs}
        />

      </div>

    </div>
  );
}

export default Dashboard;