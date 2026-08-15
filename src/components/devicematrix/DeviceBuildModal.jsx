import { useEffect, useState } from "react";

function DeviceBuildModal({
  isOpen,
  onClose,
  onSubmit,
  build,
  game,
  platform,
}) {
  const [version, setVersion] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [latest, setLatest] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (build) {
      setVersion(build.version || "");
      setReleaseDate(build.releaseDate || "");
      setLatest(build.latest || false);
      setDescription(build.description || "");
    } else {
      setVersion("");
      setReleaseDate("");
      setLatest(false);
      setDescription("");
    }
  }, [build, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!version || !releaseDate) {
      alert("Please complete all required fields.");
      return;
    }

    onSubmit({
      ...(build || {}),
      game,
      platform,
      version,
      releaseDate,
      latest,
      description,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">
            {build ? "Edit Build" : "Add Build"}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {build
              ? "Update the build information."
              : "Add a new game build to the Device Matrix."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Game */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Game
            </label>

            <div className="w-full rounded-lg border bg-slate-50 px-4 py-3 font-medium">
              {game}
            </div>
          </div>

          {/* Platform */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Platform
            </label>

            <div className="w-full rounded-lg border bg-slate-50 px-4 py-3 font-medium capitalize">
              {platform}
            </div>
          </div>

          {/* Version */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Build Version
            </label>

            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              placeholder="Example: 2.5.3"
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Release Date */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Release Date
            </label>

            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />
          </div>

          {/* Build Description */}
          <div>
            <label className="mb-2 block text-sm font-semibold">
              Build Description / DEV Notes
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the changes, fixes, updates, or important testing notes for this build..."
              className="h-28 w-full resize-none rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
            />

            <p className="mt-1 text-xs text-slate-500">
              Add any important information that QA should know about this build.
            </p>
          </div>

          {/* Latest */}
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={latest}
              onChange={(e) => setLatest(e.target.checked)}
              className="h-4 w-4"
            />

            <span className="text-sm font-medium">
              Mark as latest build
            </span>
          </label>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-5 py-2.5 font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700"
            >
              {build ? "Save Changes" : "Add Build"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default DeviceBuildModal;