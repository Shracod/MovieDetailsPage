import { Link } from 'react-router-dom'
import { getProfileUrl } from '../../utils/imageHelpers'

export default function CastRow({ cast = [] }) {
  if (!cast.length) return null

  return (
    <section className="mb-10">
      <h2 className="text-2xl font-bold text-white mb-4">Top Cast</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {cast.slice(0, 15).map(person => (
          <Link to={`/person/${person.id}`} key={person.cast_id || person.id}
            className="flex-shrink-0 w-28 group text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-2 border-2 border-gray-700 group-hover:border-tmdb-blue transition-colors">
              <img
                src={getProfileUrl(person.profile_path)}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-white text-xs font-medium leading-snug">{person.name}</p>
            <p className="text-gray-400 text-xs leading-snug mt-0.5">{person.character}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
