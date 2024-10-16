import React from 'react'

const SearchResults = ({ results }) => {
  return (
    <ul className="absolute w-full h-64 overflow-y-scroll bg-white border-2 rounded-md top-12 border-neutral-200 custom-scrollbar">
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            className="flex items-center justify-between p-4 m-2 rounded-md cursor-pointer hover:bg-indigo-200"
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>)
      })}
    </ul>
  )
}

export default SearchResults
