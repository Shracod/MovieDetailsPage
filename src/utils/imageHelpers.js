const BASE = 'https://image.tmdb.org/t/p'

export const getPosterUrl = (path, size = 'w342') =>
  path ? `${BASE}/${size}${path}` : 'https://via.placeholder.com/342x513?text=No+Image'

export const getBackdropUrl = (path, size = 'w1280') =>
  path ? `${BASE}/${size}${path}` : 'https://via.placeholder.com/1280x720?text=No+Image'

export const getProfileUrl = (path, size = 'w185') =>
  path ? `${BASE}/${size}${path}` : 'https://via.placeholder.com/185x278?text=No+Photo'
