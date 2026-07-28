function TestCaseTable({
  testCases,
  onViewTestCase,
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

      <table className="w-full">

        <thead className="border-b bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold">
              Test Case
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Priority
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Platform
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Tester
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Date
            </th>
          </tr>
        </thead>

        <tbody>

          {testCases.map((testCase) => (

            <tr
            key={testCase.id}
            onClick={() => onViewTestCase(testCase)}
            className="cursor-pointer border-b transition hover:bg-slate-50"
            >

              <td className="px-6 py-4">
                {testCase.title}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`
                    rounded-full px-3 py-1 text-sm font-semibold
                    ${
                      testCase.priority === "Critical"
                        ? "bg-red-100 text-red-600"
                        : testCase.priority === "High"
                        ? "bg-orange-100 text-orange-600"
                        : testCase.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {testCase.priority}
                </span>

              </td>

              <td className="px-6 py-4">
                {testCase.platform}
              </td>

              <td className="px-6 py-4">

                <span
                  className={`
                    rounded-full px-3 py-1 text-sm font-semibold
                    ${
                      testCase.status === "Passed"
                        ? "bg-green-100 text-green-700"
                        : testCase.status === "Failed"
                        ? "bg-red-100 text-red-600"
                        : "bg-slate-200 text-slate-700"
                    }
                  `}
                >
                  {testCase.status}
                </span>

              </td>

              <td className="px-6 py-4">
                {testCase.tester}
              </td>

              <td className="px-6 py-4">
                {testCase.date}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default TestCaseTable;