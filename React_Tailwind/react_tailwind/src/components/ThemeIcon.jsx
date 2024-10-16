import React from 'react'
import { MoonIcon } from '@heroicons/react/24/solid'

const ThemeIcon = () => {
  return (
    <button className='absolute p-2 rounded-lg shadow-lg border-1 border-neutral-400 right-8 xl:right-32'>
      <MoonIcon className='w-8 h-8 cursor-pointer stroke-1 fill-none stroke-neutral-400'/>
    </button>
  )
}

export default ThemeIcon
