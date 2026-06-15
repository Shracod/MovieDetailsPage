import { useState } from 'react'

export default function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false)
  const content = review.content || ''
  const isLong = content.length > 300
  const initials = review.author?.slice(0, 2).toUpperCase() || '??'

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-tmdb-dark border border-tmdb-blue flex items-center justify-center text-tmdb-blue font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-white font-medium text-sm">{review.author}</p>
          {review.author_details?.rating && (
            <p className="text-yellow-400 text-xs">{'★'.repeat(Math.round(review.author_details.rating / 2))} {review.author_details.rating}/10</p>
          )}
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">
        {expanded || !isLong ? content : content.slice(0, 300) + '...'}
      </p>
      {isLong && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="text-tmdb-blue text-xs mt-2 hover:underline"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
