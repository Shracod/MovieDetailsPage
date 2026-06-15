export default function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-6xl mb-4">🎬</div>
      <h3 className="text-white text-xl font-semibold mb-2">
        {query ? `No results for "${query}"` : 'Start searching'}
      </h3>
      <p className="text-gray-400 text-sm max-w-sm">
        {query
          ? 'Try different keywords or remove filters'
          : 'Search for movies, TV shows, or people above'}
      </p>
    </div>
  )
}
