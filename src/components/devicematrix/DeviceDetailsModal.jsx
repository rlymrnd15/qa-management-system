function DeviceDetailsModal({
  device,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!device) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6">

        <h2 className="mb-4 text-2xl font-bold">
          Device Details
        </h2>

        <div className="space-y-3">
          <p><strong>Device:</strong> {device.device}</p>
          <p><strong>OS Version:</strong> {device.osVersion}</p>
          <p><strong>Tester:</strong> {device.tester}</p>
          <p><strong>Progress:</strong> {device.progress}%</p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => onDelete(device)}
            className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>

          <button
            onClick={() => onEdit(device)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Edit
          </button>

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:bg-slate-100"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default DeviceDetailsModal;