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
  if (isError) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E50914' }}>
      Failed to load show.
    </div>
  )

  return (
    <div className="TVDetailPage1">
      <div className="TVDetailPage2">
        <img src={getBackdropUrl(show.backdrop_path)} alt={show.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="TVDetailPage3" />
        <div className="TVDetailPage4" />
      </div>
      <div className="TVDetailPage5">
        <div className="TVDetailPage6">
          <img src={getPosterUrl(show.poster_path, 'w342')} alt={show.name}
            className="TVDetailPage7" loading="lazy" />
          <div className="TVDetailPage8">
            <h1 className="TVDetailPage9">{show.name}</h1>
            {show.tagline && <p className="TVDetailPage10">{show.tagline}</p>}
            <div className="TVDetailPage11">
              {show.genres?.map(g => <span key={g.id} className="TVDetailPage12">{g.name}</span>)}
            </div>
            <div className="TVDetailPage13">
              <RatingBadge rating={show.vote_average || 0} size={56} />
              <div className="TVDetailPage14">
                <p>📅 First aired: {formatDate(show.first_air_date)}</p>
                <p>📺 {show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}</p>
                <p>🎬 {show.number_of_episodes} Episodes</p>
                <p>📡 {show.status}</p>
              </div>
            </div>
            <div className="TVDetailPage15">
              <WatchlistButton item={show} />
              <TrailerModal videos={show.videos?.results || []} />
            </div>
            <h2 className="TVDetailPage16">Overview</h2>
            <p className="TVDetailPage17">{show.overview}</p>
            {show.networks?.length > 0 && (
              <div className="TVDetailPage18">
                <p className="TVDetailPage19">Network</p>
                <p className="TVDetailPage20">{show.networks.map(n => n.name).join(', ')}</p>
              </div>
            )}
          </div>
        </div>
        <CastRow cast={show.credits?.cast || []} />
        {show.reviews?.results?.length > 0 && (
          <div className="TVDetailPage21">
            <h2 className="TVDetailPage22">Reviews</h2>
            <div className="TVDetailPage23">
              {show.reviews.results.slice(0, 3).map(r => <ReviewCard key={r.id} review={r} />)}
            </div>
          </div>
        )}
        <SimilarMovies items={show.similar?.results || []} title="Similar Shows" />
      </div>
    </div>
  )
}
