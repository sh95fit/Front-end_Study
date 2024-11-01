import React, { useContext, useState } from 'react'

import { mockSearchResults } from "../constants/mock"

import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid"
import SearchResults from './SearchResults';
import ThemeContext from '../context/ThemeContext';

import { searchSymbols } from '../api/stock-api';

const Search = () => {

  const { darkMode } = useContext(ThemeContext)

  const [input, setInput] = useState("");
  const [bestMatches, setBestMatches] = useState([]);

  const clear = () => {
    setInput("")
    setBestMatches([]);
  };

  const updateBestMatchs = async () => {
    try {
      if (input) {
        const searchResults = await searchSymbols(input);
        const result = searchResults.result;
        setBestMatches(result);
      }
    }
    catch (error) {
      setBestMatches([])
      console.log(error);
    }
  }

  return (
    // <div className="relative z-50 flex my-4 bg-white border-2 rounded-md item-center w-96 border-neutral-200">
    <div className={`relative z-50 flex my-4 bg-white border-2 rounded-md item-center w-96
                    ${darkMode ? "bg-gray-900 border-gray-900" : "border-neutral-200"}
    `}>
      <input
        type="text"
        value={input}
        // className="w-full px-4 py-2 rounded-md focus:outline-none"
        className={`w-full px-4 py-2 rounded-md focus:outline-none
                    ${darkMode ? "bg-gray-900" : null}
        `}
        placeholder="Search stock..."
        onChange={ (event) => {setInput(event.target.value)} }
        onKeyUp={(event) => {if (event.key === "Enter") {updateBestMatchs();}}}
      />

      { input && (
        <button onClick={ clear } className='m-2'>
          <XMarkIcon className="w-4 h-4 fill-gray-500" />
        </button>
      )}

      <button
        onClick={updateBestMatchs}
        className='flex items-center justify-center w-8 h-8 p-2 m-1 transition duration-300 bg-indigo-600 rounded-md hover:ring-2 ring-indigo-400'
      >
        <MagnifyingGlassIcon className='w-4 h-4 fill-gray-100' />
      </button>

      {input && bestMatches.length > 0 ? <SearchResults results={bestMatches} /> : null}
    </div>
  )
}

export default Search
