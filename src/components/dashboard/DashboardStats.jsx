import {
  Bug,
  CircleAlert,
  CircleCheck,
  Package,
} from "lucide-react";

function DashboardStats({
  bugs = [],
  builds = [],
}) {
  // ==========================================
  // TOTAL BUGS
  // ==========================================
  const total = bugs.length;

  // ==========================================
  // OPEN BUGS
  // ==========================================
  const open = bugs.filter(
    (bug) => bug.status === "Open"
  ).length;

  // ==========================================
  // CLOSED / FIXED BUGS
  // ==========================================
  const fixed = bugs.filter(
    (bug) =>
      bug.status === "Fixed" ||
      bug.status === "Closed"
  ).length;

  return (
    <div className="grid gap-5 md:grid-cols-4">

      {/* ========================================
          TOTAL BUGS
      ======================================== */}
      <Card
        icon={<Bug size={24} />}
        title="Total Bugs"
        value={total}
      />

      {/* ========================================
          OPEN BUGS
      ======================================== */}
      <Card
        icon={<CircleAlert size={24} />}
        title="Open Bugs"
        value={open}
      />

      {/* ========================================
          FIXED BUGS
      ======================================== */}
      <Card
        icon={<CircleCheck size={24} />}
        title="Fixed Bugs"
        value={fixed}
      />

      {/* ========================================
          BUILDS
      ======================================== */}
      <Card
        icon={<Package size={24} />}
        title="Builds"
        value={builds.length}
      />

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-3 text-blue-600">
        {icon}
      </div>

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-bold">
        {value}
      </h2>

    </div>
  );
}

export default DashboardStats;