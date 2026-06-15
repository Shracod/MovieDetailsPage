import { Link } from 'react-router-dom'
import { getPosterUrl } from '../../utils/imageHelpers'
import { getYear, truncateText } from '../../utils/formatHelpers'
import RatingBadge from '../common/RatingBadge'

export default function SearchResultCard({ item }) {
  const isTV = item.media_type === 'tv' || item.first_air_date
  const isPerson = item.media_type === 'person'
  const title = item.title || item.name
  const date = item.release_date || item.first_air_date
  const link = isPerson ? `/person/${item.id}` : isTV ? `/tv/${item.id}` : `/movie/${item.id}`
  const typeLabel = isPerson ? 'Person' : isTV ? 'TV Show' : 'Movie'

  return (
    <Link to={link}
      style={{ background: '#141414', border: '1px solid #2a2a2a' }}
      className="flex gap-4 hover:border-red-600 rounded-xl p-3 transition-all group">
      <img
        src={getPosterUrl(item.poster_path || item.profile_path, 'w92')}
        alt={title}
        className="w-16 h-24 object-cover rounded-lg flex-shrink-0"
        style={{ border: '1px solid #2a2a2a' }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-red-500 transition-colors">{title}</h3>
          <span style={{ background: '#E50914', color: 'white' }}
            className="text-xs px-2 py-0.5 rounded-full flex-shrink-0 font-medium">
            {typeLabel}
          </span>
        </div>
        {date && <p style={{ color: '#666' }} className="text-xs mb-2">{getYear(date)}</p>}
        {item.vote_average > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <RatingBadge rating={item.vote_average} size={28} />
            <span style={{ color: '#666' }} className="text-xs">User score</span>
          </div>
        )}
        {item.overview && (
          <p style={{ color: '#888' }} className="text-xs leading-relaxed line-clamp-2">
            {truncateText(item.overview, 150)}
          </p>
        )}
        {item.known_for_department && (
          <p style={{ color: '#666' }} className="text-xs">Known for: {item.known_for_department}</p>
        )}
      </div>
    </Link>
  )
}
