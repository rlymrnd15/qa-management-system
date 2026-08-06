function DeviceTable({
  deviceList,
  onViewDevice,
}) {
  if (deviceList.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <p className="text-slate-500">
          No device tests found.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Device
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              OS Version
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Tester
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Progress
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold">
              Status
            </th>

          </tr>

        </thead>

        <tbody>

          {deviceList.map((device) => {

            const status =
              device.uiTesting === "FAIL"
                ? "FAIL"
                : "PASS";

            return (

              <tr
                key={device.id}
                onClick={() => onViewDevice(device)}
                className="cursor-pointer border-t hover:bg-slate-50"
              >

                <td className="px-6 py-4 font-medium">
                  {device.device}
                </td>

                <td className="px-6 py-4">
                  {device.osVersion}
                </td>

                <td className="px-6 py-4">
                  {device.tester}
                </td>

                <td className="px-6 py-4">
                  {device.progress}%
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      status === "PASS"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status}
                  </span>

                </td>

              </tr>

            );
          })}

        </tbody>

      </table>

    </div>
  );
}

export default DeviceTable;