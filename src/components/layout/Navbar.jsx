import { Link, useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { useSearchSuggestions } from '../../hooks/useSearchSuggestions'
import { useDebounce } from '../../hooks/useDebounce'
import { getPosterUrl } from '../../utils/imageHelpers'
import { getYear } from '../../utils/formatHelpers'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const wrapperRef = useRef(null)
  const inputRef = useRef(null)
  const debouncedQuery = useDebounce(query, 250)
  const { data: suggestions = [] } = useSearchSuggestions(debouncedQuery)

  useEffect(() => {
    function handleClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false)
        setActiveIndex(-1)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const showDropdown = open && focused && query.length > 1

  const goToSearch = (q) => {
    const term = q || query
    if (!term.trim()) return
    navigate(`/search?q=${encodeURIComponent(term.trim())}`)
    setOpen(false)
    setFocused(false)
    setQuery('')
    setActiveIndex(-1)
  }

  const goToItem = (item) => {
    const isTV = item.media_type === 'tv'
    const isPerson = item.media_type === 'person'
    const path = isPerson ? `/person/${item.id}` : isTV ? `/tv/${item.id}` : `/movie/${item.id}`
    navigate(path)
    setOpen(false)
    setFocused(false)
    setQuery('')
    setActiveIndex(-1)
  }

  const handleKeyDown = (e) => {
    if (!showDropdown) {
      if (e.key === 'Enter') goToSearch()
      return
    }
    const total = suggestions.length + 1
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(i => (i + 1) % total)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(i => (i - 1 + total) % total)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex === suggestions.length || activeIndex === -1) {
        goToSearch()
      } else if (activeIndex >= 0) {
        goToItem(suggestions[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
      inputRef.current?.blur()
    }
  }

  const getTypeLabel = (t) => t === 'tv' ? 'TV' : t === 'person' ? 'Person' : 'Movie'
  const getTypeColor = (t) => t === 'tv' ? '#2563eb' : t === 'person' ? '#7c3aed' : '#E50914'

  return (
    <nav style={{ background: '#000', borderBottom: '1px solid #1a1a1a', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem', height: '56px', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>

        {/* Logo */}
        <Link to="/" style={{ color: 'white', fontWeight: 700, fontSize: '1.25rem', textDecoration: 'none', letterSpacing: '-0.02em', flexShrink: 0 }}>
          Move
        </Link>

        {/* Nav links */}
        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          {[['/', 'Home'], ['/search?type=movie', 'Movies'], ['/search?type=tv', 'TV Shows'], ['/watchlist', 'Watchlist']].map(([path, label]) => (
            <Link key={path} to={path}
              style={{ color: '#777', fontSize: '13px', fontWeight: 500, textDecoration: 'none', transition: 'color .15s' }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = '#777'}>
              {label}
            </Link>
          ))}
        </div>

        {/* Search */}
        <div ref={wrapperRef} style={{ marginLeft: 'auto', position: 'relative', width: '340px' }}>

          {/* Input row */}
          <div style={{ display: 'flex', alignItems: 'center', background: '#111', border: `1px solid ${focused ? '#E50914' : '#2a2a2a'}`, borderRadius: showDropdown && suggestions.length > 0 ? '12px 12px 0 0' : '12px', transition: 'border-color .2s', overflow: 'visible' }}>
            <span style={{ paddingLeft: '12px', color: '#555', fontSize: '14px', flexShrink: 0 }}>🔍</span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true); setActiveIndex(-1) }}
              onFocus={() => { setFocused(true); if (query.length > 1) setOpen(true) }}
              onBlur={() => setTimeout(() => setFocused(false), 150)}
              onKeyDown={handleKeyDown}
              placeholder="Search movies, shows, people..."
              style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: 'white', fontSize: '13px', padding: '9px 8px', minWidth: 0 }}
            />
            {query && (
              <button onClick={() => { setQuery(''); setOpen(false); setActiveIndex(-1); inputRef.current?.focus() }}
                style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', padding: '0 10px', fontSize: '16px', lineHeight: 1, flexShrink: 0 }}
                onMouseEnter={e => e.target.style.color = 'white'}
                onMouseLeave={e => e.target.style.color = '#555'}>
                ×
              </button>
            )}
          </div>

          {/* Dropdown */}
          {showDropdown && suggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#111', border: '1px solid #2a2a2a', borderTop: 'none', borderRadius: '0 0 12px 12px', overflow: 'hidden', boxShadow: '0 16px 40px rgba(0,0,0,0.9)', zIndex: 100 }}>

              {/* Suggestion rows */}
              {suggestions.map((item, i) => {
                const title = item.title || item.name
                const date = item.release_date || item.first_air_date
                const poster = item.poster_path || item.profile_path
                const isActive = i === activeIndex
                return (
                  <div key={item.id}
                    onMouseDown={() => goToItem(item)}
                    onMouseEnter={() => setActiveIndex(i)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', cursor: 'pointer', background: isActive ? '#1a1a1a' : 'transparent', borderBottom: '1px solid #1a1a1a', transition: 'background .1s' }}>
                    <img
                      src={getPosterUrl(poster, 'w92')}
                      alt={title}
                      style={{ width: '32px', height: '46px', objectFit: 'cover', borderRadius: '5px', flexShrink: 0, border: '1px solid #222' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ color: isActive ? 'white' : '#ddd', fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', margin: 0 }}>{title}</p>
                      {date && <p style={{ color: '#555', fontSize: '11px', margin: '2px 0 0' }}>{getYear(date)}</p>}
                    </div>
                    <span style={{ background: getTypeColor(item.media_type), color: 'white', fontSize: '10px', padding: '2px 7px', borderRadius: '999px', flexShrink: 0, fontWeight: 600 }}>
                      {getTypeLabel(item.media_type)}
                    </span>
                  </div>
                )
              })}

              {/* See all results row */}
              <div
                onMouseDown={() => goToSearch()}
                onMouseEnter={() => setActiveIndex(suggestions.length)}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px', cursor: 'pointer', background: activeIndex === suggestions.length ? '#1a1a1a' : 'transparent', transition: 'background .1s' }}>
                <span style={{ color: '#E50914', fontSize: '13px' }}>🔍</span>
                <span style={{ color: '#E50914', fontSize: '13px', fontWeight: 500 }}>
                  See all results for <strong>"{query}"</strong>
                </span>
              </div>
            </div>
          )}

          {/* No results state */}
          {showDropdown && query.length > 2 && suggestions.length === 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#111', border: '1px solid #2a2a2a', borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '14px 12px', textAlign: 'center', boxShadow: '0 16px 40px rgba(0,0,0,0.9)', zIndex: 100 }}>
              <p style={{ color: '#555', fontSize: '13px', margin: 0 }}>No results for "<span style={{ color: '#aaa' }}>{query}</span>"</p>
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button onClick={toggleTheme}
          style={{ background: '#111', border: '1px solid #2a2a2a', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, transition: 'border-color .2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#E50914'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#2a2a2a'}>
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>

      </div>
    </nav>
  )
}
