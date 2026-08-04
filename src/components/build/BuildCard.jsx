import {
  Package,
  Rocket,
  ArrowRight,
  Bug,
  CircleCheck,
  CircleAlert,
  Clock3,
} from "lucide-react";

function BuildCard({
  build,
  bugs,
  onClick,
}) {
    const buildBugs = bugs.filter(
      (bug) => bug.build === build.version
    );

    const totalBugs = buildBugs.length;

    const fixed = buildBugs.filter(
      (bug) => bug.status === "Fixed"
    ).length;

    const pending = buildBugs.filter(
      (bug) => bug.status === "Pending"
    ).length;

    const open = buildBugs.filter(
      (bug) => bug.status === "Open"
    ).length;

    const fixedPercentage =
      totalBugs === 0
        ? 0
        : Math.round((fixed / totalBugs) * 100);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          {build.latest ? (
            <Rocket className="text-blue-600" size={26} />
          ) : (
            <Package className="text-slate-500" size={26} />
          )}

          <div>
            <h2 className="text-2xl font-bold">
              Build v{build.version}
            </h2>

            <p className="text-sm text-slate-500">
              Released {build.releaseDate}
            </p>
          </div>

        </div>

        {build.latest && (
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
            Latest
          </span>
        )}

      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-slate-200" />

      {/* Total Bugs */}
      <div>
            <div className="flex items-center gap-2">

                <Bug className="text-red-500" size={20} />

                <p className="text-sm font-medium text-slate-500">
                Total Bugs
                </p>
            </div>
            <h3 className="mt-2 text-5xl font-bold">
                {totalBugs}
            </h3>
       </div>

       {/*progress bar */}
       <div className="mt-6">
            <div className="mb-2 flex justify-between">

                <p className="text-sm font-medium text-slate-500">
                Resolution Progress
                </p>

                <p className="text-sm font-semibold text-blue-600">
                {fixedPercentage}% Fixed
                </p>

            </div>
            <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{
                    width: `${fixedPercentage}%`,
                }}
                />
            </div>
        </div>

    
      {/* Status */}
      <div className="mt-6 grid grid-cols-3 gap-4">

        <div className="rounded-xl bg-green-50 p-4">

            <CircleCheck
            className="mb-2 text-green-600"
            size={20}
            />

            <p className="text-sm text-slate-500">
            Fixed
            </p>

            <h4 className="text-2xl font-bold">
            {fixed}
            </h4>

        </div>

        <div className="rounded-xl bg-yellow-50 p-4">

            <Clock3
            className="mb-2 text-yellow-600"
            size={20}
            />

            <p className="text-sm text-slate-500">
            Pending
            </p>

            <h4 className="text-2xl font-bold">
            {pending}
            </h4>

        </div>

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

        </div>

      {/* Button */}
      <button
        onClick={onClick}
        className="
          mt-8
          w-full
          rounded-xl
          bg-blue-600
          py-3
          font-semibold
          text-white
          transition
          hover:bg-blue-700
        "
      >
        <div className="flex items-center justify-center gap-2">
        View Bugs
        <ArrowRight size={18} />
        </div>
      </button>

    </div>
  );
}


export default BuildCard;