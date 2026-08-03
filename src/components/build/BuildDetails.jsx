function BuildDetails({
  build,
  bugs,
  onBack,
}) {

    console.log("Selected Build:", build);
    console.log("Bugs received:", bugs);

  const buildBugs = bugs.filter(
    (bug) => bug.build === build.version
  );

  return (
    <div>

      <button
        onClick={onBack}
        className="mb-6 rounded-lg border px-4 py-2 hover:bg-slate-100"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold">
        Build v{build.version}
      </h1>

      <p className="mt-2 text-slate-500">
        Released {build.releaseDate}
      </p>
        <div className="mt-8 rounded-2xl border bg-white p-6">

        <h2 className="mb-4 text-2xl font-bold">
            Bugs ({buildBugs.length})
        </h2>

        {buildBugs.length === 0 ? (
            <p className="text-slate-500">
            No bugs found for this build.
            </p>
        ) : (
            <div className="space-y-3">

            {buildBugs.map((bug) => (
                <div
                key={bug.id}
                className="rounded-xl border p-4"
                >
                <div className="flex items-center justify-between">

                    <div>
                    <h3 className="font-semibold">
                        {bug.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                        {bug.priority} • {bug.status}
                    </p>
                    </div>

                </div>
                </div>
            ))}

            </div>
        )}

        </div>
    </div>
  );
}

export default BuildDetails;