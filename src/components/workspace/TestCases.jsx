import { useState } from "react";
import TestCaseStats from "../testcase/TestCaseStats";
import SearchFilters from "../testcase/SearchFilters";
import TestCaseTable from "../testcase/TestCaseTable";
import TestCaseDetailsModal from "../testcase/TestCaseDetailsModal";
import { formatGameName } from "../../utils/formatGameName";
import testCases from "../../data/testCases";
import ReportTestCaseModal from "../testcase/ReportTestCaseModal";


function TestCases({
  game,
  platform,
}) {
  
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedPlatform, setSelectedPlatform] = useState("All");

  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [editingTestCase, setEditingTestCase] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const [testCaseList, setTestCaseList] = useState(testCases);

  const platforms = [
    "All",
    ...new Set(testCaseList.map((testCase) => testCase.platform)),
  ];
  
  console.log(platforms);

  const platformName = {
    ios: "iOS",
    android: "Android",
    amazon: "Amazon",
  }[platform] || platform;

  const filteredTestCases = testCaseList.filter((testCase) => {
  const matchesSearch =
    testCase.title
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesPriority =
    priority === "All" ||
    testCase.priority === priority;

  const matchesStatus =
    status === "All" ||
    testCase.status === status;

  const matchesPlatform =
    selectedPlatform === "All" ||
    testCase.platform === selectedPlatform;

  return (
    matchesSearch &&
    matchesPriority &&
    matchesStatus &&
    matchesPlatform
  );
});
  
  return (
    <div>

      {/* Header */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Test Cases
          </h1>

          <p className="mt-2 text-slate-500">
            {formatGameName(game)} • {platformName}
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
          + Add Test Case
        </button>

      </div>

      <TestCaseStats testCases={filteredTestCases} />

      <SearchFilters
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
        status={status}
        setStatus={setStatus}
        platform={selectedPlatform}
        setPlatform={setSelectedPlatform}
        platforms={platforms}
      />

      <TestCaseTable
        testCases={filteredTestCases}
        onViewTestCase={(testCase) => {
          setSelectedTestCase(testCase);
        }}
      />

      <TestCaseDetailsModal
        testCase={selectedTestCase}
        onClose={() => {
          setSelectedTestCase(null);
        }}
        onEdit={(testCase) => {
          setEditingTestCase(testCase);
          setOpenModal(true);
          setSelectedTestCase(null);
        }}
        onDelete={(testCase) => {
          setTestCaseList((prev) =>
            prev.filter((item) => item.id !== testCase.id)
          );

          setSelectedTestCase(null);
        }}
      />

      <ReportTestCaseModal
        isOpen={openModal}
        onClose={() => {
          console.log("Closing modal...");
          setOpenModal(false);
          setEditingTestCase(null);
        }}
        testCase={editingTestCase}
        build={{ version: "2.5.2" }} // temporary
        game={game}
        platform={platform}
        onSubmit={(newTestCase) => {
          if (editingTestCase) {
            setTestCaseList((prev) =>
              prev.map((item) =>
                item.id === newTestCase.id
                  ? newTestCase
                  : item
              )
            );
          } else {
            setTestCaseList((prev) => [
              newTestCase,
              ...prev,
            ]);
          }

          setEditingTestCase(null);
          setOpenModal(false);
        }}
      />

    </div>
  );
}

export default TestCases;