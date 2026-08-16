import BuildCard from "./BuildCard";

function BuildsGrid({
  builds,
  bugs,
  isDev,
  onSelectBuild,
  onEditBuild,
  onDeleteBuild,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {builds.map((build) => (
        <BuildCard
          key={build.id}
          build={build}
          bugs={bugs}
          isDev={isDev}
          onClick={onSelectBuild}
          onEdit={onEditBuild}
          onDelete={onDeleteBuild}
        />
      ))}
    </div>
  );
}

export default BuildsGrid;