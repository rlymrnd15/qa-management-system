import { useEffect, useState } from "react";
import { X } from "lucide-react";

function AddBuildModal({
  isOpen,
  onClose,
  onSubmit,
  build = null,
}) {
  const [formData, setFormData] = useState({
    version: "",
    releaseDate: "",
    latest: false,
  });

  useEffect(() => {
    if (build) {
      setFormData({
        version: build.version || "",
        releaseDate: build.releaseDate || "",
        latest: build.latest || false,
      });
    } else {
      setFormData({
        version: "",
        releaseDate: "",
        latest: false,
      });
    }
  }, [build, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!formData.version.trim()) {
      alert("Please enter a build version.");
      return;
    }

    if (!formData.releaseDate.trim()) {
      alert("Please enter a release date.");
      return;
    }

    const newBuild = {
      id: build?.id || Date.now(),
      version: formData.version.trim(),
      releaseDate: formData.releaseDate.trim(),
      latest: formData.latest,
    };

    onSubmit(newBuild);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {build ? "Edit Build" : "Add New Build"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Version */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-slate-700">
            Build Version
          </label>

          <input
            type="text"
            value={formData.version}
            onChange={(e) =>
              setFormData({
                ...formData,
                version: e.target.value,
              })
            }
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            placeholder="Example: 2.5.3"
          />
        </div>

        {/* Release Date */}
        <div className="mb-5">
          <label className="text-sm font-semibold text-slate-700">
            Release Date
          </label>

          <input
            type="date"
            value={formData.releaseDate}
            onChange={(e) =>
                setFormData({
                ...formData,
                releaseDate: e.target.value,
                })
            }
            className="mt-2 w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-blue-500"
            />
        </div>

        {/* Latest */}
        <label className="mb-6 flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={formData.latest}
            onChange={(e) =>
              setFormData({
                ...formData,
                latest: e.target.checked,
              })
            }
            className="h-4 w-4"
          />

          <span className="text-sm font-medium text-slate-700">
            Mark as latest build
          </span>
        </label>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-xl px-5 py-3 font-medium hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {build ? "Save Changes" : "Add Build"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default AddBuildModal;