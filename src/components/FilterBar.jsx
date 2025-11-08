export default function FilterBar({ filter, setFilter, total, loading, error, onRefresh }) {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ]

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-6 mb-3">
      <div className="text-sm text-gray-600">
        {loading ? 'Loading tasks…' : `${total} task${total === 1 ? '' : 's'}`}
        {error && (
          <span className="ml-2 text-red-600">• {error}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="inline-flex rounded-lg border border-gray-200 overflow-hidden">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 text-sm transition ${
                filter === f.key
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
              aria-pressed={filter === f.key}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          onClick={onRefresh}
          className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>
    </div>
  )
}
