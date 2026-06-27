import { useParams, Link } from 'react-router-dom'
import { usePerson } from '../hooks/usePerson'
import { getProfileUrl, getPosterUrl } from '../utils/imageHelpers'
import { formatDate } from '../utils/formatHelpers'
import LoadingSpinner from '../components/common/LoadingSpinner'
import { useState } from 'react'

export default function PersonPage() {
  const { id } = useParams()
  const { data: person, isLoading, isError } = usePerson(id)
  const [bioExpanded, setBioExpanded] = useState(false)

  if (isLoading) return <LoadingSpinner text="Loading..." />
  if (isError) return (
    <div className="PersonPage1--error">Failed to load person.</div>
  )

  const credits = person.combined_credits?.cast
    ?.sort((a, b) => b.popularity - a.popularity)
    ?.slice(0, 12) || []

  return (
    <div className="PersonPage1">
      <div className="PersonPage2">

        <div className="PersonPage3">

          <div className="PersonPage4">
            <img
              src={getProfileUrl(person.profile_path, 'w342')}
              alt={person.name}
              className="PersonPage5"
            />
          </div>

          <div className="PersonPage6">
            <h1 className="PersonPage7">{person.name}</h1>

            {person.known_for_department && (
              <span className="PersonPage8">{person.known_for_department}</span>
            )}

            <div className="PersonPage9">
              {person.birthday && (
                <div className="PersonPageStat">
                  <p className="PersonPageStatLabel">Born</p>
                  <p className="PersonPageStatValue">{formatDate(person.birthday)}</p>
                </div>
              )}
              {person.deathday && (
                <div className="PersonPageStat">
                  <p className="PersonPageStatLabel">Died</p>
                  <p className="PersonPageStatValue">{formatDate(person.deathday)}</p>
                </div>
              )}
              {person.place_of_birth && (
                <div className="PersonPageStat PersonPageStat--wide">
                  <p className="PersonPageStatLabel">Birthplace</p>
                  <p className="PersonPageStatValue">{person.place_of_birth}</p>
                </div>
              )}
            </div>

            {person.biography && (
              <div className="PersonPageBio">
                <h2 className="PersonPage12">Biography</h2>
                <p className={`PersonPage13${bioExpanded ? ' PersonPage13--expanded' : ''}`}>
                  {person.biography}
                </p>
                {person.biography.length > 400 && (
                  <button className="PersonPageBioToggle" onClick={() => setBioExpanded(v => !v)}>
                    {bioExpanded ? 'Show less ↑' : 'Read more ↓'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {credits.length > 0 && (
          <div className="PersonPage14">
            <h2 className="PersonPage15">Known For</h2>
            <div className="PersonPage16">
              {credits.map(item => {
                const isTV = item.media_type === 'tv'
                const title = item.title || item.name
                return (
                  <Link
                    key={item.id}
                    to={isTV ? `/tv/${item.id}` : `/movie/${item.id}`}
                    className="PersonPage17"
                  >
                    <div className="PersonPage18">
                      <img
                        src={getPosterUrl(item.poster_path, 'w185')}
                        alt={title}
                        className="PersonPage19"
                        loading="lazy"
                      />
                      <div className="PersonPage18--overlay" />
                      <span className="PersonPage18--badge">
                        {isTV ? 'TV' : 'Film'}
                      </span>
                    </div>
                    <p className="PersonPage20">{title}</p>
                    {item.vote_average > 0 && (
                      <p className="PersonPage21">⭐ {item.vote_average.toFixed(1)}</p>
                    )}
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
