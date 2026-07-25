import { useEffect, useState } from "react";
import { X } from "lucide-react";

function ReportBugModal({
  isOpen,
  onClose,
  onSubmit,
  bug = null,
}) {
  const [formData, setFormData] = useState({
    title: "",
    version: "",
    device: "",
    osVersion: "",
    priority: "P2",
    impact: "User Issue",
    steps: "",
    developerComments: "",
  });

  useEffect(() => {
    if (bug) {
      setFormData({
        title: bug.title || "",
        version: bug.version || "",
        device: bug.device || "",
        osVersion: bug.osVersion || "",
        priority: bug.priority || "P2",
        impact: bug.impact || "User Issue",
        steps: bug.steps || "",
        developerComments: bug.developerComments || "",
      });
    } else {
      setFormData({
        title: "",
        version: "",
        device: "",
        osVersion: "",
        priority: "P2",
        impact: "User Issue",
        steps: "",
        developerComments: "",
      });
    }
  }, [bug, isOpen]);

  const handleSubmit = () => {
    const newBug = {
      id: bug ? bug.id : Date.now(),
      title: formData.title,
      priority: formData.priority,
      impact: formData.impact,
      device: formData.device,
      version: formData.version,
      osVersion: formData.osVersion,
      steps: formData.steps,
      developerComments: formData.developerComments,
      status: bug ? bug.status : "Open",
      reporter: bug ? bug.reporter : "Raily",
      date: bug ? bug.date : new Date().toLocaleDateString(),
    };

    onSubmit(newBug);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {bug ? "Edit Bug" : "Report New Bug"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Form */}
        <div className="grid gap-5 md:grid-cols-2">

          <div>
            <label className="text-sm font-semibold">
              Issue Title
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
              placeholder="Enter bug title"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              Version Number
            </label>

            <input
              value={formData.version}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  version: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="Example: 2.5.1"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              Device
            </label>

            <input
              value={formData.device}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  device: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="Example: iPhone 15"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              OS Version
            </label>

            <input
              value={formData.osVersion}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  osVersion: e.target.value,
                })
              }
              className="mt-2 w-full rounded-xl border p-3"
              placeholder="Example: iOS 18"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">
              QA Bug Priority
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
              <option>P0</option>
              <option>P1</option>
              <option>P2</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">
              Issue Impact
            </label>

            <select
              value={formData.impact}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  impact: e.target.value,
                })
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

        <div className="mt-5">
          <label className="text-sm font-semibold">
            Steps to Reproduce
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
            placeholder="1. Open game..."
          />
        </div>

        <div className="mt-5">
          <label className="text-sm font-semibold">
            Developer Comments
          </label>

          <textarea
            value={formData.developerComments}
            onChange={(e) =>
              setFormData({
                ...formData,
                developerComments: e.target.value,
              })
            }
            className="mt-2 h-24 w-full rounded-xl border p-3"
          />
        </div>

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