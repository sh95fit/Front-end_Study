import React, { useContext } from 'react'
import Card from './Card'
import ThemeContext from '../context/ThemeContext';

const Details = ( {details} ) => {
  const detailList = {
    name : "Name",
    country : "Country",
    currency : "Currency",
    exchange : "Exchange",
    ipo : "IPO Date",
    marketCapitalization : "Market Capitalization",
    finnhubIndustry: "Industry",
  };

  const { darkMode } = useContext(ThemeContext);

  const convertMillionToBillion = (number) => {
    return (number / 1000).toFixed(2);
  };

  return (
    <Card>
      {/* <ul className="flex flex-col justify-between w-full h-full divide-y-1"> */}
      <ul className={`flex flex-col justify-between w-full h-full divide-y-1
                      ${darkMode ? "divide-gray-800" : null}
      `}>
        {Object.keys(detailList).map((item) => {
          return (
            <li key={item} className='flex items-center justify-between flex-1'>
              <span>{detailList[item]}</span>
              <span>{item === "marketCapitalization" ? `${convertMillionToBillion(details[item])}B` : details[item]}</span>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

export default Details
