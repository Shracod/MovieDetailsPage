import { create } from 'zustand'

const getStored = () => {
  try { return JSON.parse(localStorage.getItem('watchlist') || '[]') }
  catch { return [] }
}

export const useWatchlistStore = create((set, get) => ({
  items: getStored(),
  addToWatchlist: (item) => {
    const updated = [...get().items, item]
    localStorage.setItem('watchlist', JSON.stringify(updated))
    set({ items: updated })
  },
  removeFromWatchlist: (id) => {
    const updated = get().items.filter(i => i.id !== id)
    localStorage.setItem('watchlist', JSON.stringify(updated))
    set({ items: updated })
  },
  isInWatchlist: (id) => get().items.some(i => i.id === id),
}))
