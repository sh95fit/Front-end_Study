import React, { useState } from 'react'

// React Data Grid Component
import { AgGridReact } from 'ag-grid-react';
// Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-grid.css";
// Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import { rowMockData, colMockDefs, defaultMockColDef } from '../mock/data';

const Table = () => {

  const [rowData, setRowData] = useState(rowMockData);
  const [colDefs, setColDefs] = useState(colMockDefs);

  let gridApi;
  const onGridReady=params=> {
    gridApi=params.api
  }

  const onExportClick = () => {
    gridApi.exportDataAsCsv();
  }

  return (
    <div>
      <button onClick={()=>{onExportClick()}}>Export</button>
      <div
        className={"ag-theme-quartz-dark"}
        style={{ width: '100%', height: '100%' }}
      >
        <AgGridReact
            domLayout='autoHeight'
            rowData={rowData}
            columnDefs={colDefs}
            defaultColDef={defaultMockColDef}
            rowSelection={{ mode: 'multiRow', checkboxes: true }}
            onGridReady={onGridReady}
        />
      </div>
    </div>
  )
}

export default Table
