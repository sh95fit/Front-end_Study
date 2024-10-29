import React, { useEffect, useState } from 'react'

// React Data Grid Component
import { AgGridReact } from 'ag-grid-react';
// Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-grid.css";
// Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";



const Table = () => {
  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)

  const url = 'http://localhost:8888/users'

  useEffect(() => {
    getUsers();
  },[])

  const getUsers= () => {
    fetch(url).then(resp=>resp.json()).then(resp=>setTableData(resp))
  }

  const columnDefs = [
    { headerName: "ID", field: "id"},
    { headerName: "Name", field: "name"},
    { headerName: "Email", field: "email"},
    { headerName: "Phone", field: "phone"},
    { headerName: "Date of Birth", field: "dob"},
  ]

  const onGridReady = (params) => {
    setGridApi(params)
  }

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true
  }

  return (
    <div className='flex flex-col justify-center'>
      <div className='p-4 text-4xl text-center'>
        <h1>React-AgGrid</h1>
      </div>
      <div className='text-2xl text-center'>
        <h1>CRUD Operation with Json-Server in Ag-grid</h1>
      </div>
      <div
        className={"ag-theme-quartz"}
        style={{ width: '100%', height: 900 }}
      >
        <AgGridReact
          rowData={tableData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />

      </div>

    </div>
  )
}

export default Table
