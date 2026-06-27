import { useParams } from 'react-router-dom'
import { useTVDetail } from '../hooks/useTVDetail'
import { getPosterUrl, getBackdropUrl } from '../utils/imageHelpers'
import { formatDate } from '../utils/formatHelpers'
import RatingBadge from '../components/common/RatingBadge'
import CastRow from '../components/detail/CastRow'
import TrailerModal from '../components/detail/TrailerModal'
import ReviewCard from '../components/detail/ReviewCard'
import SimilarMovies from '../components/detail/SimilarMovies'
import WatchlistButton from '../components/detail/WatchlistButton'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function TVDetailPage() {
  const { id } = useParams()
  const { data: show, isLoading, isError } = useTVDetail(id)

  if (isLoading) return <LoadingSpinner text="Loading show..." />
  if (isError) return <div className="TVDetailPage1--error">Failed to load show.</div>

  return (
    <div className="TVDetailPage1">
      <div className="TVDetailPage2">
        <img
          src={getBackdropUrl(show.backdrop_path)}
          alt={show.name}
          className="TVDetailPage3"
        />
        <div className="TVDetailPage4" />
        <div className="TVDetailPage5" />
      </div>

      <div className="TVDetailPage6">
        <div className="TVDetailPage7">
          <img
            src={getPosterUrl(show.poster_path, 'w342')}
            alt={show.name}
            className="TVDetailPage8"
            loading="lazy"
          />
          <div className="TVDetailPage9">
            <h1 className="TVDetailPage10">{show.name}</h1>
            {show.tagline && (
              <p className="TVDetailPage11">{show.tagline}</p>
            )}
            <div className="TVDetailPage12">
              {show.genres?.map(g => (
                <span key={g.id} className="TVDetailPage13">{g.name}</span>
              ))}
            </div>
            <div className="TVDetailPage14">
              <RatingBadge rating={show.vote_average || 0} size={52} />
              <span className="TVDetailPage14b">{show.status}</span>
              <div className="TVDetailPage15">
                <p>📅 First aired: {formatDate(show.first_air_date)}</p>
                <p>📺 {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''} · 🎬 {show.number_of_episodes} Episodes</p>
              </div>
            </div>
            <div className="TVDetailPage16">
              {show.vote_average > 0 && (
                <div className="TVDetailPage17">
                  <p className="TVDetailPage18">Score</p>
                  <p className="TVDetailPage19">{show.vote_average?.toFixed(1)}/10</p>
                </div>
              )}
              {show.vote_count > 0 && (
                <div className="TVDetailPage17">
                  <p className="TVDetailPage18">Votes</p>
                  <p className="TVDetailPage19">{(show.vote_count / 1000).toFixed(1)}K</p>
                </div>
              )}
              {show.number_of_seasons > 0 && (
                <div className="TVDetailPage17">
                  <p className="TVDetailPage18">Seasons</p>
                  <p className="TVDetailPage19">{show.number_of_seasons}</p>
                </div>
              )}
              {show.number_of_episodes > 0 && (
                <div className="TVDetailPage17">
                  <p className="TVDetailPage18">Episodes</p>
                  <p className="TVDetailPage19">{show.number_of_episodes}</p>
                </div>
              )}
            </div>
            <div className="TVDetailPage20">
              <WatchlistButton item={show} />
              <TrailerModal videos={show.videos?.results || []} />
            </div>

            <h2 className="TVDetailPage21">Synopsis</h2>
            <p className="TVDetailPage22">{show.overview || 'No overview available.'}</p>

            {show.networks?.length > 0 && (
              <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: '#aaa' }}>
                <span style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.65rem', letterSpacing: '0.05em', marginRight: '6px' }}>Network</span>
                {show.networks.map(n => n.name).join(', ')}
              </p>
            )}
          </div>
        </div>

        <CastRow cast={show.credits?.cast || []} />

        {show.reviews?.results?.length > 0 && (
          <div className="TVDetailPage23">
            <h2 className="TVDetailPage24">Reviews</h2>
            <div className="TVDetailPage25">
              {show.reviews.results.slice(0, 3).map(r => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </div>
        )}
        <SimilarMovies items={show.similar?.results || []} title="Similar Shows" />
      </div>
    </div>
  )
}
