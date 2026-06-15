export default function Pagination({ page, totalPages, onPage }) {
  const total = Math.min(totalPages || 1, 500)
  if (total <= 1) return null

  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(total, page + 2)
  for (let i = start; i <= end; i++) pages.push(i)

  const btnBase = { background: '#141414', border: '1px solid #2a2a2a', color: '#aaa' }
  const btnActive = { background: '#E50914', border: '1px solid #E50914', color: 'white' }

  return (
    <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
      <button onClick={() => onPage(page - 1)} disabled={page === 1}
        style={btnBase}
        className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-30 hover:border-red-600 hover:text-red-500 transition-colors">
        ← Prev
      </button>
      {start > 1 && <>
        <button onClick={() => onPage(1)} style={btnBase}
          className="px-3 py-1.5 rounded-lg text-sm hover:border-red-600 hover:text-red-500 transition-colors">1</button>
        {start > 2 && <span style={{ color: '#555' }}>…</span>}
      </>}
      {pages.map(p => (
        <button key={p} onClick={() => onPage(p)}
          style={p === page ? btnActive : btnBase}
          className="px-3 py-1.5 rounded-lg text-sm hover:border-red-600 transition-colors">
          {p}
        </button>
      ))}
      {end < total && <>
        {end < total - 1 && <span style={{ color: '#555' }}>…</span>}
        <button onClick={() => onPage(total)} style={btnBase}
          className="px-3 py-1.5 rounded-lg text-sm hover:border-red-600 hover:text-red-500 transition-colors">{total}</button>
      </>}
      <button onClick={() => onPage(page + 1)} disabled={page >= total}
        style={btnBase}
        className="px-3 py-1.5 rounded-lg text-sm disabled:opacity-30 hover:border-red-600 hover:text-red-500 transition-colors">
        Next →
      </button>
    </div>
  )
}
