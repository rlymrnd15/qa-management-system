import BuildCard from "./BuildCard";

function BuildsGrid({
  builds,
  bugs,
  onSelectBuild,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">

      {builds.map((build) => (
        <BuildCard
          key={build.id}
          build={build}
          bugs={bugs}
          onClick={() => {
            console.log("GRID CLICK:", build);
            onSelectBuild(build);
          }}
        />
      ))}

    </div>
  );
}

export default BuildsGrid;