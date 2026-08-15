import { useEffect, useState } from "react";

import DashboardStats from "../dashboard/DashboardStats";
import PriorityChart from "../dashboard/PriorityChart";
import RecentBugs from "../dashboard/RecentBugs";

import { getBugReports } from "../../services/bugReportService";
import { getBuilds } from "../../services/buildService";

import { formatGameName } from "../../utils/formatGameName";

function Dashboard({
  game,
  platform,
}) {
  const [bugs, setBugs] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [bugData, buildData] = await Promise.all([
          getBugReports(),
          getBuilds(),
        ]);

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
  }, []);

  // ==========================================
  // FILTER BY CURRENT GAME + PLATFORM
  // ==========================================

  const gameBugs = bugs.filter(
    (bug) =>
      bug.game === game &&
      bug.platform === platform
  );

  const gameBuilds = builds.filter(
    (build) =>
      build.game === game &&
      build.platform === platform
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
  // DEBUG
  // ==========================================

  console.log("DASHBOARD GAME:", game);
  console.log("DASHBOARD PLATFORM:", platform);
  console.log("DASHBOARD BUGS:", gameBugs);
  console.log("DASHBOARD BUILDS:", gameBuilds);

  // ==========================================
  // DASHBOARD
  // ==========================================

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          QA Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          {formatGameName(game)} •{" "}
          {platform === "ios"
            ? "iOS"
            : platform === "android"
            ? "Android"
            : platform === "amazon"
            ? "Amazon"
            : platform}
        </p>
      </div>

      {/* Stats */}
      <DashboardStats
        builds={gameBuilds}
        bugs={gameBugs}
      />

      {/* Charts / Recent Bugs */}
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