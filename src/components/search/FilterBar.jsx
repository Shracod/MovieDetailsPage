import { useGenres } from '../../hooks/useGenres'

const YEARS = Array.from({ length: 35 }, (_, i) => 2024 - i)
const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Rating', value: 'vote_average.desc' },
  { label: 'Newest', value: 'primary_release_date.desc' },
  { label: 'Oldest', value: 'primary_release_date.asc' },
]

const selectStyle = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  color: 'var(--text-primary)',
}

export default function FilterBar({ mediaType, genreId, year, sortBy, onGenre, onYear, onSort }) {
  const { data: genres = [] } = useGenres(mediaType === 'tv' ? 'tv' : 'movie')
  if (mediaType === 'person') return null

  return (
    <div className="flex flex-wrap gap-3 items-center">
      <select value={genreId} onChange={e => onGenre(e.target.value)}
        style={selectStyle} className="text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-red-600">
        <option value="">All Genres</option>
        {genres.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>
      <select value={year} onChange={e => onYear(e.target.value)}
        style={selectStyle} className="text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-red-600">
        <option value="">All Years</option>
        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
      <select value={sortBy} onChange={e => onSort(e.target.value)}
        style={selectStyle} className="text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-red-600">
        {SORT_OPTIONS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
      </select>
    </div>
  )
}
