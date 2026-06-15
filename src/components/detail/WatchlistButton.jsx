import { useWatchlistStore } from '../../store/watchlistStore'

export default function WatchlistButton({ item }) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlistStore()
  const inList = isInWatchlist(item.id)

  return (
    <button
      onClick={() => inList ? removeFromWatchlist(item.id) : addToWatchlist(item)}
      style={{
        background: inList ? '#E50914' : 'transparent',
        border: `1px solid ${inList ? '#E50914' : '#555'}`,
        color: 'white',
      }}
      className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all hover:bg-red-700 hover:border-red-700"
    >
      {inList ? '✓ In Watchlist' : '+ Add to Watchlist'}
    </button>
  )
}
