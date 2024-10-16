import React from 'react'
import Card from './Card'

const OverView = ({ symbol, price, change, changePercent, currency }) => {
  return (
    <Card>
      <span className="absolute text-lg left-4 top-4 text-neutral-400 xl:text-xl 2xl:text-2xl">
        {symbol}
      </span>
      <div className='flex items-center justify-around w-full h-full'>
        <span className="flex items-center text-2xl xl:text-4xl 2xl:text-5xl">
          ${price}
          <span className="m-2 text-lg xl:text-xl 2xl:text-2xl text-neutral-400">
            {currency}
          </span>
        </span>
        <span className={`text-lg xl:text-xl 2xl:text-2xl ${change > 0 ? "text-lime-500" : "text-red-500"}`}>
          { change }
          <span>({ changePercent }%)</span>
        </span>
      </div>
    </Card>
  )
}

export default OverView
