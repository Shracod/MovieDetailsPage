import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-white gap-4">
      <h1 className="text-6xl font-bold text-tmdb-blue">404</h1>
      <p className="text-xl text-gray-400">Page not found</p>
      <Link to="/" className="bg-tmdb-blue hover:bg-blue-400 text-white px-6 py-2 rounded-full transition-colors">
        Back to Home
      </Link>
    </div>
  )
}
