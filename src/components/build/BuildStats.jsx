import {
  Package,
  Rocket,
  Bug,
  CircleAlert,
} from "lucide-react";

function BuildStats({ builds }) {
  const totalBuilds = builds.length;

  const latestBuild =
    builds.find((build) => build.latest)?.version || "-";

  const totalBugs = builds.reduce(
    (sum, build) => sum + build.totalBugs,
    0
  );

  const openBugs = builds.reduce(
    (sum, build) => sum + build.open,
    0
  );

  const cards = [
    {
      title: "Total Builds",
      value: totalBuilds,
      icon: <Package size={24} />,
    },
    {
      title: "Latest Build",
      value: `v${latestBuild}`,
      icon: <Rocket size={24} />,
    },
    {
      title: "Total Bugs",
      value: totalBugs,
      icon: <Bug size={24} />,
    },
    {
      title: "Open Bugs",
      value: openBugs,
      icon: <CircleAlert size={24} />,
    },
  ];

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

      {cards.map((card) => (

        <div
          key={card.title}
          className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {card.value}
              </h2>

            </div>

            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              {card.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default BuildStats;