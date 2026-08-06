import { useState } from "react";
import DeviceBuildCard from "../devicematrix/DeviceBuildCard";
import deviceBuilds from "../../data/deviceBuilds";
import DeviceBuildDetails from "../devicematrix/DeviceBuildDetails";

function DeviceMatrix({
  game,
  platform,
}) {
  console.log("Game:", game);
  console.log("Platform:", platform);
  console.log(deviceBuilds);
  
  const [selectedBuild, setSelectedBuild] = useState(null);

  if (selectedBuild) {
  return (
    <DeviceBuildDetails
      build={selectedBuild}
      game={game}
      platform={platform}
      onBack={() => setSelectedBuild(null)}
    />
  );
}

const filteredBuilds = deviceBuilds.filter(
  (build) =>
    build.game === game &&
    build.platform === platform
);

console.log("Game prop:", game);
console.log("Platform prop:", platform);
console.log("Filtered Builds:", filteredBuilds);

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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredBuilds.map((build) => (
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