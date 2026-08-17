import {
  Bug,
  CircleAlert,
  Search,
  Wrench,
  CircleCheckBig,
} from "lucide-react";

function BugStats({ bugs }) {
  const total = bugs.length;

  const open = bugs.filter(
    (bug) => bug.status === "Open"
  ).length;

  const investigation = bugs.filter(
    (bug) => bug.status === "Investigation"
  ).length;

  const ongoingFix = bugs.filter(
    (bug) => bug.status === "Ongoing Fix"
  ).length;

  const resolved = bugs.filter(
    (bug) => bug.status === "Resolved"
  ).length;

  const cards = [
    {
      title: "Total Bugs",
      value: total,
      icon: Bug,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },

    {
      title: "Open",
      value: open,
      icon: CircleAlert,
      color: "text-red-600",
      bg: "bg-red-100",
    },

    {
      title: "Investigation",
      value: investigation,
      icon: Search,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },

    {
      title: "Ongoing Fix",
      value: ongoingFix,
      icon: Wrench,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },

    {
      title: "Resolved",
      value: resolved,
      icon: CircleCheckBig,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow-sm"
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

              <div
                className={`${card.bg} rounded-xl p-3`}
              >
                <Icon
                  className={card.color}
                  size={24}
                />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}

export default BugStats;