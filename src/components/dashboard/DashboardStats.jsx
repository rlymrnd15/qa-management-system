import {
  Bug,
  CircleAlert,
  CircleCheck,
  Package,
} from "lucide-react";

function DashboardStats({
  bugs,
  builds,
}) {

  const total = bugs.length;

  const open = bugs.filter(
    (bug) => bug.status === "Open"
  ).length;

  const fixed = bugs.filter(
    (bug) => bug.status === "Fixed"
  ).length;

  return (
    <div className="grid gap-5 md:grid-cols-4">

      <Card
        icon={<Bug />}
        title="Total Bugs"
        value={total}
      />

      <Card
        icon={<CircleAlert />}
        title="Open Bugs"
        value={open}
      />

      <Card
        icon={<CircleCheck />}
        title="Fixed Bugs"
        value={fixed}
      />

      <Card
        icon={<Package />}
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