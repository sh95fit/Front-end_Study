import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'
import StockContext from '../context/StockContext'

const SearchResults = ({ results }) => {

  const { darkMode } = useContext(ThemeContext)

  const { setStockSymbol } = useContext(StockContext);

  return (
    // <ul className="absolute w-full h-64 overflow-y-scroll bg-white border-2 rounded-md top-12 border-neutral-200 custom-scrollbar">
    <ul className={`absolute w-full h-64 overflow-y-scroll bg-white border-2 rounded-md top-12
                    ${darkMode ? "bg-gray-900 border-gray-800 custom-scrollbar custom-scrollbar-dark" : "border-neutral-200 custom-scrollbar"}
    `}>
      {results.map((item) => {
        return (
          <li
            key={item.symbol}
            // className="flex items-center justify-between p-4 m-2 rounded-md cursor-pointer hover:bg-indigo-200"
            className={`flex items-center justify-between p-4 m-2 rounded-md cursor-pointer
                        ${darkMode ? "hover:bg-indigo-600" : "hover:bg-indigo-200"}
                        transition duration-300
            `}
            onClick={() => {
              setStockSymbol(item.symbol);
            }}
          >
            <span>{item.symbol}</span>
            <span>{item.description}</span>
          </li>)
      })}
    </ul>
  )
}

export default SearchResults
