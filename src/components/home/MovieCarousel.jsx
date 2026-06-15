import { useRef } from 'react'
import MovieCard from '../common/MovieCard'
import SkeletonCard from '../common/SkeletonCard'

export default function MovieCarousel({ title, items = [], isLoading }) {
  const ref = useRef(null)
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * 600, behavior: 'smooth' })

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-4 px-4">
        <h2 className="text-white text-xl font-semibold flex items-center gap-2">
          <span style={{ color: '#E50914' }}>▎</span>{title}
        </h2>
        <div className="flex gap-2">
          {['‹', '›'].map((arrow, i) => (
            <button key={arrow} onClick={() => scroll(i === 0 ? -1 : 1)}
              style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#E50914' }}
              className="hover:bg-red-600 hover:text-white rounded-full w-8 h-8 flex items-center justify-center transition-all font-bold">
              {arrow}
            </button>
          ))}
        </div>
      </div>
      <div ref={ref} className="flex gap-4 overflow-x-auto px-4 pb-4 scroll-smooth"
        style={{ scrollbarWidth: 'none' }}>
        {isLoading
          ? Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
          : items.map(item => <MovieCard key={item.id} item={item} />)
        }
      </div>
    </section>
  )
}
