import { useEffect, useState } from "react";

function ReportTestCaseModal({
  isOpen,
  onClose,
  onSubmit,
  testCase = null,
  availableBuilds = [],
  game = null,
  platform = null,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "P1",
    status: "Not Run",
    build: "",
    expectedResult: "",
    actualResult: "",
    steps: "",
    evidenceLink: "",
  });

  // ==========================================
  // LOAD / RESET FORM
  // ==========================================
  useEffect(() => {
    if (testCase) {
      setFormData({
        title: testCase.title || "",
        description: testCase.description || "",
        priority: testCase.priority || "P1",

        // Supports old Firestore values
        status:
          testCase.status === "Pass"
            ? "Passed"
            : testCase.status === "Fail"
            ? "Failed"
            : testCase.status || "Not Run",

        build: testCase.build || "",
        expectedResult:
          testCase.expectedResult || "",
        actualResult:
          testCase.actualResult || "",
        steps: testCase.steps || "",
        evidenceLink:
          testCase.evidenceLink || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "P1",
        status: "Not Run",
        build: "",
        expectedResult: "",
        actualResult: "",
        steps: "",
        evidenceLink: "",
      });
    }
  }, [testCase, isOpen]);

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================
  const handleSubmit = () => {
    // Validate build
    if (!formData.build) {
      alert("Please select a build to test.");
      return;
    }

    // Validate title
    if (!formData.title.trim()) {
      alert("Please enter a test case title.");
      return;
    }

    const newTestCase = {
      id: testCase
        ? testCase.id
        : Date.now(),

      testCaseId:
        testCase?.testCaseId ||
        `TC-${Date.now()}`,

      game:
        game ||
        testCase?.game,

      platform:
        platform ||
        testCase?.platform,

      // BUILD
      build: formData.build,

      // BASIC INFORMATION
      title: formData.title,
      description: formData.description,
      priority: formData.priority,

      // STATUS
      // Always save the new consistent values
      status: formData.status,

      // RESULTS
      expectedResult:
        formData.expectedResult,

      actualResult:
        formData.actualResult,

      // STEPS
      steps: formData.steps,

      // EVIDENCE
      evidenceLink:
        formData.evidenceLink,

      // TESTER
      tester:
        testCase?.tester ||
        "Raily",

      // DATE
      date:
        testCase?.date ||
        new Date().toLocaleDateString(),
    };

    onSubmit(newTestCase);
  };

  // ==========================================
  // HIDDEN MODAL
  // ==========================================
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8">

        {/* ========================================
            HEADER
        ======================================== */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {testCase
                ? "Edit Test Case"
                : "New Test Case"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select the build that this test case will cover.
            </p>
          </div>
        </div>

        {/* ========================================
            FORM
        ======================================== */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* TEST CASE TITLE */}
          <div>
            <label className="text-sm font-semibold">
              Test Case Title
            </label>

            <input
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="Enter test case title"
            />
          </div>

          {/* BUILD */}
          <div>
            <label className="text-sm font-semibold">
              Build to Test
            </label>

            <select
              value={formData.build}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  build: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
            >
              <option value="">
                Select a build
              </option>

              {availableBuilds.map((build) => (
                <option
                  key={build.id}
                  value={build.version}
                >
                  v{build.version}

                  {build.releaseDate
                    ? ` — ${build.releaseDate}`
                    : ""}

                  {build.latest
                    ? " — Latest"
                    : ""}
                </option>
              ))}
            </select>

            {availableBuilds.length === 0 && (
              <p className="mt-2 text-sm text-red-500">
                No builds available for this game and platform.
              </p>
            )}
          </div>

          {/* DESCRIPTION */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">
              Description
            </label>

            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="mt-2 h-24 w-full rounded-xl border p-3"
              placeholder="Describe the purpose of this test case..."
            />
          </div>

          {/* PRIORITY */}
          <div>
            <label className="text-sm font-semibold">
              QA Test Case Priority
            </label>

            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priority: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
            >
              <option value="P0">
                P0
              </option>

              <option value="P1">
                P1
              </option>

              <option value="P2">
                P2
              </option>
            </select>
          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm font-semibold">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
            >
              <option value="Not Run">
                Not Run
              </option>

              <option value="Passed">
                Passed
              </option>

              <option value="Failed">
                Failed
              </option>

              <option value="Blocked">
                Blocked
              </option>
            </select>
          </div>
        </div>

        {/* ========================================
            STEPS
        ======================================== */}
        <div className="mt-5">
          <label className="text-sm font-semibold">
            Steps to Execute
          </label>

          <textarea
            value={formData.steps}
            onChange={(e) =>
              setFormData({
                ...formData,
                steps: e.target.value,
              })
            }
            className="mt-2 h-32 w-full rounded-xl border p-3"
            placeholder={
              "1. Open game...\n2. Go to Homepage..."
            }
          />
        </div>

        {/* ========================================
            EXPECTED RESULT
        ======================================== */}
        <div className="mt-5">
          <label className="text-sm font-semibold">
            Expected Result
          </label>

          <textarea
            value={formData.expectedResult}
            onChange={(e) =>
              setFormData({
                ...formData,
                expectedResult:
                  e.target.value,
              })
            }
            className="mt-2 h-24 w-full rounded-xl border p-3"
            placeholder="Expected outcome..."
          />
        </div>

        {/* ========================================
            ACTUAL RESULT
        ======================================== */}
        <div className="mt-5">
          <label className="text-sm font-semibold">
            Actual Result
          </label>

          <textarea
            value={formData.actualResult}
            onChange={(e) =>
              setFormData({
                ...formData,
                actualResult:
                  e.target.value,
              })
            }
            className="mt-2 h-24 w-full rounded-xl border p-3"
            placeholder="Actual outcome..."
          />
        </div>

        {/* ========================================
            EVIDENCE
        ======================================== */}
        <div className="mt-5">
          <label className="text-sm font-semibold">
            Evidence Link
          </label>

          <input
            value={formData.evidenceLink}
            onChange={(e) =>
              setFormData({
                ...formData,
                evidenceLink:
                  e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border p-3"
            placeholder="https://drive.google.com/..."
          />
        </div>

        {/* ========================================
            BUTTONS
        ======================================== */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl px-5 py-3 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={
              availableBuilds.length === 0
            }
            className={`rounded-xl px-5 py-3 font-semibold text-white ${
              availableBuilds.length === 0
                ? "cursor-not-allowed bg-slate-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {testCase
              ? "Save Changes"
              : "Create Test Case"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default ReportTestCaseModal;