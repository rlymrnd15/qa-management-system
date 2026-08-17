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

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search test case title..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="flex-1 rounded-xl border px-4 py-3 outline-none focus:border-blue-500"
        />

        {/* PRIORITY */}
        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
          className="rounded-xl border px-4 py-3"
        >
          <option value="All">
            All Priorities
          </option>

          <option value="P0">
            P0
          </option>

          <option value="P1">
            P1
          </option>

          <option value="P2">
            P2
          </option>
        </select>

        {/* STATUS */}
        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="rounded-xl border px-4 py-3"
        >
          <option value="All">
            All Status
          </option>

          <option value="Passed">
            Passed
          </option>

          <option value="Failed">
            Failed
          </option>

          <option value="Not Run">
            Not Run
          </option>

          <option value="Blocked">
            Blocked
          </option>
        </select>

        {/* PLATFORM */}
        <select
          value={platform}
          onChange={(e) =>
            setPlatform(e.target.value)
          }
          className="rounded-xl border px-4 py-3"
        >
          {platforms.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>
    </div>
  );
}

export default SearchFilters;