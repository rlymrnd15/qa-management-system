import {
  Package,
  Rocket,
  ArrowRight,
  Smartphone,
  CircleCheck,
  CircleAlert,
  Pencil,
  Trash2,
} from "lucide-react";

function DeviceBuildCard({
  build,
  onOpen,
  onEdit,
  onDelete,
}) {

  const totalDevices = build.totalDevices || 0;
  const passed = build.passed || 0;
  const failed = build.failed || 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          {build.latest ? (
            <Rocket
              className="text-blue-600"
              size={26}
            />
          ) : (
            <Package
              className="text-slate-500"
              size={26}
            />
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

      {/* Total Devices */}
      <div>

        <div className="flex items-center gap-2">

          <Smartphone
            className="text-blue-600"
            size={20}
          />

          <p className="text-sm font-medium text-slate-500">
            Devices Tested
          </p>

        </div>

        <h3 className="mt-2 text-5xl font-bold">
          {totalDevices}
        </h3>

      </div>

      {/* Status */}
      <div className="mt-6 grid grid-cols-2 gap-4">

        {/* Passed */}
        <div className="rounded-xl bg-green-50 p-4">

          <CircleCheck
            className="mb-2 text-green-600"
            size={20}
          />

          <p className="text-sm text-slate-500">
            Passed
          </p>

          <h4 className="text-2xl font-bold">
            {passed}
          </h4>

        </div>

        {/* Failed */}
        <div className="rounded-xl bg-red-50 p-4">

          <CircleAlert
            className="mb-2 text-red-600"
            size={20}
          />

          <p className="text-sm text-slate-500">
            Failed
          </p>

          <h4 className="text-2xl font-bold">
            {failed}
          </h4>

        </div>

      </div>

      {/* Edit / Delete */}
      <div className="mt-6 flex gap-3">

        <button
          onClick={onEdit}
          className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-100"
        >
          <div className="flex items-center justify-center gap-2">
            <Pencil size={17} />
            Edit
          </div>
        </button>

        <button
          onClick={onDelete}
          className="flex-1 rounded-xl border border-red-200 py-3 font-semibold text-red-600 hover:bg-red-50"
        >
          <div className="flex items-center justify-center gap-2">
            <Trash2 size={17} />
            Delete
          </div>
        </button>

      </div>

      {/* View Device Tests */}
      <button
        onClick={onOpen}
        className="
          mt-4
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
          View Device Tests
          <ArrowRight size={18} />
        </div>
      </button>

    </div>
  );
}

export default DeviceBuildCard;