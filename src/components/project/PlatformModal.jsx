import { X } from "lucide-react";

function PlatformModal({ project, isOpen, onClose, onSelectPlatform }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {project.name}
            </h2>

            <p className="text-sm text-gray-500">
              Select a platform to continue
            </p>
          </div>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="space-y-3">
          {project.platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => onSelectPlatform(platform)}
              className="w-full rounded-xl border p-4 text-left transition hover:border-blue-500 hover:bg-blue-50"
            >
              {platform}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlatformModal;