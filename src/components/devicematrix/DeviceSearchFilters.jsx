function DeviceSearchFilters({
  search,
  setSearch,
}) {
  return (
    <div className="mb-6">

      <input
        type="text"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search device..."
        className="w-full rounded-xl border p-3"
      />

    </div>
  );
}

export default DeviceSearchFilters;