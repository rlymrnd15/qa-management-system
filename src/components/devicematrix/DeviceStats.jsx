import {
  Smartphone,
  CircleCheck,
  CircleAlert,
  Clock,
} from "lucide-react";

function DeviceStats({ deviceList }) {
  const testFields = [
    "generalTest",
    "deviceHeating",
    "upgradeTesting",
    "adsTesting",
    "uiTesting",
    "destructiveTesting",
    "badInternet",
    "performanceTesting",
    "iapTesting",
    "viralSocial",
  ];

  const passed = deviceList.filter((device) => {
    const allTestsPassed = testFields.every(
      (field) => device[field] === "PASS"
    );

    return (
      device.progress === 100 &&
      allTestsPassed
    );
  }).length;

  const failed = deviceList.filter((device) => {
    return testFields.some(
      (field) => device[field] === "FAIL"
    );
  }).length;

  const incomplete = deviceList.filter((device) => {
    const hasFail = testFields.some(
      (field) => device[field] === "FAIL"
    );

    const allTestsPassed = testFields.every(
      (field) => device[field] === "PASS"
    );

    return (
      !hasFail &&
      !(
        device.progress === 100 &&
        allTestsPassed
      )
    );
  }).length;

  return (
    <div className="mb-8 grid gap-6 md:grid-cols-4">

      {/* Devices Tested */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">

        <div className="flex items-center gap-2">

          <Smartphone
            className="text-blue-600"
            size={20}
          />

          <p className="text-sm font-medium text-slate-500">
            Devices Tested
          </p>

        </div>

        <h2 className="mt-3 text-4xl font-bold">
          {deviceList.length}
        </h2>

      </div>

      {/* Passed */}
      <div className="rounded-2xl border bg-green-50 p-6">

        <div className="flex items-center gap-2">

          <CircleCheck
            className="text-green-600"
            size={20}
          />

          <p className="text-sm font-medium text-slate-500">
            Passed
          </p>

        </div>

        <h2 className="mt-3 text-4xl font-bold text-green-700">
          {passed}
        </h2>

      </div>

      {/* Failed */}
      <div className="rounded-2xl border bg-red-50 p-6">

        <div className="flex items-center gap-2">

          <CircleAlert
            className="text-red-600"
            size={20}
          />

          <p className="text-sm font-medium text-slate-500">
            Failed
          </p>

        </div>

        <h2 className="mt-3 text-4xl font-bold text-red-700">
          {failed}
        </h2>

      </div>

      {/* Incomplete */}
      <div className="rounded-2xl border bg-yellow-50 p-6">

        <div className="flex items-center gap-2">

          <Clock
            className="text-yellow-600"
            size={20}
          />

          <p className="text-sm font-medium text-slate-500">
            Incomplete
          </p>

        </div>

        <h2 className="mt-3 text-4xl font-bold text-yellow-700">
          {incomplete}
        </h2>

      </div>

    </div>
  );
}

export default DeviceStats;