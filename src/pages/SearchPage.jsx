import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSearch } from '../hooks/useSearch'
import { useDebounce } from '../hooks/useDebounce'
import SearchBar from '../components/search/SearchBar'
import MediaTypeToggle from '../components/search/MediaTypeToggle'
import FilterBar from '../components/search/FilterBar'
import SearchResultCard from '../components/search/SearchResultCard'
import Pagination from '../components/search/Pagination'
import EmptyState from '../components/search/EmptyState'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [mediaType, setMediaType] = useState(searchParams.get('type') || 'multi')
  const [genreId, setGenreId] = useState('')
  const [year, setYear] = useState('')
  const [sortBy, setSortBy] = useState('popularity.desc')
  const [page, setPage] = useState(1)

  useEffect(() => {
    const q = searchParams.get('q') || ''
    const t = searchParams.get('type') || 'multi'
    setQuery(q)
    setMediaType(t)
    setPage(1)
  }, [searchParams])

  const debouncedQuery = useDebounce(query, 400)

  const { data, isLoading } = useSearch({
    query: debouncedQuery,
    mediaType,
    page,
  })

  const results = data?.results || []
  const totalPages = data?.total_pages || 1
  const totalResults = data?.total_results || 0

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      className="SearchPage1">
      <div className="SearchPage2">
        <h1 className="SearchPage3" style={{ color: 'var(--red)' }}>Search</h1>

        <div className="SearchPage4">
          <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1) }} />
          <MediaTypeToggle value={mediaType} onChange={(v) => { setMediaType(v); setPage(1) }} />
          <FilterBar
            mediaType={mediaType}
            genreId={genreId}
            year={year}
            sortBy={sortBy}
            onGenre={setGenreId}
            onYear={setYear}
            onSort={setSortBy}
          />
        </div>

        {totalResults > 0 && (
          <p className="SearchPage5" style={{ color: 'var(--text-muted)' }}>
            {totalResults.toLocaleString()} results {debouncedQuery && `for "${debouncedQuery}"`}
          </p>
        )}

        {isLoading
          ? <LoadingSpinner text="Searching..." />
          : results.length > 0
            ? <div className="SearchPage6">
                {results.map(item => <SearchResultCard key={item.id} item={item} />)}
              </div>
            : <EmptyState query={debouncedQuery} />
        }

        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </div>
    </div>
  )
}
