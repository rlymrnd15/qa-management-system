function RecentBugs({ bugs }) {
  const recentBugs = [...bugs]
    .reverse()
    .slice(0, 5);

  const priorityColor = {
    P0: "bg-red-100 text-red-700",
    P1: "bg-orange-100 text-orange-700",
    P2: "bg-yellow-100 text-yellow-700",
  };

  const statusColor = {
    Open: "bg-red-100 text-red-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Closed: "bg-green-100 text-green-700",
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold">
        Recent Bugs
      </h2>

      <div className="space-y-4">

        {recentBugs.map((bug) => (

          <div
            key={bug.id}
            className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50 transition"
          >

            <div className="mb-3 flex items-center justify-between">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityColor[bug.priority]}`}
              >
                {bug.priority}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor[bug.status]}`}
              >
                {bug.status}
              </span>

            </div>

            <h3 className="font-semibold text-slate-800">
              {bug.title}
            </h3>

            <div className="mt-3 space-y-1 text-sm text-slate-500">

              <p>📱 {bug.device}</p>

              <p>🏷️ Build {bug.version}</p>

              <p>📅 {bug.date}</p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default RecentBugs;