import {
  Smartphone,
  CircleCheck,
  CircleAlert,
  Clock,
} from "lucide-react";

function DeviceTable({
  deviceList,
  onViewDevice,
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

  const getDeviceStatus = (device) => {
    const hasFail = testFields.some(
      (field) => device[field] === "FAIL"
    );

    if (hasFail) {
      return "FAILED";
    }

    const allTestsPassed = testFields.every(
      (field) => device[field] === "PASS"
    );

    if (
      device.progress === 100 &&
      allTestsPassed
    ) {
      return "PASSED";
    }

    return "INCOMPLETE";
  };

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="border-b bg-slate-50">

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

          {deviceList.map((device, index) => {

            const status = getDeviceStatus(device);

            return (
              <tr
                key={device.id || index}
                onClick={() => onViewDevice(device)}
                className="cursor-pointer border-b last:border-b-0 hover:bg-slate-50"
              >

                {/* Device */}
                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <Smartphone
                      className="text-blue-600"
                      size={20}
                    />

                    <span className="font-semibold">
                      {device.deviceName ||
                        device.device ||
                        `Device ${index + 1}`}
                    </span>

                  </div>

                </td>

                {/* OS Version */}
                <td className="px-6 py-5 text-sm text-slate-600">
                  {device.osVersion || "-"}
                </td>

                {/* Tester */}
                <td className="px-6 py-5 text-sm text-slate-600">
                  {device.tester || "-"}
                </td>

                {/* Progress */}
                <td className="px-6 py-5">

                  <span className="font-medium">
                    {device.progress || 0}%
                  </span>

                </td>

                {/* Status */}
                <td className="px-6 py-5">

                  {status === "PASSED" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

                      <CircleCheck size={16} />

                      PASS

                    </span>
                  )}

                  {status === "FAILED" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-700">

                      <CircleAlert size={16} />

                      FAIL

                    </span>
                  )}

                  {status === "INCOMPLETE" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">

                      <Clock size={16} />

                      INCOMPLETE

                    </span>
                  )}

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