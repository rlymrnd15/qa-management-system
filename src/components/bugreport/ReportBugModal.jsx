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

  const [formData, setFormData] = useState({
    title: "",
    version: "",
    device: "",
    osVersion: "",
    priority: "P2",

    reproducible: "Not Tested",

    ticketUrl: "",

    impact: "User Issue",

    status: "Open",

    developerName: "",

    fixConfirmationStatus: "Not Confirmed",

    steps: "",
    evidenceLink: "",

    qaComments: "",
    developerComments: "",
  });

  // ==========================================
  // LOAD BUG DATA
  // ==========================================

  useEffect(() => {
    if (bug) {
      setFormData({
        title: bug.title || "",
        version: bug.version || build?.version || "",
        device: bug.device || "",
        osVersion: bug.osVersion || "",

        priority: bug.priority || "P2",

        reproducible:
          bug.reproducible || "Not Tested",

        ticketUrl:
          bug.ticketUrl || "",

        impact:
          bug.impact || "User Issue",

        status:
          bug.status || "Open",

        developerName:
          bug.developerName || "",

        fixConfirmationStatus:
          bug.fixConfirmationStatus || "Not Confirmed",

        steps:
          bug.steps || "",

        evidenceLink:
          bug.evidenceLink || "",

        qaComments:
          bug.qaComments || "",

        developerComments:
          bug.developerComments || "",
      });
    } else {
      setFormData({
        title: "",
        version: build?.version || "",
        device: "",
        osVersion: "",

        priority: "P2",

        reproducible: "Not Tested",

        ticketUrl: "",

        impact: "User Issue",

        status: "Open",

        developerName: "",

        fixConfirmationStatus: "Not Confirmed",

        steps: "",
        evidenceLink: "",

        qaComments: "",
        developerComments: "",
      });
    }
  }, [bug, build, isOpen]);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Please enter an issue title.");
      return;
    }

    if (!formData.device.trim()) {
      alert("Please enter the device.");
      return;
    }

    if (!formData.osVersion.trim()) {
      alert("Please enter the OS version.");
      return;
    }

    if (!formData.steps.trim()) {
      alert("Please enter the steps to reproduce.");
      return;
    }

    const newBug = {
      id: bug ? bug.id : Date.now(),

      // ======================================
      // PROJECT INFORMATION
      // ======================================

      game:
        game || bug?.game,

      platform:
        platform || bug?.platform,

      build:
        build?.version ||
        formData.version ||
        bug?.build ||
        bug?.version ||
        "",

      version:
        formData.version ||
        build?.version ||
        bug?.version ||
        "",

      // ======================================
      // QA INFORMATION
      // ======================================

      title:
        formData.title,

      device:
        formData.device,

      osVersion:
        formData.osVersion,

      reproducible:
        formData.reproducible,

      steps:
        formData.steps,

      evidenceLink:
        formData.evidenceLink,

      impact:
        formData.impact,

      ticketUrl:
        formData.ticketUrl,

      qaComments:
        !isDev
          ? formData.qaComments
          : bug?.qaComments || "",

      // ======================================
      // DEV INFORMATION
      // ======================================

      priority:
        isDev
          ? formData.priority
          : bug?.priority || "P2",

      status:
        isDev
          ? formData.status
          : bug?.status || "Open",

      developerName:
        isDev
          ? formData.developerName
          : bug?.developerName || "",

      developerComments:
        isDev
          ? formData.developerComments
          : bug?.developerComments || "",

      fixConfirmationStatus:
        isDev
          ? formData.fixConfirmationStatus
          : bug?.fixConfirmationStatus || "Not Confirmed",

      // ======================================
      // REPORT INFORMATION
      // ======================================

      reporter:
        bug
          ? bug.reporter
          : "Raily",

      date:
        bug
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

      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-8 shadow-xl">

        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {bug
                ? "Edit Bug"
                : "Report New Bug"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {isDev
                ? "DEV team access"
                : "QA team access"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* ==========================================
            FORM
        ========================================== */}

        <div className="grid gap-5 md:grid-cols-2">

          {/* ISSUE TITLE */}

          <div>
            <label className="text-sm font-semibold">
              Issue Title
            </label>

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                handleChange(
                  "title",
                  e.target.value
                )
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
              type="text"
              value={formData.version}
              readOnly={!!build}
              onChange={(e) =>
                handleChange(
                  "version",
                  e.target.value
                )
              }
              className={`mt-2 w-full rounded-xl border p-3 ${
                build
                  ? "cursor-not-allowed bg-slate-100 text-slate-500"
                  : ""
              }`}
              placeholder="Example: 2.5.4"
            />
          </div>

          {/* DEVICE */}

          <div>
            <label className="text-sm font-semibold">
              Device
            </label>

            <input
              type="text"
              value={formData.device}
              onChange={(e) =>
                handleChange(
                  "device",
                  e.target.value
                )
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
              type="text"
              value={formData.osVersion}
              onChange={(e) =>
                handleChange(
                  "osVersion",
                  e.target.value
                )
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="Example: iOS 18"
            />
          </div>

          {/* PRIORITY */}

          <div>
            <label className="text-sm font-semibold">
              Bug Priority
            </label>

            <select
              value={formData.priority}
              onChange={(e) =>
                handleChange(
                  "priority",
                  e.target.value
                )
              }
              disabled={!isDev}
              className="mt-2 w-full rounded-xl border p-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
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

            {!isDev && (
              <p className="mt-1 text-xs text-slate-500">
                Priority can only be changed by the DEV team.
              </p>
            )}
          </div>

          {/* REPRODUCIBLE */}

          <div>
            <label className="text-sm font-semibold">
              Reproducible
            </label>

            <select
              value={formData.reproducible}
              onChange={(e) =>
                handleChange(
                  "reproducible",
                  e.target.value
                )
              }
              className="mt-2 w-full rounded-xl border p-3"
            >
              <option value="Yes">
                Yes
              </option>

              <option value="No">
                No
              </option>

              <option value="Not Tested">
                Not Tested
              </option>
            </select>
          </div>

          {/* ISSUE IMPACT */}

          <div>
            <label className="text-sm font-semibold">
              QA Issue Impact
            </label>

            <select
              value={formData.impact}
              onChange={(e) =>
                handleChange(
                  "impact",
                  e.target.value
                )
              }
              className="mt-2 w-full rounded-xl border p-3"
            >
              <option value="Revenue Issue">
                Revenue Issue
              </option>

              <option value="User Issue">
                User Issue
              </option>

              <option value="Logging Issue">
                Logging Issue
              </option>

              <option value="Other Issue">
                Other Issue
              </option>

              <option value="Device Issue">
                Device Issue
              </option>

              <option value="SLED Issue">
                SLED Issue
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
                handleChange(
                  "status",
                  e.target.value
                )
              }
              disabled={!isDev}
              className="mt-2 w-full rounded-xl border p-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            >
              <option value="Open">
                Open
              </option>

              <option value="Investigation">
                Investigation
              </option>

              <option value="Ongoing Fix">
                Ongoing Fix
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="To Postpone">
                To Postpone
              </option>

              <option value="Not a Bug">
                Not a Bug
              </option>
            </select>

            {!isDev && (
              <p className="mt-1 text-xs text-slate-500">
                Status can only be changed by the DEV team.
              </p>
            )}
          </div>

          {/* TICKET URL */}

          <div>
            <label className="text-sm font-semibold">
              Ticket URL
              <span className="ml-1 font-normal text-slate-400">
                (optional)
              </span>
            </label>

            <input
              type="url"
              value={formData.ticketUrl}
              onChange={(e) =>
                handleChange(
                  "ticketUrl",
                  e.target.value
                )
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="https://..."
            />
          </div>

          {/* DEVELOPER NAME */}

          <div>
            <label className="text-sm font-semibold">
              Assigned Developer
            </label>

            <input
              type="text"
              value={formData.developerName}
              onChange={(e) =>
                handleChange(
                  "developerName",
                  e.target.value
                )
              }
              disabled={!isDev}
              className="mt-2 w-full rounded-xl border p-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
              placeholder="Developer name"
            />

            {!isDev && (
              <p className="mt-1 text-xs text-slate-500">
                Only the DEV team can assign a developer.
              </p>
            )}
          </div>

          {/* FIX CONFIRMATION STATUS */}

          <div>
            <label className="text-sm font-semibold">
              Fix Confirmation Status
            </label>

            <select
              value={
                formData.fixConfirmationStatus
              }
              onChange={(e) =>
                handleChange(
                  "fixConfirmationStatus",
                  e.target.value
                )
              }
              disabled={!isDev}
              className="mt-2 w-full rounded-xl border p-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            >
              <option value="Not Confirmed">
                Not Confirmed
              </option>

              <option value="Pending Confirmation">
                Pending Confirmation
              </option>

              <option value="Confirmed">
                Confirmed
              </option>

              <option value="Failed">
                Failed
              </option>
            </select>

            {!isDev && (
              <p className="mt-1 text-xs text-slate-500">
                Fix confirmation can only be changed by the DEV team.
              </p>
            )}
          </div>

        </div>

        {/* ==========================================
            STEPS TO REPRODUCE
        ========================================== */}

        <div className="mt-5">

          <label className="text-sm font-semibold">
            Steps to Reproduce
          </label>

          <textarea
            value={formData.steps}
            onChange={(e) =>
              handleChange(
                "steps",
                e.target.value
              )
            }
            className="mt-2 h-32 w-full rounded-xl border p-3"
            placeholder={"1. Open the game...\n2. Go to...\n3. Observe..."}
          />

        </div>

        {/* ==========================================
            EVIDENCE LINK
        ========================================== */}

        <div className="mt-5">

          <label className="text-sm font-semibold">
            Evidence Link
            <span className="ml-1 font-normal text-slate-400">
              (optional)
            </span>
          </label>

          <input
            type="url"
            value={formData.evidenceLink}
            onChange={(e) =>
              handleChange(
                "evidenceLink",
                e.target.value
              )
            }
            className="mt-2 w-full rounded-xl border p-3"
            placeholder="https://drive.google.com/..."
          />

        </div>

        {/* ==========================================
            QA COMMENTS
        ========================================== */}

        <div className="mt-5">

          <label className="text-sm font-semibold">
            QA Comments
          </label>

          <textarea
            value={formData.qaComments}
            onChange={(e) =>
              handleChange(
                "qaComments",
                e.target.value
              )
            }
            disabled={isDev}
            className="mt-2 h-24 w-full rounded-xl border p-3 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500"
            placeholder={
              isDev
                ? "Only the QA team can edit this field."
                : "Add QA comments..."
            }
          />

          {isDev && (
            <p className="mt-1 text-xs text-slate-500">
              QA comments can only be changed by the QA team.
            </p>
          )}

        </div>

        {/* ==========================================
            DEVELOPER COMMENTS
        ========================================== */}

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

        {/* ==========================================
            BUTTONS
        ========================================== */}

        <div className="mt-6 flex justify-end gap-3">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-5 py-3 font-medium hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {bug
              ? "Save Changes"
              : "Submit Bug"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ReportBugModal;