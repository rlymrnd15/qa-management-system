function SearchFilters({
  search,
  setSearch,
  priority,
  setPriority,
  status,
  setStatus,
  platform,
  setPlatform,
  platforms,
}) {
  return (
    <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

      <div className="flex flex-wrap gap-4">

        {/* Search */}
        <input
          type="text"
          placeholder="Search test case..."
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
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-xl border px-4 py-3"
        >
          <option value="All">All Status</option>
          <option value="Passed">Passed</option>
          <option value="Failed">Failed</option>
          <option value="Not Run">Not Run</option>
        </select>

        {/* Platform */}
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="rounded-xl border px-4 py-3"
        >
          {(platforms ?? []).map((item) => (
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