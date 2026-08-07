import { useState } from "react";

import DeviceBuildCard from "../devicematrix/DeviceBuildCard";
import deviceBuilds from "../../data/deviceBuilds";
import deviceTestsData from "../../data/deviceTests";
import DeviceBuildDetails from "../devicematrix/DeviceBuildDetails";

function DeviceMatrix({
  game,
  platform,
}) {
  const [selectedBuild, setSelectedBuild] = useState(null);

  // Shared device test state
  const [deviceTests, setDeviceTests] = useState(
    deviceTestsData
  );

  // Only show builds for the selected game + platform
  const filteredBuilds = deviceBuilds.filter(
    (build) =>
      build.game === game &&
      build.platform === platform
  );

  // Calculate statistics from the current device test state
  const buildsWithStats = filteredBuilds.map((build) => {

    const buildDevices = deviceTests.filter(
      (device) =>
        device.game === game &&
        device.platform === platform &&
        device.build === build.version
    );
    

    const totalDevices = buildDevices.length;

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

    const passed = buildDevices.filter((device) => {

      const hasFail = testFields.some(
        (field) => device[field] === "FAIL"
      );

      return device.progress === 100 && !hasFail;

    }).length;

    const failed = buildDevices.filter((device) => {

      return testFields.some(
        (field) => device[field] === "FAIL"
      );

    }).length;

    return {
      ...build,
      totalDevices,
      passed,
      failed,
    };
  });

  // If a build is selected
  if (selectedBuild) {
    return (
      <DeviceBuildDetails
        build={selectedBuild}
        game={game}
        platform={platform}
        deviceTests={deviceTests}
        setDeviceTests={setDeviceTests}
        onBack={() => setSelectedBuild(null)}
      />
    );
  }

  return (
    <div>

      {/* Header */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Device Matrix
        </h1>

        <p className="mt-2 text-slate-500">
          View device testing results by build.
        </p>

      </div>

      {/* Build Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {buildsWithStats.map((build) => (

          <DeviceBuildCard
            key={build.id}
            build={build}
            onOpen={() => setSelectedBuild(build)}
          />

        ))}

      </div>

    </div>
  );
}

export default DeviceMatrix;