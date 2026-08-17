import {
  Package,
  Rocket,
  ArrowRight,
  Bug,
  CircleCheck,
  CircleAlert,
  Search,
  Wrench,
} from "lucide-react";

function normalize(value) {
  if (
    value === undefined ||
    value === null
  ) {
    return "";
  }

  return String(value)
    .trim()
    .toLowerCase()
    .replace(/^v/, "");
}

function normalizeGame(game) {
  const value = normalize(game);

  if (
    value === "snake" ||
    value === "snake-io"
  ) {
    return "snake";
  }

  return value;
}

function BuildCard({
  build,
  bugs,
  onClick,
  onEdit,
  onDelete,
  isDev,
}) {
  // ==========================================
  // BUILD INFORMATION
  // ==========================================

  const buildVersion = normalize(
    build.version
  );

  const buildGame = normalizeGame(
    build.game
  );

  const buildPlatform = normalize(
    build.platform
  );

  // ==========================================
  // MATCH BUGS TO THIS BUILD
  // ==========================================

  const buildBugs = bugs.filter((bug) => {

    const bugGame = normalizeGame(
      bug.game
    );

    const bugPlatform = normalize(
      bug.platform
    );

    // Some bugs may store the build in
    // bug.build while others may store it
    // in bug.version.
    const bugBuild = normalize(
      bug.build || bug.version
    );

    const sameGame =
      bugGame === buildGame;

    const samePlatform =
      bugPlatform === buildPlatform;

    const sameBuild =
      bugBuild === buildVersion;

    console.log(
      "================================"
    );

    console.log(
      "BUILD CARD MATCH"
    );

    console.log(
      "BUILD ID:",
      build.id
    );

    console.log(
      "BUILD VERSION:",
      build.version
    );

    console.log(
      "BUILD GAME:",
      build.game
    );

    console.log(
      "BUILD PLATFORM:",
      build.platform
    );

    console.log(
      "BUG ID:",
      bug.id
    );

    console.log(
      "BUG TITLE:",
      bug.title
    );

    console.log(
      "BUG BUILD:",
      bug.build
    );

    console.log(
      "BUG VERSION:",
      bug.version
    );

    console.log(
      "BUG GAME:",
      bug.game
    );

    console.log(
      "BUG PLATFORM:",
      bug.platform
    );

    console.log(
      "MATCH GAME:",
      sameGame
    );

    console.log(
      "MATCH PLATFORM:",
      samePlatform
    );

    console.log(
      "MATCH BUILD:",
      sameBuild
    );

    console.log(
      "================================"
    );

    return (
      sameGame &&
      samePlatform &&
      sameBuild
    );
  });

  // ==========================================
  // TOTAL BUGS
  // ==========================================

  const totalBugs =
    buildBugs.length;

  // ==========================================
  // BUG STATUS COUNTS
  // ==========================================

  const resolved =
    buildBugs.filter(
      (bug) =>
        bug.status === "Resolved"
    ).length;

  const investigation =
    buildBugs.filter(
      (bug) =>
        bug.status === "Investigation"
    ).length;

  const ongoingFix =
    buildBugs.filter(
      (bug) =>
        bug.status === "Ongoing Fix"
    ).length;

  const open =
    buildBugs.filter(
      (bug) =>
        bug.status === "Open"
    ).length;

  // ==========================================
  // RESOLUTION PROGRESS
  // ==========================================

  const resolvedPercentage =
    totalBugs === 0
      ? 0
      : Math.round(
          (resolved / totalBugs) * 100
        );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* ========================================
          HEADER
      ======================================== */}

      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 items-center gap-3">

          {build.latest ? (
            <Rocket
              className="shrink-0 text-blue-600"
              size={26}
            />
          ) : (
            <Package
              className="shrink-0 text-slate-500"
              size={26}
            />
          )}

          <div className="min-w-0">

            <h2 className="text-2xl font-bold">
              Build v{build.version}
            </h2>

            <p className="text-sm text-slate-500">
              Released {build.releaseDate}
            </p>

          </div>

        </div>

        {build.latest && (
          <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Latest
          </span>
        )}

      </div>

      {/* ========================================
          DESCRIPTION
      ======================================== */}

      {build.description && (
        <div className="mt-5 rounded-xl bg-slate-50 p-4">

          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Build Description / DEV Notes
          </p>

          <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
            {build.description}
          </p>

        </div>
      )}

      <div className="my-6 h-px bg-slate-200" />

      {/* ========================================
          TOTAL BUGS
      ======================================== */}

      <div>

        <div className="flex items-center gap-2">

          <Bug
            className="text-red-500"
            size={20}
          />

          <p className="text-sm font-medium text-slate-500">
            Total Bugs
          </p>

        </div>

        <h3 className="mt-2 text-5xl font-bold">
          {totalBugs}
        </h3>

      </div>

      {/* ========================================
          RESOLUTION PROGRESS
      ======================================== */}

      <div className="mt-6">

        <div className="mb-2 flex justify-between">

          <p className="text-sm font-medium text-slate-500">
            Resolution Progress
          </p>

          <p className="text-sm font-semibold text-blue-600">
            {resolvedPercentage}% Resolved
          </p>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-blue-600 transition-all"
            style={{
              width: `${resolvedPercentage}%`,
            }}
          />

        </div>

      </div>

      {/* ========================================
          STATUS
      ======================================== */}

      <div className="mt-6 grid grid-cols-2 gap-4">

        {/* OPEN */}

        <div className="rounded-xl bg-red-50 p-4">

          <CircleAlert
            className="mb-2 text-red-600"
            size={20}
          />

          <p className="text-sm text-slate-500">
            Open
          </p>

          <h4 className="text-2xl font-bold">
            {open}
          </h4>

        </div>

        {/* INVESTIGATION */}

        <div className="rounded-xl bg-purple-50 p-4">

          <Search
            className="mb-2 text-purple-600"
            size={20}
          />

          <p className="text-sm text-slate-500">
            Investigation
          </p>

          <h4 className="text-2xl font-bold">
            {investigation}
          </h4>

        </div>

        {/* ONGOING FIX */}

        <div className="rounded-xl bg-yellow-50 p-4">

          <Wrench
            className="mb-2 text-yellow-600"
            size={20}
          />

          <p className="text-sm text-slate-500">
            Ongoing Fix
          </p>

          <h4 className="text-2xl font-bold">
            {ongoingFix}
          </h4>

        </div>

        {/* RESOLVED */}

        <div className="rounded-xl bg-green-50 p-4">

          <CircleCheck
            className="mb-2 text-green-600"
            size={20}
          />

          <p className="text-sm text-slate-500">
            Resolved
          </p>

          <h4 className="text-2xl font-bold">
            {resolved}
          </h4>

        </div>

      </div>

      {/* ========================================
          EDIT / DELETE
      ======================================== */}

      {isDev && (
        <div className="mt-6 flex gap-3">

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              onEdit(build);
            }}
            className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();

              onDelete(build);
            }}
            className="flex-1 rounded-xl border border-red-200 py-3 font-semibold text-red-600 transition hover:bg-red-50"
          >
            Delete
          </button>

        </div>
      )}

      {/* ========================================
          VIEW BUGS
      ======================================== */}

      <button
        type="button"
        onClick={() =>
          onClick(build)
        }
        className="mt-4 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        <div className="flex items-center justify-center gap-2">

          View Bugs

          <ArrowRight
            size={18}
          />

        </div>
      </button>

    </div>
  );
}

export default BuildCard;