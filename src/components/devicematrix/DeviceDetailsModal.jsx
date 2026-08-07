import { X, Pencil, Trash2 } from "lucide-react";

function DeviceDetailsModal({
  device,
  onClose,
  onEdit,
  onDelete,
}) {
  if (!device) return null;

  const testResults = [
    {
      label: "General Test",
      value: device.generalTest,
    },
    {
      label: "Device Heating",
      value: device.deviceHeating,
    },
    {
      label: "Upgrade Testing",
      value: device.upgradeTesting,
    },
    {
      label: "Ads Testing",
      value: device.adsTesting,
    },
    {
      label: "UI Test",
      value: device.uiTesting,
    },
    {
      label: "Destructive Testing",
      value: device.destructiveTesting,
    },
    {
      label: "Bad Internet Connection",
      value: device.badInternet,
    },
    {
      label: "Performance Testing",
      value: device.performanceTesting,
    },
    {
      label: "IAP Testing",
      value: device.iapTesting,
    },
    {
      label: "Viral and Social",
      value: device.viralSocial,
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "PASS":
        return "bg-green-100 text-green-700";

      case "FAIL":
        return "bg-red-100 text-red-700";

      case "Not Run":
        return "bg-yellow-100 text-yellow-700";

      case "Not Applicable":
        return "bg-slate-100 text-slate-600";

      default:
        return "bg-slate-100 text-slate-600";
    }
  };

  const completedTests = testResults.filter(
    (test) => test.value !== "Not Run"
  ).length;

  const totalTests = testResults.length;

  const progress = Math.round(
    (completedTests / totalTests) * 100
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-start justify-between border-b p-6">

          <div>
            <h2 className="text-2xl font-bold">
              Device Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {device.device}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Device Information */}
        <div className="p-6">

          <h3 className="mb-4 text-lg font-semibold">
            Device Information
          </h3>

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Device
              </p>

              <p className="mt-1 font-semibold">
                {device.device}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                OS Version
              </p>

              <p className="mt-1 font-semibold">
                {device.osVersion}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Tester
              </p>

              <p className="mt-1 font-semibold">
                {device.tester}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Build
              </p>

              <p className="mt-1 font-semibold">
                v{device.build}
              </p>
            </div>

          </div>

          {/* Completion Progress */}
          <div className="mt-6 rounded-xl border p-5">

            <div className="mb-2 flex items-center justify-between">

              <div>
                <p className="font-semibold">
                  Completion Progress
                </p>

                <p className="text-sm text-slate-500">
                  {completedTests} / {totalTests} Tests Completed
                </p>
              </div>

              <p className="text-lg font-bold text-blue-600">
                {progress}%
              </p>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

          {/* Testing Results */}
          <div className="mt-8">

            <h3 className="mb-4 text-lg font-semibold">
              Testing Results
            </h3>

            <div className="overflow-hidden rounded-xl border">

              {testResults.map((test, index) => (

                <div
                  key={test.label}
                  className={`flex items-center justify-between px-5 py-4 ${
                    index !== testResults.length - 1
                      ? "border-b"
                      : ""
                  }`}
                >

                  <p className="font-medium text-slate-700">
                    {test.label}
                  </p>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${getStatusStyle(
                      test.value
                    )}`}
                  >
                    {test.value === "Not Applicable"
                      ? "N/A"
                      : test.value}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t bg-slate-50 p-6">

          <button
            onClick={() => onDelete(device)}
            className="flex items-center gap-2 rounded-xl px-5 py-3 font-semibold text-red-600 hover:bg-red-50"
          >
            <Trash2 size={18} />
            Delete
          </button>

          <button
            onClick={() => onEdit(device)}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={onClose}
            className="rounded-xl border bg-white px-5 py-3 font-semibold hover:bg-slate-100"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeviceDetailsModal;