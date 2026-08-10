import {
  ArrowLeft,
  Smartphone,
  CircleCheck,
  CircleAlert,
  CircleMinus,
} from "lucide-react";

function DeviceBuildDetails({
  build,
  game,
  platform,
  deviceTests,
  onBack,
}) {
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

  const testLabels = {
    generalTest: "General Test",
    deviceHeating: "Device Heating",
    upgradeTesting: "Upgrade Testing",
    adsTesting: "Ads Testing",
    uiTesting: "UI Testing",
    destructiveTesting: "Destructive Testing",
    badInternet: "Bad Internet",
    performanceTesting: "Performance Testing",
    iapTesting: "IAP Testing",
    viralSocial: "Viral / Social",
  };

  // Get devices belonging to this build
  const buildDevices = deviceTests.filter(
    (device) =>
      device.game === build.game &&
      device.platform === build.platform &&
      device.build === build.version
  );

  // ==========================================
  // DEVICE STATUS HELPER
  // ==========================================
  const getDeviceStatus = (device) => {
    const hasFail = testFields.some(
      (field) =>
        String(device[field] || "").toUpperCase() === "FAIL"
    );

    const allTestsPassed = testFields.every(
      (field) =>
        String(device[field] || "").toUpperCase() === "PASS"
    );

    const allTestsAnswered = testFields.every(
      (field) => {
        const value = String(
          device[field] || ""
        ).toUpperCase();

        return value === "PASS" || value === "FAIL";
      }
    );

    const isPassed =
      Number(device.progress) === 100 &&
      allTestsAnswered &&
      allTestsPassed;

    const isFailed = hasFail;

    const isIncomplete =
      !isPassed && !isFailed;

    return {
      isPassed,
      isFailed,
      isIncomplete,
    };
  };

  // ==========================================
  // SUMMARY COUNTS
  // ==========================================

  const passed = buildDevices.filter(
    (device) => getDeviceStatus(device).isPassed
  ).length;

  const failed = buildDevices.filter(
    (device) => getDeviceStatus(device).isFailed
  ).length;

  const incomplete = buildDevices.filter(
    (device) => getDeviceStatus(device).isIncomplete
  ).length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">

        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} />
          Back to Builds
        </button>

        <div className="flex items-start justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Build v{build.version}
            </h1>

            <p className="mt-2 text-slate-500">
              {game} • {platform}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Released {build.releaseDate}
            </p>
          </div>

          {build.latest && (
            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
              Latest
            </span>
          )}

        </div>
      </div>

      {/* Summary */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {/* Total */}
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
            {buildDevices.length}
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

            <CircleMinus
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

      {/* Device Tests */}
      <div>

        <h2 className="mb-4 text-2xl font-bold">
          Device Tests
        </h2>

        {buildDevices.length === 0 ? (

          <div className="rounded-2xl border bg-white p-8 text-center">

            <Smartphone
              className="mx-auto mb-3 text-slate-400"
              size={36}
            />

            <p className="font-semibold text-slate-700">
              No device tests yet
            </p>

            <p className="mt-1 text-sm text-slate-500">
              No devices have been tested on this build.
            </p>

          </div>

        ) : (

          <div className="grid gap-4">

            {buildDevices.map((device, index) => {

              const {
                isPassed,
                isFailed,
                isIncomplete,
              } = getDeviceStatus(device);

              return (
                <div
                  key={device.id || index}
                  className="rounded-2xl border bg-white p-6 shadow-sm"
                >

                  {/* Device Header */}
                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <Smartphone
                        className="text-blue-600"
                        size={24}
                      />

                      <div>

                        <h3 className="font-bold">
                          {device.deviceName ||
                            device.device ||
                            `Device ${index + 1}`}
                        </h3>

                        <p className="text-sm text-slate-500">
                          Progress: {device.progress || 0}%
                        </p>

                      </div>

                    </div>

                    {/* Overall Device Status */}

                    {isPassed && (

                      <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                        <CircleCheck size={16} />
                        Passed
                      </span>

                    )}

                    {isFailed && (

                      <span className="flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">
                        <CircleAlert size={16} />
                        Failed
                      </span>

                    )}

                    {isIncomplete && (

                      <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        <CircleMinus size={16} />
                        Incomplete
                      </span>

                    )}

                  </div>

                  {/* Test Results */}
                  <div className="mt-6 border-t pt-5">

                    <h4 className="mb-4 text-sm font-bold text-slate-700">
                      Test Results
                    </h4>

                    <div className="grid gap-3 sm:grid-cols-2">

                      {testFields.map((field) => {

                        const value =
                          device[field] || "NOT TESTED";

                        const label =
                          testLabels[field];

                        const normalizedValue =
                          String(value).toUpperCase();

                        const passedTest =
                          normalizedValue === "PASS";

                        const failedTest =
                          normalizedValue === "FAIL";

                        return (
                          <div
                            key={field}
                            className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                          >

                            <span className="text-sm font-medium text-slate-700">
                              {label}
                            </span>

                            {passedTest && (

                              <span className="flex items-center gap-1 text-sm font-semibold text-green-600">
                                <CircleCheck size={16} />
                                PASS
                              </span>

                            )}

                            {failedTest && (

                              <span className="flex items-center gap-1 text-sm font-semibold text-red-600">
                                <CircleAlert size={16} />
                                FAIL
                              </span>

                            )}

                            {!passedTest &&
                              !failedTest && (

                                <span className="text-sm font-semibold text-slate-400">
                                  {value}
                                </span>

                              )}

                          </div>
                        );
                      })}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default DeviceBuildDetails;
