import React, { useEffect, useState } from 'react'

// React Data Grid Component
import { AgGridReact } from 'ag-grid-react';
// Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-grid.css";
// Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";


import CrudDialog from './CrudDialog'


const Table = () => {
  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)

  const [modalOpen, setModalOpen] = useState(false);

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
    <div className='flex flex-col'>
      <div className='p-4 text-4xl text-center'>
        <h1>React-AgGrid</h1>
      </div>
      <div className='text-2xl text-center'>
        <h1>CRUD Operation with Json-Server in Ag-grid</h1>
      </div>
      <div className="flex ml-auto">
        <button
          className='p-3 m-2 font-bold text-white bg-blue-700 rounded-md shadow-md hover:bg-blue-500'
          onClick={() => setModalOpen(true)}
        >
          Add User
        </button>
      </div>

      {modalOpen && (
        <CrudDialog
          title={<div className="py-4 text-xl font-semibold">Custom Header</div>}
          onClose={() => setModalOpen(false)}
          footer={
            <div className="flex justify-end gap-2 py-2">
              <button className='p-2 pl-4 pr-4 m-1 text-white bg-blue-700 rounded-md hover:bg-blue-400' onClick={() => setModalOpen(false)}>
                OK
              </button>
              <button className='p-2 pl-4 pr-4 m-1 text-white bg-blue-700 rounded-md hover:bg-blue-400' onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          }
        >
          Modal Content
        </CrudDialog>
      )}

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
