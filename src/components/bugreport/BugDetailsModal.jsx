import { X } from "lucide-react";

function BugDetailsModal({
  bug,
  onClose,
  onEdit,
  onDelete,
  isDev,
}) {
  if (!bug) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">
              {bug.title}
            </h2>

            <p className="mt-2 text-slate-500">
              Complete Bug Information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        {/* BUG INFORMATION */}
        <div className="grid gap-5 md:grid-cols-2">

          <Info
            label="Impact"
            value={bug.impact}
          />

          <Info
            label="Device"
            value={bug.device}
          />

          <Info
            label="OS Version"
            value={bug.osVersion}
          />

          <Info
            label="Game Version"
            value={bug.version}
          />

          <Info
            label="Reproducible on Live Build"
            value={bug.reproducibleLive || "Not Tested"}
          />

          <Info
            label="Reporter"
            value={bug.reporter}
          />

          <Info
            label="Date Reported"
            value={bug.date}
          />

          <Info
            label="Assigned Developer"
            value={bug.developerName || "Unassigned"}
          />

        </div>

        {/* TICKET URL */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">
            Ticket URL
          </h3>

          <div className="rounded-xl bg-slate-100 p-4">
            {bug.ticketUrl ? (
              <a
                href={bug.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline hover:text-blue-800"
              >
                Open Ticket
              </a>
            ) : (
              <p className="text-slate-500">
                No ticket assigned.
              </p>
            )}
          </div>
        </div>

        {/* QA COMMENTS */}
        <div className="mt-6">
          <h3 className="mb-2 text-lg font-semibold">
            QA Comments
          </h3>

          <div className="whitespace-pre-wrap rounded-xl bg-slate-100 p-4">
            {bug.qaComments || "No QA comments."}
          </div>
        </div>

        {/* DEVELOPER INFORMATION */}
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <h3 className="mb-5 text-xl font-bold">
            Developer Triage
          </h3>

          <div className="grid gap-5 md:grid-cols-2">

            <Info
              label="Priority"
              value={bug.priority || "Unassigned"}
            />

            <Info
              label="Status"
              value={bug.status || "Open"}
            />

            <Info
              label="Assigned Developer"
              value={bug.developerName || "Unassigned"}
            />

            <Info
              label="Fix Confirmation Status"
              value={
                bug.fixConfirmationStatus ||
                "Not Confirmed"
              }
            />

          </div>

          {/* DEVELOPER COMMENTS */}
          <div className="mt-5">

            <p className="text-sm font-semibold">
              Developer Comments
            </p>

            <div className="mt-2 whitespace-pre-wrap rounded-xl bg-white p-4">
              {bug.developerComments ||
                "No developer comments."}
            </div>

          </div>

        </div>

        {/* STEPS TO REPRODUCE */}
        <div className="mt-8">

          <h3 className="mb-2 text-lg font-semibold">
            Steps to Reproduce
          </h3>

          <div className="whitespace-pre-wrap rounded-xl bg-slate-100 p-4">
            {bug.steps || "No steps provided."}
          </div>

        </div>

        {/* EVIDENCE */}
        <div className="mt-6">

          <h3 className="mb-2 text-lg font-semibold">
            Evidence Link
          </h3>

          <div className="rounded-xl bg-slate-100 p-4">

            {bug.evidenceLink ? (
              <a
                href={bug.evidenceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 underline hover:text-blue-800"
              >
                Open Evidence
              </a>
            ) : (
              <p className="text-slate-500">
                No evidence attached.
              </p>
            )}

          </div>

        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-end gap-3">

          {/* EDIT */}
          <button
            onClick={() => onEdit(bug)}
            className="rounded-xl border px-6 py-3 font-semibold hover:bg-slate-100"
          >
            Edit
          </button>

          {/* DELETE - DEV ONLY */}
          {isDev && (
            <button
              onClick={() => onDelete(bug)}
              className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700"
            >
              Delete
            </button>
          )}

          {/* CLOSE */}
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
        {value || "-"}
      </p>
    </div>
  );
}

export default BugDetailsModal;