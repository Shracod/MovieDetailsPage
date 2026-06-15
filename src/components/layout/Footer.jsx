import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ background: '#000', borderTop: '1px solid #1a1a1a', marginTop: '4rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem 1rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>Move</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[['/', 'Home'], ['/search', 'Search'], ['/watchlist', 'Watchlist']].map(([path, label]) => (
            <Link key={path} to={path}
              style={{ color: '#555', fontSize: '13px', textDecoration: 'none', transition: 'color .15s' }}
              onMouseEnter={e => e.target.style.color = 'white'}
              onMouseLeave={e => e.target.style.color = '#555'}>
              {label}
            </Link>
          ))}
        </div>
        <p style={{ color: '#333', fontSize: '12px' }}>
          Data by <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer"
            style={{ color: '#E50914', textDecoration: 'none' }}>TMDB</a>
        </p>
      </div>
    </footer>
  )
}
