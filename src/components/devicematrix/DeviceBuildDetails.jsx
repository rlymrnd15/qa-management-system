import { useEffect, useState } from "react";

import DeviceStats from "./DeviceStats";
import DeviceSearchFilters from "./DeviceSearchFilters";
import DeviceTable from "./DeviceTable";
import DeviceDetailsModal from "./DeviceDetailsModal";
import DeviceTestModal from "./DeviceTestModal";

import {
  addDeviceTest,
  updateDeviceTest,
  deleteDeviceTest,
} from "../../services/deviceTestService";

function DeviceBuildDetails({
  build,
  onBack,
  game,
  platform,
  deviceTests,
  setDeviceTests,
}) {
  const [deviceList, setDeviceList] = useState([]);

  const [search, setSearch] = useState("");

  const [selectedDevice, setSelectedDevice] = useState(null);

  const [editingDevice, setEditingDevice] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  // ==========================================
  // GET DEVICES FOR CURRENT BUILD
  // ==========================================

  useEffect(() => {
    const buildDevices = deviceTests.filter(
      (device) =>
        device.build === build.version &&
        device.game === game &&
        device.platform === platform
    );

    setDeviceList(buildDevices);
  }, [
    deviceTests,
    build.version,
    game,
    platform,
  ]);

  // ==========================================
  // SEARCH DEVICES
  // ==========================================

  const filteredDevices = deviceList.filter((device) => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return true;
    }

    return (
      String(device.device || "")
        .toLowerCase()
        .includes(searchValue) ||

      String(device.osVersion || "")
        .toLowerCase()
        .includes(searchValue) ||

      String(device.build || "")
        .toLowerCase()
        .includes(searchValue)
    );
  });

  // ==========================================
  // DELETE DEVICE
  // ==========================================

  const handleDelete = async (device) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the device test for ${device.device}?`
    );

    if (!confirmed) return;

    try {
      await deleteDeviceTest(device.id);

      setDeviceList((prev) =>
        prev.filter(
          (item) => item.id !== device.id
        )
      );

      setDeviceTests((prev) =>
        prev.filter(
          (item) => item.id !== device.id
        )
      );

      setSelectedDevice(null);

    } catch (error) {
      console.error(
        "Error deleting device test:",
        error
      );

      alert("Failed to delete device test.");
    }
  };

  // ==========================================
  // ADD / EDIT DEVICE
  // ==========================================

  const handleSubmit = async (newDevice) => {
    try {
      if (editingDevice) {

        // UPDATE FIRESTORE
        const updatedDevice =
          await updateDeviceTest(
            editingDevice.id,
            newDevice
          );

        // UPDATE CURRENT BUILD
        setDeviceList((prev) =>
          prev.map((item) =>
            item.id === editingDevice.id
              ? updatedDevice
              : item
          )
        );

        // UPDATE SHARED DEVICE DATA
        setDeviceTests((prev) =>
          prev.map((item) =>
            item.id === editingDevice.id
              ? updatedDevice
              : item
          )
        );

      } else {

        // ADD TO FIRESTORE
        const addedDevice =
          await addDeviceTest(newDevice);

        // ADD TO CURRENT BUILD
        setDeviceList((prev) => [
          addedDevice,
          ...prev,
        ]);

        // ADD TO SHARED DATA
        setDeviceTests((prev) => [
          addedDevice,
          ...prev,
        ]);
      }

      setEditingDevice(null);
      setOpenModal(false);

    } catch (error) {
      console.error(
        "Error saving device test:",
        error
      );

      alert("Failed to save device test.");
    }
  };

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

      {/* Add Device Test */}
      <button
        onClick={() => {
          setEditingDevice(null);
          setOpenModal(true);
        }}
        className="mb-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        + Add Device Test
      </button>

      {/* Device Stats */}
      <DeviceStats
        deviceList={deviceList}
      />

      {/* Search */}
      <DeviceSearchFilters
        search={search}
        setSearch={setSearch}
      />

      {/* Device Table */}
      <DeviceTable
        deviceList={filteredDevices}
        onViewDevice={(device) =>
          setSelectedDevice(device)
        }
      />

      {/* Device Details */}
      <DeviceDetailsModal
        device={selectedDevice}
        onClose={() =>
          setSelectedDevice(null)
        }
        onEdit={(device) => {
          setEditingDevice(device);
          setOpenModal(true);
          setSelectedDevice(null);
        }}
        onDelete={handleDelete}
      />

      {/* Add / Edit Device */}
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
        onSubmit={handleSubmit}
      />

    </div>
  );
}

export default DeviceBuildDetails;