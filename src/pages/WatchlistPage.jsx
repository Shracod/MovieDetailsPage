import { useWatchlistStore } from '../store/watchlistStore'
import { Link } from 'react-router-dom'
import MovieCard from '../components/common/MovieCard'

export default function WatchlistPage() {
  const { items, removeFromWatchlist } = useWatchlistStore()

  return (
    <div className="WatchlistPage1">
      <div className="WatchlistPage2">
        <div className="WatchlistPage3">
          <h1 className="WatchlistPage4">My Watchlist</h1>
          {items.length > 0 && (
            <span className="WatchlistPage5">{items.length} title{items.length !== 1 ? 's' : ''}</span>
          )}
        </div>
        {items.length === 0 ? (
          <div className="WatchlistPage6">
            <div className="WatchlistPage7">🎬</div>
            <h3 className="WatchlistPage8">Your watchlist is empty</h3>
            <p className="WatchlistPage9">Add movies and TV shows to keep track of what you want to watch</p>
            <Link to="/" className="WatchlistPage10">Browse Trending</Link>
          </div>
        ) : (
          <div className="WatchlistPage11">
            {items.map(item => (
              <div key={item.id} className="WatchlistPage12">
                <MovieCard item={item} />
                <button onClick={() => removeFromWatchlist(item.id)} className="WatchlistPage13">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
