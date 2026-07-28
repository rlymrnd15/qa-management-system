import { X } from "lucide-react";

function TestCaseDetailsModal({ testCase, onClose }) {
  if (!testCase) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              {testCase.title}
            </h2>

            <p className="mt-2 text-slate-500">
              Complete Test Case Information
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {/* Information */}
        <div className="grid gap-5 md:grid-cols-2">

          <Info label="Priority" value={testCase.priority} />
          <Info label="Platform" value={testCase.platform} />
          <Info label="Status" value={testCase.status} />
          <Info label="Tester" value={testCase.tester} />
          <Info label="Date" value={testCase.date} />

        </div>

        {/* Description */}
        <div className="mt-8">

          <h3 className="mb-2 text-lg font-semibold">
            Description
          </h3>

          <div className="rounded-xl bg-slate-100 p-4 whitespace-pre-wrap">
            {testCase.description || "No description provided."}
          </div>

        </div>

        {/* Expected Result */}
        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold">
            Expected Result
          </h3>

          <div className="rounded-xl bg-slate-100 p-4 whitespace-pre-wrap">
            {testCase.expectedResult || "No expected result provided."}
          </div>

        </div>

        {/* Actual Result */}
        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold">
            Actual Result
          </h3>

          <div className="rounded-xl bg-slate-100 p-4 whitespace-pre-wrap">
            {testCase.actualResult || "No actual result provided."}
          </div>

        </div>

        <div className="mt-8 flex justify-end">

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