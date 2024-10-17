import React from 'react'
import { MoonIcon } from '@heroicons/react/24/solid'

import { useContext } from 'react'
import ThemeContext from "../context/ThemeContext"

const ThemeIcon = () => {
  const {darkMode, setDarkMode} = useContext(ThemeContext);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <button
      // className='absolute p-2 rounded-lg shadow-lg border-1 border-neutral-400 right-8 xl:right-32'
      className={`absolute p-2 rounded-lg shadow-lg border-1 border-neutral-400 right-8 xl:right-32 ${darkMode ? "shadow-gray-800" : null}`}
      onClick={toggleDarkMode}
    >
      <MoonIcon
        // className='w-8 h-8 cursor-pointer stroke-1 fill-none stroke-neutral-400'
        className={`
          w-8 h-8 cursor-pointer stroke-1 fill-none
          ${darkMode ? "fill-yellow-400 stroke-yellow-400" : "fill-none stroke-neutral-400"}
        `}
      />
    </button>
  )
}

export default ThemeIcon
