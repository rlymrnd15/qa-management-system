function SearchFilters({
  search,
  setSearch,
  priority,
  setPriority,
  status,
  setStatus,
  device,
  setDevice,
  devices,
}) {
  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex flex-wrap gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search bug title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
        />

        {/* Priority */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="rounded-xl border px-4 py-3"
        >
          <option value="All">All Priorities</option>
          <option value="P0">P0</option>
          <option value="P1">P1</option>
          <option value="P2">P2</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border px-4 py-3"
        >
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="Pending">Pending</option>
          <option value="Fixed">Fixed</option>
        </select>

        {/* Device */}
        <select
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          className="rounded-xl border px-4 py-3"
        >
          {devices.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </div>

    </div>
  );
}

export default SearchFilters;