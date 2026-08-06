import { useState } from "react";
import deviceTests from "../../data/deviceTests";

import DeviceStats from "./DeviceStats";
import DeviceSearchFilters from "./DeviceSearchFilters";
import DeviceTable from "./DeviceTable";
import DeviceDetailsModal from "./DeviceDetailsModal";
import DeviceTestModal from "./DeviceTestModal";

function DeviceBuildDetails({
  build,
  onBack,
  game,
  platform,
}) {

  const buildDevices = deviceTests.filter(
  (device) =>
    device.build === build.version &&
    device.game === game &&
    device.platform === platform
);

const [deviceList, setDeviceList] = useState(buildDevices);

const [search, setSearch] = useState("");

const [selectedDevice, setSelectedDevice] = useState(null);

const [editingDevice, setEditingDevice] = useState(null);

const [openModal, setOpenModal] = useState(false);

const filteredDevices = deviceList.filter((device) =>
  device.device
    .toLowerCase()
    .includes(search.toLowerCase())
);

  return (
    <div>

      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 rounded-lg border px-4 py-2 hover:bg-slate-100"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Build v{build.version}
        </h1>

        <p className="mt-2 text-slate-500">
          Released {build.releaseDate}
        </p>

      </div>

      <button
        onClick={() => setOpenModal(true)}
        className="mb-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
        + Add Device Test
    </button>

      {/* Device Matrix Components */}
      <DeviceStats deviceList={filteredDevices} />

<DeviceSearchFilters
  search={search}
  setSearch={setSearch}
/>

<DeviceTable
  deviceList={filteredDevices}
  onViewDevice={(device) =>
    setSelectedDevice(device)
  }
/>

<DeviceDetailsModal
  device={selectedDevice}
  onClose={() => setSelectedDevice(null)}
  onEdit={(device) => {
    setEditingDevice(device);
    setOpenModal(true);
    setSelectedDevice(null);
  }}
  onDelete={(device) => {
    setDeviceList((prev) =>
      prev.filter((item) => item.id !== device.id)
    );

    setSelectedDevice(null);
  }}
/>

    <DeviceTestModal
        isOpen={openModal}

        build={build}
        game={game}
        platform={platform}

        device={editingDevice}

        onClose={() => {
            setOpenModal(false);
            setEditingDevice(null);
        }}

        onSubmit={(newDevice) => {
            if (editingDevice) {
            setDeviceList((prev) =>
                prev.map((item) =>
                item.id === newDevice.id
                    ? newDevice
                    : item
                )
            );
            } else {
            setDeviceList((prev) => [
                newDevice,
                ...prev,
            ]);
            }

            setEditingDevice(null);
            setOpenModal(false);
        }}
        />
    </div>
  );
}

export default DeviceBuildDetails;