import { useEffect, useState } from "react";

import DashboardStats from "../dashboard/DashboardStats";
import PriorityChart from "../dashboard/PriorityChart";
import RecentBugs from "../dashboard/RecentBugs";

import { getBugReports } from "../../services/bugReportService";
import { getBuilds } from "../../services/buildService";

function Dashboard() {
  const [bugs, setBugs] = useState([]);
  const [builds, setBuilds] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-500">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          QA Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Overview of builds and bug reports
        </p>
      </div>

      {/* Stats */}
      <DashboardStats
        builds={builds}
        bugs={bugs}
      />

      {/* Charts / Recent Bugs */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <PriorityChart bugs={bugs} />

        <RecentBugs bugs={bugs} />

      </div>

    </div>
  );
}

export default Dashboard;