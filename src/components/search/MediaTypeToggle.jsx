const TYPES = [
  { label: 'All', value: 'multi' },
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
  { label: 'People', value: 'person' },
]

export default function MediaTypeToggle({ value, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {TYPES.map(t => (
        <button key={t.value} onClick={() => onChange(t.value)}
          style={{
            background: value === t.value ? '#E50914' : 'transparent',
            border: `1px solid ${value === t.value ? '#E50914' : '#2a2a2a'}`,
            color: value === t.value ? 'white' : '#888',
          }}
          className="px-4 py-1.5 rounded-full text-sm font-medium transition-all hover:border-red-600 hover:text-red-500">
          {t.label}
        </button>
      ))}
    </div>
  )
}
