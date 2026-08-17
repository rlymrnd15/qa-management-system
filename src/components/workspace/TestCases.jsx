import { useEffect, useState } from "react";

import TestCaseStats from "../testcase/TestCaseStats";
import SearchFilters from "../testcase/SearchFilters";
import TestCaseTable from "../testcase/TestCaseTable";
import TestCaseDetailsModal from "../testcase/TestCaseDetailsModal";
import ReportTestCaseModal from "../testcase/ReportTestCaseModal";

import { formatGameName } from "../../utils/formatGameName";

import {
  getTestCases,
  addTestCase,
  updateTestCase,
  deleteTestCase,
} from "../../services/testCaseService";

import {
  getDeviceBuilds,
} from "../../services/deviceBuildService";

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
  const [buildList, setBuildList] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================================
  // LOAD BUILDS
  // ==========================================
  useEffect(() => {
    const loadBuilds = async () => {
      try {
        const data = await getDeviceBuilds();

        setBuildList(data);
      } catch (error) {
        console.error(
          "Error loading builds:",
          error
        );
      }
    };

    loadBuilds();
  }, []);

  // ==========================================
  // LOAD TEST CASES
  // ==========================================
  useEffect(() => {
    const loadTestCases = async () => {
      try {
        const data = await getTestCases();

        setTestCaseList(data);
      } catch (error) {
        console.error(
          "Error loading test cases:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadTestCases();
  }, []);

  // ==========================================
  // TEST CASES FOR CURRENT GAME + PLATFORM
  // ==========================================
  const gamePlatformTestCases =
    testCaseList
      .filter(
        (testCase) =>
          testCase.game === game &&
          testCase.platform === platform
      )
      .sort((a, b) => {
        const dateA = new Date(
          a.date || 0
        );

        const dateB = new Date(
          b.date || 0
        );

        return dateB - dateA;
      });

  // ==========================================
  // BUILDS FOR CURRENT GAME + PLATFORM
  // ==========================================
  const availableBuilds =
    buildList
      .filter(
        (build) =>
          build.game === game &&
          build.platform === platform
      )
      .sort((a, b) => {
        // Latest builds first
        if (a.latest && !b.latest) {
          return -1;
        }

        if (!a.latest && b.latest) {
          return 1;
        }

        // Then newest release date
        const dateA = new Date(
          a.releaseDate || 0
        );

        const dateB = new Date(
          b.releaseDate || 0
        );

        return dateB - dateA;
      });

  // ==========================================
  // DEBUG BUILDS
  // ==========================================
  console.log(
    "CURRENT GAME:",
    game
  );

  console.log(
    "CURRENT PLATFORM:",
    platform
  );

  console.log(
    "AVAILABLE BUILDS:",
    availableBuilds
  );

  // ==========================================
  // PLATFORMS
  // ==========================================
  const platforms = [
    "All",
    ...new Set(
      gamePlatformTestCases
        .map(
          (testCase) =>
            testCase.platform
        )
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
  const filteredTestCases =
    gamePlatformTestCases.filter(
      (testCase) => {
        const matchesSearch =
          (testCase.title || "")
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        const matchesPriority =
          priority === "All" ||
          testCase.priority ===
            priority;

        const matchesStatus =
          status === "All" ||
          testCase.status ===
            status;

        const matchesPlatform =
          selectedPlatform ===
            "All" ||
          testCase.platform ===
            selectedPlatform;

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

      {/* ========================================
          HEADER
      ======================================== */}
      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold">
            Test Cases
          </h1>

          <p className="mt-2 text-slate-500">
            {formatGameName(game)} •{" "}
            {platformName}
          </p>
        </div>

        <button
          onClick={() => {
            setEditingTestCase(null);
            setOpenModal(true);
          }}
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

      {/* ========================================
          STATS
      ======================================== */}
      <TestCaseStats
        testCases={filteredTestCases}
      />

      {/* ========================================
          FILTERS
      ======================================== */}
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

      {/* ========================================
          TEST CASE TABLE
      ======================================== */}
      <TestCaseTable
        testCases={filteredTestCases}
        onViewTestCase={(testCase) => {
          setSelectedTestCase(
            testCase
          );
        }}
      />

      {/* ========================================
          DETAILS MODAL
      ======================================== */}
      <TestCaseDetailsModal
        testCase={selectedTestCase}

        onClose={() => {
          setSelectedTestCase(null);
        }}

        onEdit={(testCase) => {
          setEditingTestCase(
            testCase
          );

          setOpenModal(true);

          setSelectedTestCase(
            null
          );
        }}

        onDelete={async (testCase) => {
          try {
            await deleteTestCase(
              testCase.id
            );

            setTestCaseList(
              (prev) =>
                prev.filter(
                  (item) =>
                    item.id !==
                    testCase.id
                )
            );

            setSelectedTestCase(
              null
            );
          } catch (error) {
            console.error(
              "Error deleting test case:",
              error
            );

            alert(
              "Failed to delete test case."
            );
          }
        }}
      />

      {/* ========================================
          ADD / EDIT TEST CASE MODAL
      ======================================== */}
      <ReportTestCaseModal
        isOpen={openModal}

        availableBuilds={
          availableBuilds
        }

        onClose={() => {
          console.log(
            "Closing modal..."
          );

          setOpenModal(false);

          setEditingTestCase(
            null
          );
        }}

        testCase={
          editingTestCase
        }

        game={game}

        platform={platform}

        onSubmit={async (
          newTestCase
        ) => {
          try {

            // ==========================================
            // EDIT TEST CASE
            // ==========================================
            if (
              editingTestCase
            ) {
              const updatedTestCase =
                await updateTestCase(
                  editingTestCase.id,
                  {
                    ...newTestCase,
                    game,
                    platform,
                  }
                );

              setTestCaseList(
                (prev) =>
                  prev.map(
                    (item) =>
                      item.id ===
                      editingTestCase.id
                        ? updatedTestCase
                        : item
                  )
              );
            }

            // ==========================================
            // ADD TEST CASE
            // ==========================================
            else {
              const savedTestCase =
                await addTestCase({
                  ...newTestCase,
                  game,
                  platform,
                });

              setTestCaseList(
                (prev) => [
                  savedTestCase,
                  ...prev,
                ]
              );
            }

            setEditingTestCase(
              null
            );

            setOpenModal(
              false
            );

          } catch (error) {
            console.error(
              "Error saving test case:",
              error
            );

            alert(
              "Failed to save test case."
            );
          }
        }}
      />

    </div>
  );
}

export default TestCases;