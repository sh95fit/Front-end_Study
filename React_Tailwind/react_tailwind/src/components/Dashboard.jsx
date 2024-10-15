import React from 'react'
import Card from "./Card"

const Dashboard = () => {
  return (
    <div className='grid h-screen grid-cols-1 gap-6 p-10 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr font-quicksand'>
      <div className="col-span-1 row-span-1 md:col-span-2 xl:col-span-3">
        <Card>Header</Card>
      </div>
      <div className='row-span-4 md:col-span-2'>
        <Card>Chart</Card>
      </div>
      <div>
        <Card>Overview</Card>
      </div>
      <div className="row-span-2 xl:row-span-3">
        <Card>Details</Card>
      </div>
    </div>
  )
}

export default Dashboard;
