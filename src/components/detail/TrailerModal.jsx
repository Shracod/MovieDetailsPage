import { useState } from 'react'

export default function TrailerModal({ videos = [] }) {
  const [open, setOpen] = useState(false)
  const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube')
    || videos.find(v => v.site === 'YouTube')

  if (!trailer) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white text-white text-sm font-medium hover:bg-white hover:text-gray-900 transition-all"
      >
        ▶ Play Trailer
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={() => setOpen(false)}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setOpen(false)}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >✕ Close</button>
            <div style={{ paddingTop: '56.25%', position: 'relative' }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                title="Trailer"
                allow="autoplay; encrypted-media"
                allowFullScreen
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: '12px' }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
