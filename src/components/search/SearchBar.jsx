import { useState, useEffect } from 'react'

export default function SearchBar({ value, onChange }) {
  const [local, setLocal] = useState(value)
  useEffect(() => { setLocal(value) }, [value])

  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="text"
        value={local}
        onChange={e => { setLocal(e.target.value); onChange(e.target.value) }}
        placeholder="Search for movies, TV shows, people..."
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--text-primary)',
        }}
        className="w-full rounded-xl px-5 py-3 pr-10 text-sm focus:outline-none focus:border-red-600"
      />
      {local && (
        <button onClick={() => { setLocal(''); onChange('') }}
          style={{ color: 'var(--text-muted)' }}
          className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-red-500 text-lg transition-colors">
          ×
        </button>
      )}
    </div>
  )
}
