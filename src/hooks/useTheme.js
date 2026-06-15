import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.setAttribute('data-theme', 'dark')
      document.body.style.backgroundColor = '#0a0a0a'
      document.body.style.color = '#f0f0f0'
    } else {
      root.classList.remove('dark')
      root.setAttribute('data-theme', 'light')
      document.body.style.backgroundColor = '#f5f5f5'
      document.body.style.color = '#111111'
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  return { theme, toggleTheme }
}
