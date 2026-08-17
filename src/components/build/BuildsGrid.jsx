import BuildCard from "./BuildCard";

function normalizeGame(game) {
  if (!game) return "";

  const value = String(game)
    .trim()
    .toLowerCase();

  // Treat snake and snake-io as the same game
  if (
    value === "snake" ||
    value === "snake-io"
  ) {
    return "snake";
  }

  return value;
}

function normalizePlatform(platform) {
  if (!platform) return "";

  return String(platform)
    .trim()
    .toLowerCase();
}

function normalizeVersion(version) {
  if (
    version === undefined ||
    version === null
  ) {
    return "";
  }

  return String(version)
    .trim()
    .replace(/^v/i, "");
}

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

      {builds.map((build) => {

        const matchingBugs = bugs.filter(
          (bug) => {

            const bugGame =
              normalizeGame(bug.game);

            const buildGame =
              normalizeGame(build.game);

            const bugPlatform =
              normalizePlatform(
                bug.platform
              );

            const buildPlatform =
              normalizePlatform(
                build.platform
              );

            const bugBuild =
              normalizeVersion(
                bug.build ||
                bug.version
              );

            const buildVersion =
              normalizeVersion(
                build.version
              );

            const sameGame =
              bugGame === buildGame;

            const samePlatform =
              bugPlatform ===
              buildPlatform;

            const sameBuild =
              bugBuild ===
              buildVersion;

            console.log(
              "BUILD MATCH CHECK:",
              {
                bugId: bug.id,
                bugGame,
                buildGame,
                bugPlatform,
                buildPlatform,
                bugBuild,
                buildVersion,
                sameGame,
                samePlatform,
                sameBuild,
              }
            );

            return (
              sameGame &&
              samePlatform &&
              sameBuild
            );
          }
        );

        return (
          <BuildCard
            key={build.id}
            build={build}
            bugs={matchingBugs}
            isDev={isDev}
            onClick={onSelectBuild}
            onEdit={onEditBuild}
            onDelete={onDeleteBuild}
          />
        );
      })}

    </div>
  );
}

export default BuildsGrid;