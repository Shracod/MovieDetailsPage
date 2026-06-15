import { useParams, Link } from 'react-router-dom'
import { usePerson } from '../hooks/usePerson'
import { getProfileUrl, getPosterUrl } from '../utils/imageHelpers'
import { formatDate } from '../utils/formatHelpers'
import LoadingSpinner from '../components/common/LoadingSpinner'

export default function PersonPage() {
  const { id } = useParams()
  const { data: person, isLoading, isError } = usePerson(id)

  if (isLoading) return <LoadingSpinner text="Loading..." />
  if (isError) return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E50914' }}>
      Failed to load person.
    </div>
  )

  const credits = person.combined_credits?.cast
    ?.sort((a, b) => b.popularity - a.popularity)
    ?.slice(0, 12) || []

  return (
    <div className="PersonPage1">
      <div className="PersonPage2">
        <div className="PersonPage3">
          <div className="PersonPage4">
            <img src={getProfileUrl(person.profile_path, 'w342')} alt={person.name} className="PersonPage5" />
          </div>
          <div className="PersonPage6">
            <h1 className="PersonPage7">{person.name}</h1>
            <p className="PersonPage8">{person.known_for_department}</p>
            <div className="PersonPage9">
              {person.birthday && (
                <div><p className="PersonPage10">Born</p><p>{formatDate(person.birthday)}</p></div>
              )}
              {person.deathday && (
                <div><p className="PersonPage10">Died</p><p>{formatDate(person.deathday)}</p></div>
              )}
              {person.place_of_birth && (
                <div className="PersonPage11"><p className="PersonPage10">Birthplace</p><p>{person.place_of_birth}</p></div>
              )}
            </div>
            {person.biography && (
              <>
                <h2 className="PersonPage13">Biography</h2>
                <p className="PersonPage14">{person.biography}</p>
              </>
            )}
          </div>
        </div>
        {credits.length > 0 && (
          <div>
            <h2 className="PersonPage15">Known For</h2>
            <div className="PersonPage16">
              {credits.map(item => {
                const isTV = item.media_type === 'tv'
                const title = item.title || item.name
                return (
                  <Link key={item.id} to={isTV ? `/tv/${item.id}` : `/movie/${item.id}`} className="PersonPage17">
                    <div className="PersonPage18">
                      <img src={getPosterUrl(item.poster_path, 'w185')} alt={title} className="PersonPage19" loading="lazy" />
                    </div>
                    <p className="PersonPage20">{title}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
