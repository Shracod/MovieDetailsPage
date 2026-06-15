import { create } from 'zustand'

export const useSearchStore = create((set) => ({
  query: '',
  mediaType: 'multi',
  genreId: '',
  year: '',
  sortBy: 'popularity.desc',
  page: 1,
  setQuery: (query) => set({ query, page: 1 }),
  setMediaType: (mediaType) => set({ mediaType, page: 1 }),
  setGenreId: (genreId) => set({ genreId, page: 1 }),
  setYear: (year) => set({ year, page: 1 }),
  setSortBy: (sortBy) => set({ sortBy, page: 1 }),
  setPage: (page) => set({ page }),
  reset: () => set({ query: '', mediaType: 'multi', genreId: '', year: '', sortBy: 'popularity.desc', page: 1 }),
}))
