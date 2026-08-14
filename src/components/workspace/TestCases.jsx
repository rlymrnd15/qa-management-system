import { useEffect, useState } from "react";

import TestCaseStats from "../testcase/TestCaseStats";
import SearchFilters from "../testcase/SearchFilters";
import TestCaseTable from "../testcase/TestCaseTable";
import TestCaseDetailsModal from "../testcase/TestCaseDetailsModal";
import { formatGameName } from "../../utils/formatGameName";

import ReportTestCaseModal from "../testcase/ReportTestCaseModal";

import {
  getTestCases,
  addTestCase,
  updateTestCase,
  deleteTestCase,
} from "../../services/testCaseService";

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

  const [testCaseList, setTestCaseList] = useState([]);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD TEST CASES
  // ==========================================

  useEffect(() => {
    const loadTestCases = async () => {
      try {
        const data = await getTestCases();

        setTestCaseList(data);
      } catch (error) {
        console.error("Error loading test cases:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTestCases();
  }, []);

  // ==========================================
  // TEST CASES FOR CURRENT GAME + PLATFORM
  // ==========================================

  const gamePlatformTestCases = testCaseList.filter(
    (testCase) =>
      testCase.game === game &&
      testCase.platform === platform
  );

  // ==========================================
  // PLATFORMS
  // ==========================================

  const platforms = [
    "All",
    ...new Set(
      gamePlatformTestCases
        .map((testCase) => testCase.platform)
        .filter(Boolean)
    ),
  ];

  // ==========================================
  // PLATFORM NAME
  // ==========================================

  const platformName = {
    ios: "iOS",
    android: "Android",
    amazon: "Amazon",
  }[platform] || platform;

  // ==========================================
  // FILTER TEST CASES
  // ==========================================

  const filteredTestCases = gamePlatformTestCases.filter(
    (testCase) => {
      const matchesSearch =
        (testCase.title || "")
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
    }
  );

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-slate-500">
          Loading test cases...
        </p>
      </div>
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

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

      {/* Stats */}
      <TestCaseStats
        testCases={filteredTestCases}
      />

      {/* Filters */}
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

      {/* Test Case Table */}
      <TestCaseTable
        testCases={filteredTestCases}
        onViewTestCase={(testCase) => {
          setSelectedTestCase(testCase);
        }}
      />

      {/* Details Modal */}
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

        onDelete={async (testCase) => {
          try {
            await deleteTestCase(testCase.id);

            setTestCaseList((prev) =>
              prev.filter(
                (item) => item.id !== testCase.id
              )
            );

            setSelectedTestCase(null);
          } catch (error) {
            console.error(
              "Error deleting test case:",
              error
            );

            alert("Failed to delete test case.");
          }
        }}
      />

      {/* Add / Edit Modal */}
      <ReportTestCaseModal
        isOpen={openModal}

        onClose={() => {
          console.log("Closing modal...");

          setOpenModal(false);
          setEditingTestCase(null);
        }}

        testCase={editingTestCase}

        build={{ version: "2.5.2" }}

        game={game}
        platform={platform}

        onSubmit={async (newTestCase) => {
          try {

            // ==========================================
            // EDIT
            // ==========================================

            if (editingTestCase) {

              const updatedTestCase =
                await updateTestCase(
                  editingTestCase.id,
                  {
                    ...newTestCase,
                    game,
                    platform,
                  }
                );

              setTestCaseList((prev) =>
                prev.map((item) =>
                  item.id === editingTestCase.id
                    ? updatedTestCase
                    : item
                )
              );

            }

            // ==========================================
            // ADD
            // ==========================================

            else {

              const savedTestCase =
                await addTestCase({
                  ...newTestCase,
                  game,
                  platform,
                  build: "2.5.2",
                });

              setTestCaseList((prev) => [
                savedTestCase,
                ...prev,
              ]);

            }

            setEditingTestCase(null);
            setOpenModal(false);

          } catch (error) {

            console.error(
              "Error saving test case:",
              error
            );

            alert("Failed to save test case.");
          }
        }}
      />

    </div>
  );
}

export default TestCases;