import React, { useContext, useEffect, useState } from 'react'
// import Card from "./Card"
import Header from './Header'
import Details from './Details'
import Overview from './Overview'
import Chart from './Chart'

// import { mockSearchResults } from "../constants/mock"
// import { mockCompanyDetails } from "../constants/mock"
import ThemeContext from '../context/ThemeContext'
import StockContext from '../context/StockContext'
import { fetchQuote, fetchStockDetails } from '../api/stock-api'

const Dashboard = () => {

  const {darkMode} = useContext(ThemeContext);
  const { stockSymbol } = useContext(StockContext);

  const [ stockDetails, setStockDetails ] = useState([]);
  const [ quote, setQuote ] = useState([]);

  useEffect(() => {
    const updateStockDetails = async () => {
      try {
        const result = await fetchStockDetails(stockSymbol);
        setStockDetails(result);
      } catch (error) {
        setStockDetails({});
        console.log(error);
      }
    };
    const updateStockOverview = async () => {
      try {
        const result = await fetchQuote(stockSymbol);
        setQuote(result);
      } catch (error) {
        setQuote([]);
        console.log(error);
      }
    };

    updateStockDetails();
    updateStockOverview();
  }, [stockSymbol])

  return (
    // <div className='grid h-screen grid-cols-1 gap-6 p-10 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr font-quicksand bg-neutral-100'>
    <div
      className={`grid h-screen grid-cols-1 gap-6 p-10 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr font-quicksand
                  ${darkMode ? "bg-gray-900 text-gray-300" : "bg-neutral-100 "}
      `}>
      <div className="flex items-center justify-start col-span-1 row-span-1 md:col-span-2 xl:col-span-3">
        {/* <Card>Header</Card> */}
        <Header name={stockDetails.name} />
      </div>
      <div className='row-span-4 md:col-span-2'>
        {/* <Card>Chart</Card> */}
        <Chart />
      </div>
      <div>
        {/* <Card>Overview</Card> */}
        <Overview symbol={stockSymbol} price={quote.pc} change={quote.d} changePercent={quote.dp} currency={stockDetails.currency} />
      </div>
      <div className="row-span-2 xl:row-span-3">
        {/* <Card>Details</Card> */}
        <Details details={stockDetails}></Details>
      </div>
    </div>
  )
}

export default Dashboard;
