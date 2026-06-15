export default function RatingBadge({ rating, size = 40 }) {
  const score = Math.round(rating * 10)
  const color = score >= 70 ? '#E50914' : score >= 50 ? '#ff6b6b' : '#555'
  const r = (size / 2) - 3
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ

  return (
    <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="#141414" stroke="#2a2a2a" strokeWidth="3" />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth="3" strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <span style={{
        position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
        justifyContent: 'center', fontSize: size * 0.28, fontWeight: 700, color: 'white',
      }}>
        {score}<sup style={{ fontSize: size * 0.16 }}>%</sup>
      </span>
    </div>
  )
}
