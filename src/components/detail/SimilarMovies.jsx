import MovieCarousel from '../home/MovieCarousel'

export default function SimilarMovies({ items = [], title = 'More Like This' }) {
  if (!items.length) return null
  return <MovieCarousel title={title} items={items} isLoading={false} />
}
