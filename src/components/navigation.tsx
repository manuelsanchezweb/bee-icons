import Logo from '@/assets/logo/logo'
import React from 'react'
import ToggleMode from './toggle-mode'
import Link from 'next/link'

export const Navigation = () => {
  return (
    <div className="flex gap-2 justify-between items-center mb-8 lg:mb-4">
      <Logo classIcon="flex" />

      <div className="flex gap-12 items-center">
        <a
          className="hidden sm:block hover:scale-110 focus:scale-110 transition-all"
          target="_blank"
          rel="noopener noreferrer"
          title="Check conditions of use"
          href="https://github.com/manuelsanchezweb/bee-icons/blob/main/LICENSE"
        >
          MIT License
        </a>
        <ToggleMode />
      </div>
    </div>
  )
}
