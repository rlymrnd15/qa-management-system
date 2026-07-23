import {
  Bug,
  CircleAlert,
  CircleCheckBig,
  Clock3,
} from "lucide-react";

function BugStats({ bugs }) {
  const total = bugs.length;

  const open = bugs.filter(
    (bug) => bug.status === "Open"
  ).length;

  const fixed = bugs.filter(
    (bug) => bug.status === "Fixed"
  ).length;

  const pending = bugs.filter(
    (bug) => bug.status === "Pending"
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
      title: "Fixed",
      value: fixed,
      icon: CircleCheckBig,
      color: "text-green-600",
      bg: "bg-green-100",
    },

    {
      title: "Pending",
      value: pending,
      icon: Clock3,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
  ];

  return (
    <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">

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