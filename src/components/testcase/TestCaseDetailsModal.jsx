import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function TestCaseDetailsModal({
  testCase,
  onClose,
  onEdit,
  onDelete,
}) {
  const { role } = useAuth();
  const isQA = role?.toLowerCase() === "qa";

  if (!testCase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              {testCase.title}
            </h2>

            <p className="mt-2 text-slate-500">
              Complete Test Case Information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={24} />
          </button>

        </div>

        {/* BASIC INFORMATION */}
        <div className="grid gap-5 md:grid-cols-2">

          <Info
            label="Test Case ID"
            value={testCase.testCaseId || "N/A"}
          />

          <Info
            label="Build"
            value={testCase.build || "No build selected"}
          />

          <Info
            label="Priority"
            value={testCase.priority || "N/A"}
          />

          <Info
            label="Platform"
            value={testCase.platform || "N/A"}
          />

          <Info
            label="Status"
            value={testCase.status || "N/A"}
          />

          <Info
            label="Tester"
            value={testCase.tester || "N/A"}
          />

          <Info
            label="Date"
            value={testCase.date || "N/A"}
          />

        </div>

        {/* DESCRIPTION */}
        <div className="mt-8">

          <h3 className="mb-2 text-lg font-semibold">
            Description
          </h3>

          <div className="whitespace-pre-wrap rounded-xl bg-slate-100 p-4">
            {testCase.description ||
              "No description provided."}
          </div>

        </div>

        {/* STEPS */}
        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold">
            Steps to Execute
          </h3>

          <div className="whitespace-pre-wrap rounded-xl bg-slate-100 p-4">
            {testCase.steps ||
              "No steps provided."}
          </div>

        </div>

        {/* EXPECTED RESULT */}
        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold">
            Expected Result
          </h3>

          <div className="whitespace-pre-wrap rounded-xl bg-slate-100 p-4">
            {testCase.expectedResult ||
              "No expected result provided."}
          </div>

        </div>

        {/* ACTUAL RESULT */}
        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold">
            Actual Result
          </h3>

          <div className="whitespace-pre-wrap rounded-xl bg-slate-100 p-4">
            {testCase.actualResult ||
              "No actual result provided."}
          </div>

        </div>

        {/* EVIDENCE */}
        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold">
            Evidence Link
          </h3>

          <div className="rounded-xl bg-slate-100 p-4">

            {testCase.evidenceLink ? (
              <a
                href={testCase.evidenceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline"
              >
                {testCase.evidenceLink}
              </a>
            ) : (
              "No evidence provided."
            )}

          </div>

        </div>

        {/* ACTIONS */}
        <div className="mt-8 flex justify-end gap-3">

          {isQA && (
            <>
              <button
                onClick={() => onDelete(testCase)}
                className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>

              <button
                onClick={() => onEdit(testCase)}
                className="rounded-xl border px-6 py-3 font-semibold hover:bg-slate-100"
              >
                Edit
              </button>
            </>
          )}

          <button
            onClick={onClose}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="rounded-xl border p-4">

      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold">
        {value}
      </p>

    </div>
  );
}

export default TestCaseDetailsModal;