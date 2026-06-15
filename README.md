## Move

Move is a movie and TV show discovery app built with React. It lets you browse trending content, search for movies, shows, and people, and save titles to your personal watchlist. All data is powered by the TMDB API.

## Tech Stack

- **React 19** with Vite
- **React Router v7** for navigation
- **TanStack React Query** for data fetching
- **Zustand** for state management
- **Tailwind CSS** for styling

## How to Run

1. Install dependencies:
```sh
   npm install
```

2. Add your TMDB API key — create a `.env` file in the root:
```sh
   VITE_TMDB_API_KEY=your_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

3. Start the development server:
```sh
   npm run dev
```

## Features

- Trending movies and TV shows on the home page
- Search across movies, TV shows, and people with genre/year filters
- Full detail pages with cast, trailers, and reviews
- Watchlist saved to localStorage
- Dark / light theme toggle

## FAQs & Debugging

### 1. Getting `vite: not found` error
Node modules are missing. Run `npm install` first before running `npm run dev`.

### 2. App loads but no content shows
Check that your `.env` file exists and has a valid TMDB API key. You can get one free at themoviedb.org.

### 3. Watchlist not saving between sessions
The watchlist uses localStorage. Make sure your browser is not in private/incognito mode, as localStorage is cleared when the session ends.
