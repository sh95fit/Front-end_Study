import React, { useState } from 'react'

// React Data Grid Component
import { AgGridReact } from 'ag-grid-react';
// Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-grid.css";
// Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import "ag-grid-enterprise";

import { colServerDefs, defaultServerColDef } from '../mock/ServerSideTableConfig';

const Table = () => {

  const [colDefs, setColDefs] = useState(colServerDefs);

  const [gridApi, setGridApi] = useState(null);

  const [hideColumn, setHideColumn] = useState(true)

  const onGridReady=params=> {
    // gridApi=params.api
    setGridApi(params.api)

    // data 불러오기
    // console.log("Json-Server Data Import")
    // fetch("http://localhost:8888/olympic")
    // .then(res=> res.json())
    // .then(result=> {
    //   console.log(result)
    //   params.api.applyTransaction({add:result})

    //   // 특정 페이지로 페이지네이션 이동 시키기
    //   // params.api.paginationGoToPage(10)
    // })

    const datasource = {
      getRows(params) {
        console.log(JSON.stringify(params.request, null, 1));
        const {startRow, endRow, filterModel, sortModel} = params.request
        let url = `http://localhost:8888/olympic?`

        // Sorting

        /*
          sortModel 형태

          "sortModel": {
            "colId": "컬럼",
            "sort": "desc|asc"
          }
        */


        // json-server doc 상 _order이 없으므로 실적용 시 참조
        // _sort = -colId1, colId2   (복수 구분자 콤마, 오름차순/내림차순 구분 부호(- : desc, + : asc))
        // 아래 코드는 버전 업데이트 전 코드로 예상 (params 확인 후 적용)
        if(sortModel.length) {
          const {colId, sort} = sortModel[0]
          url+=`_sort=${colId}&_order=${sort}&`
        }


        // Filtering

        /*
          filterModel 형태

          "filterModel": {
            "column명": {
              "filterType" : "text",
              "type" : "contains",
              "filter" : "입력한 filter 조건값"
            }
          }
        */
        const filterKeys=Object.keys(filterModel)

        filterKeys.forEach(filter=>{
          url+=`${filter}=${filterModel[filter].filter}&`
        })


        // Pagination
        url+=`_start=${startRow}&_end=${endRow}`

        fetch(url)
        .then(httpResponse => httpResponse.json())
        .then(response => {
          params.successCallback(response, 499);
        })
        .catch(error => {
          console.error(error)
          params.failCallback()
        })
      }
    }


  }

  const onExportClick = () => {
    const params = {
      onlySelected: true,
      columnKeys: gridApi.getColumns()
    };

    gridApi.exportDataAsCsv(params);
  }

  const onAllExportClick = () => {
    gridApi.exportDataAsCsv();
  }

  const rowSelectionType = () => {
    return { mode: 'multiRow', checkboxes: true, isRowSelectable:(node)=>{return node.data ? (node.data.id%2===0) : false } }
  }

  const onSelectionChanged = (event) => {
    console.log(event.api.getSelectedRows())
  }

  const onRowSelected = (node) => {
    console.log(node)
  }

  const onPaginationChange = (pageSize) => {
    gridApi.updateGridOptions({
      paginationPageSize:pageSize
    }); // paginationSetPageSize 등 메서드가 삭제 되고 setGridOptions 혹은 updateGridOptions를 통해 속성 설정을 해야한다!
  };

  const showColumn = () => {
    gridApi.setColumnsVisible(["age", "country", "year", "date"], hideColumn)
    setHideColumn(!hideColumn)
    gridApi.sizeColumnsToFit()
    console.log(gridApi)
  }

  const onFilterTextChange = (e) => {
    gridApi.setGridOption(
      "quickFilterText",
      e.target.value,
    )
  }

  return (
    <div className='flex flex-col justify-center'>
      <div className='p-4 text-4xl text-center'>
        <h1>React-AgGrid</h1>
      </div>
      <div className='flex flex-row items-center justify-between bg-neutral-100'>
        <div>
          <button className={'bg-yellow-500 rounded-md p-2 m-2 text-white font-bold shadow-lg shadow-yellow-500/50'} onClick={()=>{onAllExportClick()}}>Export all</button>
          <button className={'bg-blue-500 rounded-md p-2 m-2 text-white font-bold shadow-lg shadow-blue-500/50'} onClick={()=>{onExportClick()}}>Export</button>
          <select className='p-2 ml-5 font-bold border-2 border-neutral-500 text-neutral-500' onChange={(e) => onPaginationChange(e.target.value)}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <button className="p-2 m-2 ml-8 font-bold text-white bg-red-500 rounded-md shadow-lg shadow-red-500/50" onClick={showColumn}>Show Body</button>
        </div>
        <div className='flex-grow p-2 ml-10'>
          <input className='w-full p-2 border-2 border-green-500 rounded-2xl focus:outline-none focus:border-none focus:ring focus:ring-green-200' type="search" placeholder='Search somethings...' onChange={onFilterTextChange}/>
        </div>
      </div>
      <div
        className={"ag-theme-quartz"}
        style={{ width: '100%', height: 900 }}
      >
        <AgGridReact
            // domLayout='autoHeight'
            // rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultServerColDef}
            rowSelection={rowSelectionType()}
            onRowSelected={onRowSelected}
            onSelectionChanged={onSelectionChanged}
            onGridReady={onGridReady}
            enableBrowserTooltips={true}
            tooltipShowDelay={{tooltipShowDelay:2}}
            pagination={true}
            paginationPageSizeSelector={[18, 10, 20, 50, 100]}
            paginationPageSize={18}   // 페이지네이션 Row 수 직접 지정
            // paginationAutoPageSize={true}   // 지정된 height에 맞춰 페이지네이션 Row 자동 지정
        />
      </div>
    </div>
  )
}

export default Table
