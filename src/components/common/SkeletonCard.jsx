export default function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-36 animate-pulse">
      <div className="bg-gray-700 rounded-lg h-52 w-full mb-2" />
      <div className="bg-gray-700 rounded h-3 w-3/4 mb-1" />
      <div className="bg-gray-700 rounded h-3 w-1/2" />
    </div>
  )
}
