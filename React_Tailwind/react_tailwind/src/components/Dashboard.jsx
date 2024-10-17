import React, { useContext } from 'react'
// import Card from "./Card"
import Header from './Header'
import Details from './Details'
import Overview from './Overview'
import Chart from './Chart'

import { mockSearchResults } from "../constants/mock"
import { mockCompanyDetails } from "../constants/mock"
import ThemeContext from '../context/ThemeContext'

const Dashboard = () => {

  const {darkMode} = useContext(ThemeContext);


  return (
    // <div className='grid h-screen grid-cols-1 gap-6 p-10 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr font-quicksand bg-neutral-100'>
    <div
      className={`grid h-screen grid-cols-1 gap-6 p-10 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr font-quicksand
                  ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100 "}
      `}>
      <div className="flex items-center justify-start col-span-1 row-span-1 md:col-span-2 xl:col-span-3">
        {/* <Card>Header</Card> */}
        <Header name={mockCompanyDetails.name} />
      </div>
      <div className='row-span-4 md:col-span-2'>
        {/* <Card>Chart</Card> */}
        <Chart />
      </div>
      <div>
        {/* <Card>Overview</Card> */}
        <Overview symbol={mockCompanyDetails.ticker} price={300} change={30} changePercent={10.0} currency={"USD"} />
      </div>
      <div className="row-span-2 xl:row-span-3">
        {/* <Card>Details</Card> */}
        <Details details={mockCompanyDetails}></Details>
      </div>
    </div>
  )
}

export default Dashboard;
