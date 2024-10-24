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

  let gridApi;
  const onGridReady=params=> {
    gridApi=params.api

    // data 불러오기
    console.log("data import")
    fetch("https://jsonplaceholder.typicode.com/comments")
    .then(res=> res.json())
    .then(result=> {
      console.log(result)
      params.api.applyTransaction({add:result})})
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

  return (
    <div>
      <button onClick={()=>{onExportClick()}}>Export</button>
      <div
        className={"ag-theme-quartz"}
        style={{ width: '100%', height: '100%' }}
      >
        <AgGridReact
            domLayout='autoHeight'
            // rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultMockColDef}
            rowSelection={rowSelectionType()}
            onRowSelected={onRowSelected}
            onSelectionChanged={onSelectionChanged}
            onGridReady={onGridReady}
            enableBrowserTooltips={true}
            tooltipShowDelay={{tooltipShowDelay:2}}
        />
      </div>
    </div>
  )
}

export default Table
