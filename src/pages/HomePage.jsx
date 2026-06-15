import { useTrending } from '../hooks/useTrending'
import HeroBanner from '../components/home/HeroBanner'
import MovieCarousel from '../components/home/MovieCarousel'

export default function HomePage() {
  const { data: trendingMovies, isLoading: loadingMovies } = useTrending('movie', 'day')
  const { data: trendingTV, isLoading: loadingTV } = useTrending('tv', 'day')
  const { data: trendingAll } = useTrending('all', 'day')
  const hero = trendingAll?.[0]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <HeroBanner item={hero} />
      <MovieCarousel title="Trending Movies Today" items={trendingMovies} isLoading={loadingMovies} />
      <MovieCarousel title="Trending TV Shows Today" items={trendingTV} isLoading={loadingTV} />
    </div>
  )
}
