export const formatDate = (str) => {
  if (!str) return 'N/A'
  return new Date(str).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export const formatRuntime = (mins) => {
  if (!mins) return 'N/A'
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}h ${m}m`
}

export const formatCurrency = (n) => {
  if (!n) return 'N/A'
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(n)
}

export const truncateText = (str, max = 150) => {
  if (!str) return ''
  return str.length > max ? str.slice(0, max) + '...' : str
}

export const getYear = (str) => str ? new Date(str).getFullYear() : 'N/A'
