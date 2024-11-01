import React, { useEffect, useRef, useState, useCallback } from 'react'

// React Data Grid Component
import { AgGridReact } from 'ag-grid-react';
// Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-grid.css";
// Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import "ag-grid-enterprise";

import CrudDialog from './CrudDialog'
import TextField from './TextField';
import { clearLocalStorage, getLocalStorage, setLocalStorage } from '../utility';

import DetailsComponent from './Details';

const Table = () => {

  const TODAY = new Date();
  const nowDate = TODAY.toISOString().split('T')[0]

  // 현재 기준 2년 전
  const twoYearsAgoDate = new Date(TODAY);
  twoYearsAgoDate.setFullYear(TODAY.getFullYear() - 2)
  const twoYearsAgo = twoYearsAgoDate.toISOString().split('T')[0];

  const initialValue = {id:'', name: '', email: '', phone: '', dob: ''}

  const [gridApi, setGridApi] = useState(null)
  const gridApiRef = useRef(null); // 날짜 변경에 임시 사용
  const gridRef = useRef();

  const [tableData, setTableData] = useState(null)

  const [modalOpen, setModalOpen] = useState(false);

  const [formData, setFormData] = useState(initialValue);

  const [startDate, setStartDate] = useState(twoYearsAgo);
  const [endDate, setEndDate] = useState(nowDate);

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
    if (gridApi) {
      if(startDate !== '' && endDate !== '' && startDate>endDate) {
        alert("Start Date should be less than End Date")
        setStartDate(endDate)
      } else if(endDate > nowDate) {
        alert("End Date should be less than or equal to Now Date")
        setEndDate(nowDate)
      } else {
        DateFilter(startDate, endDate)
      }
    }
    getUsers();
  },[startDate, endDate, gridApi])

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

  const toDate = (date) => {
    const transDate = date.split(' ')[0]
    // const newDate = new Date(date)
    // console.log(newDate)

    // // 한국 표준시 변환
    // const kstOffset = newDate.getTimezoneOffset() * 60000;
    // const kstDate = new Date(newDate.getTime() + kstOffset + (9 * 3600000));

    // const transDate = kstDate.toISOString().split('T')[0];

    return transDate
  }

  const filterParams = {
    // minValidDate: "2024-01-01",
    // maxValidDate: TODAY,
    minValidYear: 2022,
    maxValidYear: 2024,
    comparator: (filterLocalDateAtMidnight, cellValue) => {    // filterLocalDateAtMidnight = 필터 적용 함수 반영  / cellValue : 실제 셀에 있는 값
      if (!cellValue) return -1; // 값이 없는 경우 필터에서 제외

      // cellValue를 문자열에서 Date로 변환 (예: "2024-10-31" → Date 객체)
      const [year, month, day] = cellValue.split("-");
      const cellDate = new Date(Number(year), Number(month) - 1, Number(day));

      // 날짜를 비교하여 필터링 조건을 설정
      if (cellDate.getTime() === filterLocalDateAtMidnight.getTime()) {
        return 0;
      }
      return cellDate < filterLocalDateAtMidnight ? -1 : 1;
    },
    browserDatePicker: true,
    inRangeInclusive: true, // 범위 내 포함 설정
    filterOptions: ['inRange', 'lessThan', 'greaterThan'], // 사용 가능한 필터 옵션 추가
  };

  const getFilterType = () => {
    if(startDate !== '' && endDate !== '') return 'inRange';
    else if (startDate !== '') return 'greaterThan';
    else if (endDate !== '') return 'lessThan';
  }

  const filterChanged = () => {
    const filterModel = gridApiRef.current.getColumnFilterModel('dob');

    if(filterModel) {
      const dateFrom = filterModel.dateFrom;
      const dateTo = filterModel.dateTo;

      const transDateFrom = toDate(dateFrom)
      const transDateTo = toDate(dateTo)

      setStartDate(transDateFrom)
      setEndDate(transDateTo)
    }
  }

  const DateFilter = async (startDate, endDate) => {
    var dateFilterComponent = await gridApi.api.getColumnFilterInstance('dob');
    // console.log(dateFilterComponent)
    dateFilterComponent.setModel({
      type: getFilterType(),
      dateFrom: startDate,
      // dateTo: TODAY.toISOString().split('T')[0],
      dateTo: endDate,
    });
    gridApi.api.onFilterChanged();
  }

  const gridOptions = {
    rowHeight: 50,
    columnDefs: [
      { headerName: "ID", field: "id", cellRenderer:'agGroupCellRenderer'},
      { headerName: "Name", field: "name"},
      { headerName: "Email", field: "email"},
      { headerName: "Phone", field: "phone"},
      { headerName: "Date of Birth", field: "dob", filter:'agDateColumnFilter', filterParams: filterParams},
      { headerName: "Actions", field: "id", cellRenderer: ActionsRenderer, cellStyle: { textAlign: "center" }}
    ]
  }

  const onGridReady = (params) => {
    setGridApi(params)
    gridApiRef.current = params.api;

    params.api.addEventListener('filterChanged', filterChanged);

    restoreState();
  }

  const defaultColDef = {
    sortable: true,
    flex: 1,
    filter: true,
    floatingFilter: true
  }


  // Column State
  const saveState = useCallback(() => {
    // window.colState = gridRef.current.api.getColumnState();
    const colState = gridRef.current.api.getColumnState();
    setLocalStorage(colState)
    closeSidebarToolpanel();
    console.log("column state saved");
  }, []);

  const restoreState = useCallback(() => {
    const colState = getLocalStorage()
    // if (!window.colState) {
    //   console.log("no columns state to restore by, you must save state first");
    //   return;
    // }
    if (!colState) {
      console.log("no columns state to restore by, you must save state first");
      return;
    }
    // gridRef.current.api.applyColumnState({
    //   state: window.colState,
    //   applyOrder: true,
    // });
    gridRef.current.api.applyColumnState({
      state: colState,
      applyOrder: true,
    });
    closeSidebarToolpanel();
    console.log("column state restored");
  // }, [window]);
  });

  const resetState = useCallback(() => {
    gridRef.current.api.resetColumnState();
    clearLocalStorage();
    closeSidebarToolpanel();
    console.log("column state reset");
  }, []);


  const closeSidebarToolpanel = () => [gridRef.current.api.closeToolPanel()];


  const onFirstDataRendered = (params) => {
    // 전체 행 디테일 펼치기
    // setTimeout(() => {
    //   params.api.forEachNode((node) => {
    //     node.setExpanded(true); // 각 행의 디테일을 펼치는 코드
    //   });
    // }, 1);

    // 특정 행 디테일 펼치기
    // setTimeout(() => {
    //   gridApi.api.getDisplayedRowAtIndex(0).setExpanded(true);
    // }, 3)

    // 특정 행 디테일 펼치기
    setTimeout(() => {
      const row1 = params.api.getDisplayedRowAtIndex(0)
      row1.setExpanded(true);
    }, 3)
  }


  return (
    <div className='flex flex-col'>
      <div className='p-4 text-4xl text-center'>
        <h1>React-AgGrid</h1>
      </div>
      <div className='text-2xl text-center'>
        <h1>CRUD Operation with Json-Server in Ag-grid</h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center w-1/3 gap-2">
          <div className="flex w-[20%] gap-2">
            <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold">From:</span>
            <TextField placeholder={"Enter date of birth"} type={"date"} value={startDate} onChange={e=>setStartDate(e.target.value)}/>
          </div>
          <span>-</span>
          <div className="flex w-[20%] gap-2">
            <span className="items-center justify-center w-[15%] m-2 text-lg font-semibold">To:</span>
            <TextField placeholder={"Enter date of birth"} type={"date"} value={endDate} onChange={e=>setEndDate(e.target.value)}/>
          </div>
        </div>
        <div className='flex items-center justify-center flex-shrink-0 w-1/3 gap-2'>
          <button
            className='p-3 m-2 font-bold text-white bg-green-600 rounded-md shadow-md hover:bg-green-500'
            onClick={saveState}
          >
            Save State
          </button>
          <button
            className='p-3 m-2 font-bold text-white bg-red-600 rounded-md shadow-md hover:bg-red-500'
            onClick={restoreState}
          >
            Restore State
          </button>
          <button
            className='p-3 m-2 font-bold text-white bg-orange-600 rounded-md shadow-md hover:bg-orange-500'
            onClick={resetState}
          >
            Reset State
          </button>
        </div>
        <div className='flex justify-end flex-shrink-0 w-1/3'>
          <button
            className='p-3 m-2 font-bold text-white bg-blue-700 rounded-md shadow-md hover:bg-blue-500'
            onClick={() => handleClickOpen()}
          >
            Add User
          </button>
        </div>
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
          ref={gridRef}
          rowData={tableData}
          gridOptions={gridOptions}
          // columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          sideBar={{
            toolPanels : [
              {
                id: 'columns',
                labelDefault: "Columns",
                iconKey: "columns",
                toolPanel: 'agColumnsToolPanel'
              },
              {
                id: 'save',
                labelDefault: "Save",
                iconKey: "menu",
                toolPanel: () => <div className="p-2 mt-4">
                  <button
                    className='w-[93%] p-3 m-2 font-bold text-white bg-green-600 rounded-md shadow-md hover:bg-green-500'
                    onClick={saveState}
                  >
                    Save State
                  </button>
                  <button
                    className='w-[93%] p-3 m-2 font-bold text-white bg-red-600 rounded-md shadow-md hover:bg-red-500'
                    onClick={restoreState}
                  >
                    Restore State
                  </button>
                  <button
                    className='w-[93%] p-3 m-2 font-bold text-white bg-orange-600 rounded-md shadow-md hover:bg-orange-500'
                    onClick={resetState}
                  >
                    Reset State
                  </button>
                </div>
              },
            ]
          }}
          masterDetail={true}
          detailCellRenderer={(props) => <DetailsComponent {...props} />}
          detailRowHeight={320}
          onFirstDataRendered={onFirstDataRendered}
        />

      </div>

    </div>
  )
}

export default Table
