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
  if (isError) return <div className="MovieDetailPage1--error">Failed to load movie.</div>

  return (
    <div className="MovieDetailPage1">

      <div className="MovieDetailPage2">
        <img
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          className="MovieDetailPage3"
        />
        <div className="MovieDetailPage4" />
        <div className="MovieDetailPage5" />
      </div>

      <div className="MovieDetailPage6">
        <div className="MovieDetailPage7">
          <img
            src={getPosterUrl(movie.poster_path, 'w342')}
            alt={movie.title}
            className="MovieDetailPage8"
            loading="lazy"
          />

          <div className="MovieDetailPage9">
            <h1 className="MovieDetailPage10">{movie.title}</h1>
            {movie.tagline && (
              <p className="MovieDetailPage11">{movie.tagline}</p>
            )}

            <div className="MovieDetailPage12">
              {movie.genres?.map(g => (
                <span key={g.id} className="MovieDetailPage13">{g.name}</span>
              ))}
            </div>

            <div className="MovieDetailPage14">
              <RatingBadge rating={movie.vote_average || 0} size={52} />
              <span className="MovieDetailPage14b">{movie.status}</span>
              <div className="MovieDetailPage15">
                <p>🎬 {movie.original_language?.toUpperCase()} · {formatRuntime(movie.runtime)}</p>
                <p>📅 {formatDate(movie.release_date)}</p>
              </div>
            </div>

            <div className="MovieDetailPage16">
              {movie.vote_average > 0 && (
                <div className="MovieDetailPage17">
                  <p className="MovieDetailPage18">Score</p>
                  <p className="MovieDetailPage19">{movie.vote_average?.toFixed(1)}/10</p>
                </div>
              )}
              {movie.vote_count > 0 && (
                <div className="MovieDetailPage17">
                  <p className="MovieDetailPage18">Votes</p>
                  <p className="MovieDetailPage19">{(movie.vote_count / 1000).toFixed(1)}K</p>
                </div>
              )}
              {movie.budget > 0 && (
                <div className="MovieDetailPage17">
                  <p className="MovieDetailPage18">Budget</p>
                  <p className="MovieDetailPage19">{formatCurrency(movie.budget)}</p>
                </div>
              )}
              {movie.revenue > 0 && (
                <div className="MovieDetailPage17">
                  <p className="MovieDetailPage18">Revenue</p>
                  <p className="MovieDetailPage19">{formatCurrency(movie.revenue)}</p>
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="MovieDetailPage20">
              <WatchlistButton item={movie} />
              <TrailerModal videos={movie.videos?.results || []} />
            </div>

            <h2 className="MovieDetailPage21">Synopsis</h2>
            <p className="MovieDetailPage22">{movie.overview || 'No overview available.'}</p>
          </div>
        </div>

        <CastRow cast={movie.credits?.cast || []} />

        {movie.reviews?.results?.length > 0 && (
          <div className="MovieDetailPage23">
            <h2 className="MovieDetailPage24">Reviews</h2>
            <div className="MovieDetailPage25">
              {movie.reviews.results.slice(0, 3).map(r => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        )}
        
        <SimilarMovies items={movie.similar?.results || []} title="Similar Movies" />
      </div>
    </div>
  )
}
