import { Link } from 'react-router-dom'
import { getPosterUrl } from '../../utils/imageHelpers'
import { getYear } from '../../utils/formatHelpers'
import RatingBadge from './RatingBadge'

export default function MovieCard({ item }) {
  const isTV = item.media_type === 'tv' || item.first_air_date
  const title = item.title || item.name
  const date = item.release_date || item.first_air_date
  const link = isTV ? `/tv/${item.id}` : `/movie/${item.id}`

  return (
    <Link to={link} className="flex-shrink-0 w-36 group">
      <div className="relative rounded-lg overflow-hidden mb-2"
        style={{ border: '1px solid #2a2a2a' }}>
        <img
          src={getPosterUrl(item.poster_path)}
          alt={title}
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ background: 'rgba(229,9,20,0.15)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-16"
          style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
        <div className="absolute bottom-1 left-1">
          <RatingBadge rating={item.vote_average || 0} size={34} />
        </div>
      </div>
      <p className="text-white text-xs font-medium line-clamp-2 leading-snug group-hover:text-red-500 transition-colors">{title}</p>
      <p style={{ color: '#666' }} className="text-xs mt-0.5">{getYear(date)}</p>
    </Link>
  )
}
