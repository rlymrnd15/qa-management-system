import DashboardStats from "../dashboard/DashboardStats";
import PriorityChart from "../dashboard/PriorityChart";
import RecentBugs from "../dashboard/RecentBugs";

import builds from "../../data/builds";
import bugs from "../../data/bugs";

function Dashboard() {
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

      <DashboardStats
        builds={builds}
        bugs={bugs}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <PriorityChart bugs={bugs} />

        <RecentBugs bugs={bugs} />

      </div>

    </div>
  );
}

export default Dashboard;