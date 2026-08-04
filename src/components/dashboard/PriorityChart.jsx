function PriorityChart({ bugs }) {

  const p0 = bugs.filter(
    (bug) => bug.priority === "P0"
  ).length;

  const p1 = bugs.filter(
    (bug) => bug.priority === "P1"
  ).length;

  const p2 = bugs.filter(
    (bug) => bug.priority === "P2"
  ).length;

  const priorities = [
    {
      label: "P0",
      count: p0,
      color: "bg-red-500",
    },
    {
      label: "P1",
      count: p1,
      color: "bg-orange-500",
    },
    {
      label: "P2",
      count: p2,
      color: "bg-yellow-500",
    },
  ];

  const max = Math.max(p0, p1, p2, 1);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Bugs by Priority
      </h2>

      <div className="space-y-5">

        {priorities.map((item) => (

          <div key={item.label}>

            <div className="mb-2 flex justify-between">

              <span className="font-semibold">
                {item.label}
              </span>

              <span>
                {item.count}
              </span>

            </div>

            <div className="h-4 rounded-full bg-slate-200">

              <div
                className={`h-4 rounded-full ${item.color}`}
                style={{
                  width: `${(item.count / max) * 100}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PriorityChart;