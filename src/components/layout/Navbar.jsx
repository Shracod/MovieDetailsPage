import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useSearchSuggestions } from '../../hooks/useSearchSuggestions'
import { useDebounce } from '../../hooks/useDebounce'
import { getPosterUrl } from '../../utils/imageHelpers'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [activeIdx, setActiveIdx] = useState(-1)
  const navigate = useNavigate()
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)
  const debounced = useDebounce(query, 280)
  const { data: suggestions = [] } = useSearchSuggestions(debounced)

  const showDrop = open && focused && query.length > 1 && suggestions.length > 0

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
        setActiveIdx(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const goToSearch = () => {
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setOpen(false)
    setQuery('')
    setActiveIdx(-1)
  }

  const goToItem = (item) => {
    const isTV = item.media_type === 'tv'
    const isPerson = item.media_type === 'person'
    if (isPerson) navigate(`/person/${item.id}`)
    else if (isTV) navigate(`/tv/${item.id}`)
    else navigate(`/movie/${item.id}`)
    setOpen(false)
    setQuery('')
    setActiveIdx(-1)
  }

  const handleKey = (e) => {
    if (!showDrop) {
      if (e.key === 'Enter') goToSearch()
      return
    }
    const total = suggestions.length + 1
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx(i => (i + 1) % total) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx(i => (i - 1 + total) % total) }
    else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIdx >= 0 && activeIdx < suggestions.length) goToItem(suggestions[activeIdx])
      else goToSearch()
    }
    else if (e.key === 'Escape') { setOpen(false); setActiveIdx(-1); inputRef.current?.blur() }
  }

  const getTypeLabel = (item) => {
    if (item.media_type === 'tv') return 'TV'
    if (item.media_type === 'person') return 'Person'
    return 'Movie'
  }

  const getTypeColor = (item) => {
    if (item.media_type === 'tv') return '#3b82f6'
    if (item.media_type === 'person') return '#8b5cf6'
    return 'var(--red)'
  }

  return (
    <nav className="Navbar1">
      <div className="Navbar2">
        <Link to="/" className="Navbar3">Move</Link>

        <div className="Navbar4">
          {[
            ['/', 'Home'],
            ['/search?type=movie', 'Movies'],
            ['/search?type=tv', 'TV Shows'],
            ['/watchlist', 'Watchlist'],
          ].map(([path, label]) => (
            <Link key={path} to={path} className="Navbar5">{label}</Link>
          ))}
        </div>

        <div ref={wrapperRef} className="Navbar6">
          <div className={showDrop ? 'NavSearch1 NavSearch1--open' : 'NavSearch1'}>
            <span className="NavSearch2">🔍</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true); setActiveIdx(-1) }}
              onFocus={() => { setFocused(true); if (query.length > 1) setOpen(true) }}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onKeyDown={handleKey}
              placeholder="Search movies, shows, people..."
              className="NavSearch3"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus() }}
                className="NavSearch4"
              >×</button>
            )}
            <button onClick={goToSearch} className="NavSearch5">Go</button>
          </div>

          {showDrop && (
            <div className="NavDrop1">
              <div className="NavDrop2">Suggestions</div>
              {suggestions.map((item, i) => {
                const title = item.title || item.name
                const year = (item.release_date || item.first_air_date || '').slice(0, 4)
                const rating = item.vote_average
                const isActive = i === activeIdx
                return (
                  <div
                    key={item.id}
                    onMouseDown={() => goToItem(item)}
                    onMouseEnter={() => setActiveIdx(i)}
                    className={isActive ? 'NavDrop3 NavDrop3--active' : 'NavDrop3'}
                  >
                    <img
                      src={getPosterUrl(item.poster_path || item.profile_path, 'w92')}
                      alt={title}
                      className="NavDrop4"
                      onError={e => { e.target.src = 'https://via.placeholder.com/32x46?text=?' }}
                    />
                    <div className="NavDrop5">
                      <p className="NavDrop6">{title}</p>
                      <p className="NavDrop7">
                        {year && <span>{year}</span>}
                        {rating > 0 && <span> · ★ {rating.toFixed(1)}</span>}
                      </p>
                    </div>
                    <span className="NavDrop8" style={{ background: getTypeColor(item) }}>
                      {getTypeLabel(item)}
                    </span>
                  </div>
                )
              })}
              <div
                onMouseDown={goToSearch}
                onMouseEnter={() => setActiveIdx(suggestions.length)}
                className={activeIdx === suggestions.length ? 'NavDrop9 NavDrop9--active' : 'NavDrop9'}
              >
                🔍 See all results for "<strong>{query}</strong>"
              </div>
            </div>
          )}

          {open && focused && query.length > 2 && suggestions.length === 0 && (
            <div className="NavDrop10">
              No suggestions for "<span style={{ color: '#aaa' }}>{query}</span>"
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
