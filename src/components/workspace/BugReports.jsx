import { useState } from "react";
import ReportBugModal from "../bugreport/ReportBugModal";

const bugs = [
  {
    id: 1,
    title: "Game crashes when starting level",
    priority: "P0",
    impact: "User Issue",
    device: "iPhone 15 Pro",
    version: "2.5.1",
    status: "Open",
    reporter: "Raily",
    date: "July 21, 2026",
  },

  {
    id: 2,
    title: "Button overlaps on settings page",
    priority: "P2",
    impact: "User Issue",
    device: "Samsung S24",
    version: "2.5.1",
    status: "Fixed",
    reporter: "Raily",
    date: "July 20, 2026",
  },

  {
    id: 3,
    title: "Missing analytics logs",
    priority: "P1",
    impact: "Logging Issue",
    device: "Amazon Fire Tablet",
    version: "2.5.0",
    status: "Pending",
    reporter: "QA Tester",
    date: "July 19, 2026",
  },
];

function BugReports() {
    const [openModal, setOpenModal] = useState(false);

  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Bug Reports
          </h1>

          <p className="mt-2 text-slate-500">
            Track and manage reported game issues.
          </p>
        </div>


        <button
            onClick={() => setOpenModal(true)}
            className="
                rounded-xl
                bg-blue-600
                px-5
                py-3
                font-semibold
                text-white
                hover:bg-blue-700
            "
            >
            + Report Bug
        </button>

      </div>


      {/* Search and Filters */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="flex gap-4">

          <input
            type="text"
            placeholder="Search bugs..."
            className="
              flex-1
              rounded-xl
              border
              px-4
              py-3
              outline-none
              focus:border-blue-500
            "
          />


          <select
            className="
              rounded-xl
              border
              px-4
              py-3
            "
          >
            <option>
              All Priorities
            </option>

            <option>
              P0
            </option>

            <option>
              P1
            </option>

            <option>
              P2
            </option>

          </select>


          <select
            className="
              rounded-xl
              border
              px-4
              py-3
            "
          >

            <option>
              All Status
            </option>

            <option>
              Open
            </option>

            <option>
              Fixed
            </option>

            <option>
              Pending
            </option>

          </select>


        </div>
            {/* Bug Table */}

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
                    className="border-b hover:bg-slate-50"
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

      </div>

        <ReportBugModal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

export default BugReports;
