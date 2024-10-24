import React, { useState } from 'react'

// React Data Grid Component
import { AgGridReact } from 'ag-grid-react';
// Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-grid.css";
// Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import { rowMockData, colMockDefs, defaultMockColDef, colFetchDefs } from '../mock/data';

const Table = () => {

  const [rowData, setRowData] = useState(rowMockData);
  // const [colDefs, setColDefs] = useState(colMockDefs);
  const [colDefs, setColDefs] = useState(colFetchDefs);

  const [gridApi, setGridApi] = useState();

  const onGridReady=params=> {
    // gridApi=params.api
    setGridApi(params)

    // data 불러오기
    console.log("data import")
    fetch("https://jsonplaceholder.typicode.com/comments")
    .then(res=> res.json())
    .then(result=> {
      console.log(result)
      params.api.applyTransaction({add:result})

      // 특정 페이지로 페이지네이션 이동 시키기
      // params.api.paginationGoToPage(10)
    })
  }

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }

  const rowSelectionType = () => {
    return { mode: 'multiRow', checkboxes: true, isRowSelectable:(node)=>{return node.data ? (node.data.id%2===0 || node.data.email.includes(".org")) : false } }
  }

  const onSelectionChanged = (event) => {
    console.log(event.api.getSelectedRows())
  }

  const onRowSelected = (node) => {
    console.log(node)
  }

  const onPaginationChange = (pageSize) => {
    gridApi.api.updateGridOptions({
      paginationPageSize:pageSize
    }); // paginationSetPageSize 등 메서드가 삭제 되고 setGridOptions 혹은 updateGridOptions를 통해 속성 설정을 해야한다!
  };

  return (
    <div>
      <button onClick={()=>{onExportClick()}}>Export</button>
      <select className='ml-10' onChange={(e) => onPaginationChange(e.target.value)}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <div
        className={"ag-theme-quartz"}
        style={{ width: '100%', height: 900 }}
      >
        <AgGridReact
            // domLayout='autoHeight'
            // rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultMockColDef}
            rowSelection={rowSelectionType()}
            onRowSelected={onRowSelected}
            onSelectionChanged={onSelectionChanged}
            onGridReady={onGridReady}
            enableBrowserTooltips={true}
            tooltipShowDelay={{tooltipShowDelay:2}}
            pagination={true}
            paginationPageSize={18}   // 페이지네이션 Row 수 직접 지정
            // paginationAutoPageSize={true}   // 지정된 height에 맞춰 페이지네이션 Row 자동 지정
        />
      </div>
    </div>
  )
}

export default Table
