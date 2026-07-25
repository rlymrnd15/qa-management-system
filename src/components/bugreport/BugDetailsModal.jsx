import { X } from "lucide-react";

function BugDetailsModal({
  bug,
  onClose,
  onEdit,
  onDelete,
}) {

  if (!bug) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-3xl font-bold">
              {bug.title}
            </h2>

            <p className="mt-2 text-slate-500">
              Complete Bug Information
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        {/* Information */}
        <div className="grid gap-5 md:grid-cols-2">

          <Info label="Priority" value={bug.priority} />
          <Info label="Status" value={bug.status} />
          <Info label="Impact" value={bug.impact} />
          <Info label="Device" value={bug.device} />
          <Info label="OS Version" value={bug.osVersion || "-"} />
          <Info label="Game Version" value={bug.version} />
          <Info label="Reporter" value={bug.reporter} />
          <Info label="Date Reported" value={bug.date} />

        </div>

        {/* Steps */}
        <div className="mt-8">

          <h3 className="mb-2 text-lg font-semibold">
            Steps to Reproduce
          </h3>

          <div className="rounded-xl bg-slate-100 p-4 whitespace-pre-wrap">
            {bug.steps || "No steps provided."}
          </div>

        </div>

        {/* Developer Comments */}
        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold">
            Developer Comments
          </h3>

          <div className="rounded-xl bg-slate-100 p-4 whitespace-pre-wrap">
            {bug.developerComments || "No developer comments."}
          </div>

        </div>

        <div className="mt-8 flex justify-end gap-3">

        <button
          onClick={() => onDelete(bug)}
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
        >
          Delete
        </button>

        <button
          onClick={() => onEdit(bug)}
          className="rounded-xl border px-6 py-3 font-semibold hover:bg-slate-100"
        >
          Edit
        </button>

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

export default BugDetailsModal;