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

  const initialValue = {id:'', name: '', email: '', phone: '', dob: ''}

  const [gridApi, setGridApi] = useState(null)
  const [tableData, setTableData] = useState(null)

  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState(initialValue);

  const handleClickOpen = () => {
    setModalOpen(true);
  }

  const handleClickClose = () => {
    setFormData(initialValue)
    setModalOpen(false);
  }

  const handleInputChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleDelete = (id) => {
    const confirm=window.confirm("Are you sure, you want to delete this row", id)
    console.log(confirm)
    if(confirm){
      fetch(url+`/${id}`,{method:"DELETE"}).then(resp=>resp.json()).then(resp=>getUsers())
    }
  }

  const handleUpdate = (oldData) => {
    console.log(oldData)
    setFormData(oldData)
    handleClickOpen()
  }

  const handleFormSubmit = () => {
    // console.log(formData)
    if(formData.id) {
      fetch(url+`/${formData.id}`,{method:"PUT",body:JSON.stringify(formData), headers:{
        'content-type':"application/json"
      }}).then(resp=>resp.json())
      .then(resp=>{
        handleClickClose()
        getUsers()
      })
    } else {
      fetch(url,{method:"POST",body:JSON.stringify(formData),headers:{
        'content-type':"application/json"
      }}).then(resp=>resp.json())
      .then(resp=>{
        handleClickClose()
        getUsers()
      })
    }
  }

  const url = 'http://localhost:8888/users'

  useEffect(() => {
    getUsers();
  },[])

  const getUsers= () => {
    fetch(url).then(resp=>resp.json()).then(resp=>setTableData(resp))
  }

  const ActionsRenderer = (params) => (
    <div className='flex items-center justify-center h-full gap-3'>
      <button className='flex items-center justify-center h-10 p-1 text-white bg-green-700 rounded-md hover:bg-green-400'
        onClick={()=>handleUpdate(params.data)}
      >
        Update
      </button>
      <button className='flex items-center justify-center h-10 p-1 text-white bg-red-700 rounded-md hover:bg-red-400'
        onClick={()=>handleDelete(params.value)}
      >
        Delete
      </button>
    </div>
  );

  const gridOptions = {
    rowHeight: 50,
    columnDefs: [
      { headerName: "ID", field: "id"},
      { headerName: "Name", field: "name"},
      { headerName: "Email", field: "email"},
      { headerName: "Phone", field: "phone"},
      { headerName: "Date of Birth", field: "dob"},
      { headerName: "Actions", field: "id", cellRenderer: ActionsRenderer, cellStyle: { textAlign: "center" }}
    ]
  }

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
          title={formData.id ? <div className="py-4 text-xl font-black">Update User</div> : <div className="py-4 text-xl font-black">Create New User</div>}
          onClose={() => handleClickClose()}
          footer={
            <div className="flex justify-end gap-2 py-2">
              <button className='p-2 pl-4 pr-4 m-1 text-white bg-blue-700 rounded-md hover:bg-blue-400' onClick={() => handleFormSubmit()}>
                {formData.id? "Update" : "Submit"}
              </button>
              <button className='p-2 pl-4 pr-4 m-1 text-white bg-red-700 rounded-md hover:bg-red-400' onClick={() => handleClickClose()}>
                Cancel
              </button>
            </div>
          }
        >
          <form onSubmit={handleFormSubmit}>
            <div className="flex gap-4 mb-4 item-center">
                <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold">Name</span>
                <TextField placeholder={"Enter name"} type={"text"} value={formData.name} onChange={handleInputChange("name")} />
            </div>
            <div className="flex gap-4 mb-4 item-center">
                <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold whitespace-nowrap">E-mail</span>
                <TextField placeholder={"Enter e-mail"} type={"text"} value={formData.email} onChange={handleInputChange("email")} />
            </div>
            <div className="flex gap-4 mb-4 item-center">
                <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold">Phone</span>
                <TextField placeholder={"Enter phone number"} type={"text"} value={formData.phone} onChange={handleInputChange("phone")} />
            </div>
            <div className="flex gap-4 mb-4 item-center">
                <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold">DoB</span>
                <TextField placeholder={"Enter date of birth"} type={"date"} value={formData.dob} onChange={handleInputChange("dob")}/>
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
          gridOptions={gridOptions}
          // columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />

      </div>

    </div>
  )
}

export default Table
