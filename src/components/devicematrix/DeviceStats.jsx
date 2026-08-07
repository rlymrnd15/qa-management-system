function DeviceStats({ deviceList }) {
  const total = deviceList.length;

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

  // A device is FAILED if at least one test has FAIL
  const failed = deviceList.filter((device) =>
    testFields.some(
      (field) => device[field] === "FAIL"
    )
  ).length;

  // A device is PASSED if:
  // 1. All tests are completed
  // 2. No test has FAIL
  const passed = deviceList.filter((device) => {

    const hasFailedTest = testFields.some(
      (field) => device[field] === "FAIL"
    );

    const allTestsCompleted = testFields.every(
      (field) =>
        device[field] !== "Not Run" &&
        device[field] !== undefined
    );

    return allTestsCompleted && !hasFailedTest;

  }).length;

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">

      {/* Devices Tested */}
      <div className="rounded-xl bg-white p-6 shadow-sm">

        <p className="text-slate-500">
          Devices Tested
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {total}
        </h2>

      </div>

      {/* Passed */}
      <div className="rounded-xl bg-white p-6 shadow-sm">

        <p className="text-slate-500">
          Passed
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-600">
          {passed}
        </h2>

      </div>

      {/* Failed */}
      <div className="rounded-xl bg-white p-6 shadow-sm">

        <p className="text-slate-500">
          Failed
        </p>

        <h2 className="mt-2 text-4xl font-bold text-red-600">
          {failed}
        </h2>

      </div>

    </div>
  );
}

export default DeviceStats;