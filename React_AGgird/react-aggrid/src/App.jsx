import React from 'react'
import './App.css'

// import Table from './components/Table';
// import InfiniteScroll from './components/InfiniteScroll'
// import ServerSideTable from './components/ServerSideTable'
// import FileDropzone from './components/FileDropzone'
import CrudTable from './components/CrudTable'

function App() {
  return (
    // <FileDropzone />
    <div>
      <CrudTable/>
      {/* <Table /> */}
      {/* <InfiniteScroll /> */}
      {/* <ServerSideTable /> */}
    </div>
  )
}

export default App
