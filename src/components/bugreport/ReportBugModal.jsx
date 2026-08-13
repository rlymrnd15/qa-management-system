import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function ReportBugModal({
  isOpen,
  onClose,
  onSubmit,
  bug = null,
  build = null,
  game = null,
  platform = null,
}) {
  const { role } = useAuth();

  const isDev = role?.toLowerCase() === "dev";

  console.log("CURRENT USER ROLE:", role);
  console.log("IS DEV:", isDev);

  const [formData, setFormData] = useState({
    title: "",
    version: build?.version || "",
    device: "",
    osVersion: "",
    priority: "P2",
    status: "Open",
    impact: "User Issue",
    steps: "",
    evidenceLink: "",
    developerComments: "",
  });

  // ==============================
  // LOAD BUG DATA
  // ==============================

  useEffect(() => {
    if (bug) {
      setFormData({
        title: bug.title || "",
        version: bug.version || "",
        device: bug.device || "",
        osVersion: bug.osVersion || "",
        priority: bug.priority || "P2",
        status: bug.status || "Open",
        impact: bug.impact || "User Issue",
        steps: bug.steps || "",
        evidenceLink: bug.evidenceLink || "",
        developerComments: bug.developerComments || "",
      });
    } else {
      setFormData({
        title: "",
        version: build?.version || "",
        device: "",
        osVersion: "",
        priority: "P2",
        status: "Open",
        impact: "User Issue",
        steps: "",
        evidenceLink: "",
        developerComments: "",
      });
    }
  }, [bug, build, isOpen]);

  // ==============================
  // HANDLE INPUT
  // ==============================

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==============================
  // HANDLE SUBMIT
  // ==============================

  const handleSubmit = () => {
    const newBug = {
      id: bug ? bug.id : Date.now(),

      game: game || bug?.game,
      platform: platform || bug?.platform,

      build: build?.version || bug?.build,

      // QA fields
      title: formData.title,
      device: formData.device,
      version: formData.version,
      osVersion: formData.osVersion,
      impact: formData.impact,
      steps: formData.steps,
      evidenceLink: formData.evidenceLink,

      // DEV fields
      priority: isDev
        ? formData.priority
        : bug?.priority || "P2",

      status: isDev
        ? formData.status
        : bug?.status || "Open",

      developerComments: isDev
        ? formData.developerComments
        : bug?.developerComments || "",

      reporter: bug
        ? bug.reporter
        : "Raily",

      date: bug
        ? bug.date
        : new Date().toLocaleDateString(),
    };

    console.log("BUG SUBMITTED:", newBug);
    console.log("SUBMITTED BY ROLE:", role);

    onSubmit(newBug);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8">

        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {bug ? "Edit Bug" : "Report New Bug"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isDev ? "DEV team access" : "QA team access"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X />
          </button>
        </div>

        {/* FORM */}
        <div className="grid gap-5 md:grid-cols-2">

          {/* ISSUE TITLE */}
          <div>
            <label className="text-sm font-semibold">
              Issue Title
            </label>

            <input
              value={formData.title}
              onChange={(e) =>
                handleChange("title", e.target.value)
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="Enter bug title"
            />
          </div>

          {/* VERSION */}
          <div>
            <label className="text-sm font-semibold">
              Version Number
            </label>

            <input
              value={formData.version}
              readOnly={!!build}
              onChange={(e) =>
                handleChange("version", e.target.value)
              }
              className={`mt-2 w-full rounded-xl border p-3 ${
                build
                  ? "cursor-not-allowed bg-slate-100 text-slate-500"
                  : ""
              }`}
              placeholder="Example: 2.5.1"
            />
          </div>

          {/* DEVICE */}
          <div>
            <label className="text-sm font-semibold">
              Device
            </label>

            <input
              value={formData.device}
              onChange={(e) =>
                handleChange("device", e.target.value)
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="Example: iPhone 15"
            />
          </div>

          {/* OS VERSION */}
          <div>
            <label className="text-sm font-semibold">
              OS Version
            </label>

            <input
              value={formData.osVersion}
              onChange={(e) =>
                handleChange("osVersion", e.target.value)
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="Example: iOS 18"
            />
          </div>

          {/* PRIORITY — DEV ONLY */}
          <div>
            <label className="text-sm font-semibold">
              Bug Priority
            </label>

            <select
              value={formData.priority}
              onChange={(e) =>
                handleChange("priority", e.target.value)
              }
              disabled={!isDev}
              className="mt-2 w-full rounded-xl border p-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            >
              <option>P0</option>
              <option>P1</option>
              <option>P2</option>
            </select>

            {!isDev && (
              <p className="mt-1 text-xs text-slate-500">
                Priority can only be changed by the DEV team.
              </p>
            )}
          </div>

          {/* STATUS — DEV ONLY */}
          <div>
            <label className="text-sm font-semibold">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(e) =>
                handleChange("status", e.target.value)
              }
              disabled={!isDev}
              className="mt-2 w-full rounded-xl border p-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            >
              <option>Open</option>
              <option>Pending</option>
              <option>Closed</option>
            </select>

            {!isDev && (
              <p className="mt-1 text-xs text-slate-500">
                Status can only be changed by the DEV team.
              </p>
            )}
          </div>

          {/* IMPACT — QA CAN EDIT */}
          <div>
            <label className="text-sm font-semibold">
              Issue Impact
            </label>

            <select
              value={formData.impact}
              onChange={(e) =>
                handleChange("impact", e.target.value)
              }
              className="mt-2 w-full rounded-xl border p-3"
            >
              <option>Revenue Issue</option>
              <option>User Issue</option>
              <option>Logging Issue</option>
              <option>Other Issue</option>
            </select>
          </div>

        </div>

        {/* STEPS */}
        <div className="mt-5">
          <label className="text-sm font-semibold">
            Steps to Reproduce
          </label>

          <textarea
            value={formData.steps}
            onChange={(e) =>
              handleChange("steps", e.target.value)
            }
            className="mt-2 h-32 w-full rounded-xl border p-3"
            placeholder="1. Open game..."
          />
        </div>

        {/* EVIDENCE */}
        <div className="mt-5">
          <label className="text-sm font-semibold">
            Evidence Link
          </label>

          <input
            value={formData.evidenceLink}
            onChange={(e) =>
              handleChange("evidenceLink", e.target.value)
            }
            className="mt-2 w-full rounded-xl border p-3"
            placeholder="https://drive.google.com/..."
          />
        </div>

        {/* DEVELOPER COMMENTS — DEV ONLY */}
        <div className="mt-5">
          <label className="text-sm font-semibold">
            Developer Comments
          </label>

          <textarea
            value={formData.developerComments}
            onChange={(e) =>
              handleChange(
                "developerComments",
                e.target.value
              )
            }
            disabled={!isDev}
            className="mt-2 h-24 w-full rounded-xl border p-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            placeholder={
              isDev
                ? "Add developer comments..."
                : "Only the DEV team can edit this field."
            }
          />

          {!isDev && (
            <p className="mt-1 text-xs text-slate-500">
              Developer comments can only be changed by the DEV team.
            </p>
          )}
        </div>

        {/* BUTTONS */}
        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl px-5 py-3 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {bug ? "Save Changes" : "Submit Bug"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ReportBugModal;