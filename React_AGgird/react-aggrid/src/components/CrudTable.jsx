import React, { useEffect, useState } from 'react'

// React Data Grid Component
import { AgGridReact } from 'ag-grid-react';
// Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-grid.css";
// Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";


import CrudDialog from './CrudDialog'
import TextField from './TextField';

const Table = () => {

  const initialValue = {name: '', email: '', phone: '', dob: ''}

  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)

  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState(initialValue);

  const handleClickOpen = () => {
    setModalOpen(true);
  }

  const handleClickClose = () => {
    setModalOpen(false);
  }

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleFormSubmit = () => {
    // console.log(formData)
    fetch(url,{method:"POST",body:JSON.stringify(formData),headers:{
      'content-type':"application/json"
    }}).then(resp=>resp.json())
    .then(resp=>{
      handleClickClose()
      getUsers()
      setFormData(initialValue)
    })
  }

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
          onClick={() => handleClickOpen()}
        >
          Add User
        </button>
      </div>

      {modalOpen && (
        <CrudDialog
          title={<div className="py-4 text-xl font-black">Create New User</div>}
          onClose={() => handleClickClose()}
          footer={
            <div className="flex justify-end gap-2 py-2">
              <button className='p-2 pl-4 pr-4 m-1 text-white bg-blue-700 rounded-md hover:bg-blue-400' onClick={() => handleFormSubmit()}>
                OK
              </button>
              <button className='p-2 pl-4 pr-4 m-1 text-white bg-red-700 rounded-md hover:bg-red-400' onClick={() => handleClickClose()}>
                Cancel
              </button>
            </div>
          }
        >
          <form>
            <div className="flex gap-4 mb-4 item-center">
                <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold">Name</span>
                <TextField placeholder={"Enter name"} value={formData.name} onChange={handleInputChange("name")} />
            </div>
            <div className="flex gap-4 mb-4 item-center">
                <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold whitespace-nowrap">E-mail</span>
                <TextField placeholder={"Enter e-mail"} value={formData.email} onChange={handleInputChange("email")} />
            </div>
            <div className="flex gap-4 mb-4 item-center">
                <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold">Phone</span>
                <TextField placeholder={"Enter phone number"} value={formData.phone} onChange={handleInputChange("phone")} />
            </div>
            <div className="flex gap-4 mb-4 item-center">
                <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold">DoB</span>
                <TextField placeholder={"Enter date of birth"} value={formData.dob} onChange={handleInputChange("dob")}/>
            </div>
          </form>
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
