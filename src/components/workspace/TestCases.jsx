import { useState } from "react";
import TestCaseStats from "../testcase/TestCaseStats";
import SearchFilters from "../testcase/SearchFilters";
import TestCaseTable from "../testcase/TestCaseTable";
import TestCaseDetailsModal from "../testcase/TestCaseDetailsModal";

const testCases = [
  {
    id: 1,
    title: "Verify user can log in",
    priority: "High",
    platform: "iOS",
    status: "Passed",
    tester: "Raily",
    date: "July 29, 2026",
  },
  {
    id: 2,
    title: "Verify rewarded ad loads",
    priority: "Critical",
    platform: "Android",
    status: "Failed",
    tester: "Raily",
    date: "July 28, 2026",
  },
  {
    id: 3,
    title: "Verify settings screen",
    priority: "Medium",
    platform: "Amazon",
    status: "Not Run",
    tester: "QA Tester",
    date: "July 27, 2026",
  },
];

function TestCases() {
  
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [platform, setPlatform] = useState("All");

  const [selectedTestCase, setSelectedTestCase] = useState(null);

  const platforms = [
    "All",
    ...new Set(testCases.map((testCase) => testCase.platform)),
  ];
  
  console.log(platforms);

  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Test Cases
          </h1>

          <p className="mt-2 text-slate-500">
            Manage and execute game test cases.
          </p>
        </div>

        <button
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
          + Add Test Case
        </button>

      </div>

      <TestCaseStats testCases={testCases} />

      <SearchFilters
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
        status={status}
        setStatus={setStatus}
        platform={platform}
        setPlatform={setPlatform}
        platforms={["All", "iOS", "Android", "Amazon"]}
      />

      <TestCaseTable
        testCases={testCases}
        onViewTestCase={(testCase) => {
          setSelectedTestCase(testCase);
        }}
      />

      <TestCaseDetailsModal
        testCase={selectedTestCase}
        onClose={() => setSelectedTestCase(null)}
      />

    </div>
  );
}

export default TestCases;