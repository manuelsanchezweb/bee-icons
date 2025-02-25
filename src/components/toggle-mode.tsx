'use client'

import { useTheme } from '@/context/ThemeContext'
import { useEffect } from 'react'

export default function ToggleMode() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    document.body.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <>
      <label className="switch">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={!isDark === true}
        />
        <span className="slider"></span>
      </label>
    </>
  )
}
