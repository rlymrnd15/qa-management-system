import {
  Package,
  Rocket,
  ArrowRight,
  Smartphone,
  CircleCheck,
  CircleAlert,
} from "lucide-react";

import deviceTests from "../../data/deviceTests";

function DeviceBuildCard({
  build,
  onOpen,
}) {
  const buildDevices = deviceTests.filter(
    (device) => device.build === build.version
  );

  const totalDevices = buildDevices.length;

  const passed = buildDevices.filter(
    (device) => device.progress === 100
  ).length;

  const failed = buildDevices.filter(
    (device) => device.uiTesting === "FAIL"
  ).length;

  const passedPercentage =
    totalDevices === 0
      ? 0
      : Math.round((passed / totalDevices) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          {build.latest ? (
            <Rocket className="text-blue-600" size={26} />
          ) : (
            <Package className="text-slate-500" size={26} />
          )}

          <div>
            <h2 className="text-2xl font-bold">
              Build v{build.version}
            </h2>

            <p className="text-sm text-slate-500">
              Released {build.releaseDate}
            </p>
          </div>

        </div>

        {build.latest && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Latest
          </span>
        )}

      </div>

      <div className="my-6 h-px bg-slate-200" />

      {/* Total Devices */}
      <div>

        <div className="flex items-center gap-2">

          <Smartphone
            className="text-blue-500"
            size={20}
          />

          <p className="text-sm font-medium text-slate-500">
            Devices Tested
          </p>

        </div>

        <h3 className="mt-2 text-5xl font-bold">
          {totalDevices}
        </h3>

      </div>

      {/* Progress */}
      <div className="mt-6">

        <div className="mb-2 flex justify-between">

          <p className="text-sm font-medium text-slate-500">
            Testing Progress
          </p>

          <p className="text-sm font-semibold text-blue-600">
            {passedPercentage}% Complete
          </p>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{
              width: `${passedPercentage}%`,
            }}
          />

        </div>

      </div>

      {/* Status */}
      <div className="mt-6 grid grid-cols-2 gap-4">

        <div className="rounded-xl bg-green-50 p-4">

          <CircleCheck
            className="mb-2 text-green-600"
            size={20}
          />

          <p className="text-sm text-slate-500">
            Passed
          </p>

          <h4 className="text-2xl font-bold">
            {passed}
          </h4>

        </div>

        <div className="rounded-xl bg-red-50 p-4">

          <CircleAlert
            className="mb-2 text-red-600"
            size={20}
          />

          <p className="text-sm text-slate-500">
            Failed
          </p>

          <h4 className="text-2xl font-bold">
            {failed}
          </h4>

        </div>

      </div>

      {/* Button */}
      <button
        onClick={onOpen}
        className="
          mt-8
          w-full
          rounded-xl
          bg-blue-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-blue-700
        "
      >
        <div className="flex items-center justify-center gap-2">
          Open Device Matrix
          <ArrowRight size={18} />
        </div>
      </button>

    </div>
  );
}

export default DeviceBuildCard;