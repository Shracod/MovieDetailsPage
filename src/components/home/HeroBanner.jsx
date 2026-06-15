import { Link } from 'react-router-dom'
import { getBackdropUrl } from '../../utils/imageHelpers'
import { truncateText } from '../../utils/formatHelpers'
import RatingBadge from '../common/RatingBadge'

export default function HeroBanner({ item }) {
  if (!item) return null
  const isTV = item.media_type === 'tv'
  const title = item.title || item.name
  const link = isTV ? `/tv/${item.id}` : `/movie/${item.id}`

  return (
    <div className="relative h-[70vh] min-h-[400px] w-full overflow-hidden mb-10">
      <img src={getBackdropUrl(item.backdrop_path)} alt={title} className="w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,5,5,0.97) 40%, rgba(5,5,5,0.3) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(5,5,5,0.9) 0%, transparent 50%)' }} />
      <div className="absolute inset-0 flex items-center px-8 md:px-16">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <span style={{ background: '#E50914', color: 'white' }} className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {isTV ? 'TV Show' : 'Movie'}
            </span>
            <span style={{ color: '#888' }} className="text-xs uppercase tracking-widest">Trending Today</span>
          </div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-3 leading-tight">{title}</h1>
          <div className="flex items-center gap-3 mb-4">
            <RatingBadge rating={item.vote_average || 0} size={48} />
            <span style={{ color: '#aaa' }} className="text-sm">User Score</span>
          </div>
          <p style={{ color: '#ccc' }} className="text-sm leading-relaxed mb-6">
            {truncateText(item.overview, 180)}
          </p>
          <Link to={link}
            style={{ background: '#E50914' }}
            className="inline-block hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition-colors">
            View Details →
          </Link>
        </div>
      </div>
    </div>
  )
}
