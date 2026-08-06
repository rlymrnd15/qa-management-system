import { useEffect, useState } from "react";
import { X } from "lucide-react";

function DeviceTestModal({
  isOpen,
  onClose,
  onSubmit,
  device = null,
  build = null,
  game = null,
  platform = null,
}) {
  const initialFormData = {
    device: "",
    osVersion: "",
    tester: "",

    generalTest: "Not Run",
    deviceHeating: "Not Run",
    upgradeTesting: "Not Run",
    adsTesting: "Not Run",
    uiTesting: "Not Run",
    destructiveTesting: "Not Run",
    badInternet: "Not Run",
    performanceTesting: "Not Run",
    iapTesting: "Not Applicable",
    viralSocial: "Not Applicable",

    progress: 0,
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (device) {
      setFormData({
        device: device.device || "",
        osVersion: device.osVersion || "",
        tester: device.tester || "",

        generalTest: device.generalTest || "Not Run",
        deviceHeating: device.deviceHeating || "Not Run",
        upgradeTesting: device.upgradeTesting || "Not Run",
        adsTesting: device.adsTesting || "Not Run",
        uiTesting: device.uiTesting || "Not Run",
        destructiveTesting: device.destructiveTesting || "Not Run",
        badInternet: device.badInternet || "Not Run",
        performanceTesting: device.performanceTesting || "Not Run",
        iapTesting: device.iapTesting || "Not Applicable",
        viralSocial: device.viralSocial || "Not Applicable",

        progress: device.progress ?? 0,
      });
    } else {
      setFormData(initialFormData);
    }
  }, [device, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const testResults = [
        formData.generalTest,
        formData.deviceHeating,
        formData.upgradeTesting,
        formData.adsTesting,
        formData.uiTesting,
        formData.destructiveTesting,
        formData.badInternet,
        formData.performanceTesting,
        formData.iapTesting,
        formData.viralSocial,
        ];

    const completed = testResults.filter(
        (result) => result !== "Not Run"
    ).length;

    const progress = Math.round(
        (completed / testResults.length) * 100
    );

    const newDevice = {
      id: device ? device.id : Date.now(),

      game: game || device?.game,
      platform: platform || device?.platform,
      build: build?.version || device?.build,

      ...formData,

      progress,
    };

    onSubmit(newDevice);
  };

  const testFields = [
    {
      label: "General Test",
      field: "generalTest",
    },
    {
      label: "Device Heating",
      field: "deviceHeating",
    },
    {
      label: "Upgrade Testing",
      field: "upgradeTesting",
    },
    {
      label: "Ads Testing",
      field: "adsTesting",
    },
    {
      label: "UI Test",
      field: "uiTesting",
    },
    {
      label: "Destructive Testing",
      field: "destructiveTesting",
    },
    {
      label: "Bad Internet Connection",
      field: "badInternet",
    },
    {
      label: "Performance Testing",
      field: "performanceTesting",
    },
    {
      label: "IAP Testing",
      field: "iapTesting",
    },
    {
      label: "Viral and Social",
      field: "viralSocial",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-8">

        {/* Header */}
        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold">
              {device ? "Edit Device Test" : "Add Device Test"}
            </h2>

            {build && (
              <p className="mt-1 text-sm text-slate-500">
                Build v{build.version}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Device Information */}
        <h3 className="mb-4 text-lg font-semibold">
          Device Information
        </h3>

        <div className="grid gap-5 md:grid-cols-2">

          {/* Device */}
          <div>
            <label className="text-sm font-semibold">
              Device
            </label>

            <input
              type="text"
              value={formData.device}
              onChange={(e) =>
                handleChange("device", e.target.value)
              }
              placeholder="Example: iPhone 12 Mini"
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          {/* OS Version */}
          <div>
            <label className="text-sm font-semibold">
              OS Version
            </label>

            <input
              type="text"
              value={formData.osVersion}
              onChange={(e) =>
                handleChange("osVersion", e.target.value)
              }
              placeholder="Example: iOS 16.1.2"
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

          {/* Tester */}
          <div>
            <label className="text-sm font-semibold">
              Tester
            </label>

            <input
              type="text"
              value={formData.tester}
              onChange={(e) =>
                handleChange("tester", e.target.value)
              }
              placeholder="Tester name"
              className="mt-2 w-full rounded-xl border p-3"
            />
          </div>

        </div>

        {/* Testing Results */}
        <div className="my-6 h-px bg-slate-200" />

        <h3 className="mb-4 text-lg font-semibold">
          Testing Results
        </h3>

        <div className="grid gap-5 md:grid-cols-2">

          {testFields.map((test) => (
            <div key={test.field}>

              <label className="text-sm font-semibold">
                {test.label}
              </label>

              <select
                value={formData[test.field]}
                onChange={(e) =>
                  handleChange(
                    test.field,
                    e.target.value
                  )
                }
                className="mt-2 w-full rounded-xl border p-3"
              >
                <option value="Not Run">
                  Not Run
                </option>

                <option value="PASS">
                  PASS
                </option>

                <option value="FAIL">
                  FAIL
                </option>

                <option value="Not Applicable">
                  Not Applicable
                </option>
              </select>

            </div>
          ))}

        </div>

        {/* Buttons */}
        <div className="mt-8 flex justify-end gap-3">

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
            {device ? "Save Changes" : "Add Device Test"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeviceTestModal;