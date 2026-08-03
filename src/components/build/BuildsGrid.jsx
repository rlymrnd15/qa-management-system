import BuildCard from "./BuildCard";

function BuildsGrid({
  builds,
  onSelectBuild,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {builds.map((build) => (
        <BuildCard
          key={build.id}
          build={build}
          onClick={() => onSelectBuild(build)}
        />
      ))}
    </div>
  );
}

export default BuildsGrid;