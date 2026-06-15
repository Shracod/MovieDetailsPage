import { useParams } from 'react-router-dom'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { getPosterUrl, getBackdropUrl } from '../utils/imageHelpers'
import { formatDate, formatRuntime, formatCurrency } from '../utils/formatHelpers'
import RatingBadge from '../components/common/RatingBadge'
import CastRow from '../components/detail/CastRow'
import TrailerModal from '../components/detail/TrailerModal'
import ReviewCard from '../components/detail/ReviewCard'
import SimilarMovies from '../components/detail/SimilarMovies'
import WatchlistButton from '../components/detail/WatchlistButton'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function MovieDetailPage() {
  const { id } = useParams()
  const { data: movie, isLoading, isError } = useMovieDetail(id)

  if (isLoading) return <LoadingSpinner text="Loading movie..." />
  if (isError) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E50914' }}>
      Failed to load movie.
    </div>
  )

  return (
    <div className="MovieDetailPage1">
      <div className="MovieDetailPage2">
        <img src={getBackdropUrl(movie.backdrop_path)} alt={movie.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="MovieDetailPage3" />
        <div className="MovieDetailPage4" />
      </div>
      <div className="MovieDetailPage5">
        <div className="MovieDetailPage6">
          <img src={getPosterUrl(movie.poster_path, 'w342')} alt={movie.title}
            className="MovieDetailPage7" loading="lazy" />
          <div className="MovieDetailPage8">
            <h1 className="MovieDetailPage9">{movie.title}</h1>
            {movie.tagline && <p className="MovieDetailPage10">{movie.tagline}</p>}
            <div className="MovieDetailPage11">
              {movie.genres?.map(g => <span key={g.id} className="MovieDetailPage12">{g.name}</span>)}
            </div>
            <div className="MovieDetailPage13">
              <RatingBadge rating={movie.vote_average || 0} size={56} />
              <div className="MovieDetailPage14">
                <p>📅 {formatDate(movie.release_date)}</p>
                <p>⏱ {formatRuntime(movie.runtime)}</p>
                <p>🌐 {movie.original_language?.toUpperCase()}</p>
              </div>
            </div>
            <div className="MovieDetailPage15">
              <WatchlistButton item={movie} />
              <TrailerModal videos={movie.videos?.results || []} />
            </div>
            <h2 className="MovieDetailPage16">Overview</h2>
            <p className="MovieDetailPage17">{movie.overview}</p>
            <div className="MovieDetailPage18">
              <div><p className="MovieDetailPage19">Budget</p><p className="MovieDetailPage20">{formatCurrency(movie.budget)}</p></div>
              <div><p className="MovieDetailPage19">Revenue</p><p className="MovieDetailPage20">{formatCurrency(movie.revenue)}</p></div>
              <div><p className="MovieDetailPage19">Status</p><p className="MovieDetailPage20">{movie.status}</p></div>
            </div>
          </div>
        </div>
        <CastRow cast={movie.credits?.cast || []} />
        {movie.reviews?.results?.length > 0 && (
          <div className="MovieDetailPage21">
            <h2 className="MovieDetailPage22">Reviews</h2>
            <div className="MovieDetailPage23">
              {movie.reviews.results.slice(0, 3).map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </div>
        )}
        <SimilarMovies items={movie.similar?.results || []} title="Similar Movies" />
      </div>
    </div>
  )
}
