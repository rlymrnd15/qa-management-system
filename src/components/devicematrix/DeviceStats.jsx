function DeviceStats({ deviceList }) {
  const total = deviceList.length;

  const passed = deviceList.filter(
    (device) => device.progress === 100
  ).length;

  const failed = deviceList.filter(
    (device) => device.uiTesting === "FAIL"
  ).length;

  return (
    <div className="mb-8 grid gap-4 md:grid-cols-3">

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-slate-500">
          Devices Tested
        </p>

        <h2 className="mt-2 text-4xl font-bold">
          {total}
        </h2>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm">
        <p className="text-slate-500">
          Passed
        </p>

        <h2 className="mt-2 text-4xl font-bold text-green-600">
          {passed}
        </h2>
      </div>

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