import { AgGridReact } from 'ag-grid-react';
import { DATA } from "../mock/detailData"

import "ag-grid-community/styles/ag-theme-alpine.css";

const DetailsComponent = (props) => {
  // console.log(props.data)

  const { data } = props;

  const gridOptions = {
    rowHeight: 50,
    columnDefs: [
      { headerName: "ID", field: "id"},
      { headerName: "Name", field: "name"},
      { headerName: "Email", field: "email"},
      { headerName: "Phone", field: "phone"},
      { headerName: "Date of Birth", field: "dob"},
      { headerName: "Actions", field: "id"}
    ]
  }

  const defaultColDef = {
    sortable: true,
    flex: 1,
    // filter: true,
    // floatingFilter: true
  }

  return (
    <div>
      <h1 className="mt-3 mb-2 ml-10 text-xl font-bold">{data.name} ({data.phone})</h1>
      <div
        className={"ag-theme-alpine-dark ml-10"}
        style={{ width: '95%', height: 250
      }}>
        <AgGridReact
              rowData={DATA}
              gridOptions={gridOptions}
              defaultColDef={defaultColDef}
        />
      </div>
    </div>
  )
}

export default DetailsComponent;