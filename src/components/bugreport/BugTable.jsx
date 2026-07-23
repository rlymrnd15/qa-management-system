function BugTable({ bugs, onViewBug }) {
  return (
    <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
      <table className="w-full">

        <thead className="border-b bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Issue Title
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Priority
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Impact
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Device
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Version
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>
          </tr>
        </thead>

        <tbody>

          {bugs.map((bug) => (

            <tr
              key={bug.id}
              onClick={() => onViewBug(bug)}
              className="cursor-pointer border-b transition hover:bg-slate-50"
            >

              <td className="px-6 py-4">
                {bug.title}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`
                    rounded-full px-3 py-1 text-sm font-semibold
                    ${
                      bug.priority === "P0"
                        ? "bg-red-100 text-red-600"
                        : bug.priority === "P1"
                        ? "bg-orange-100 text-orange-600"
                        : "bg-yellow-100 text-yellow-600"
                    }
                  `}
                >
                  {bug.priority}
                </span>

              </td>

              <td className="px-6 py-4">
                {bug.impact}
              </td>

              <td className="px-6 py-4">
                {bug.device}
              </td>

              <td className="px-6 py-4">
                {bug.version}
              </td>

              <td className="px-6 py-4">
                {bug.status}
              </td>

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}

export default BugTable;