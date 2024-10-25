export const colFetchDefs = [
  { headerName: "Athlete", field:"athlete", cellRenderer:'loading' },
  { headerName: "Age", field:"age", hide:true },
  { headerName: "Country", field:"country", hide:true },
  { headerName: "Year", field:"year", hide:true },
  { headerName: "Date", field:"date", hide:true },
  { headerName: "Sport", field:"sport" },
  { headerName: "Gold", field:"gold" },
  { headerName: "Silver", field:"silver" },
  { headerName: "Bronze", field:"bronze" },
  { headerName: "Total", field:"total" },
]

// 개별 설정 시 colDefs에 각 필드에 지정해주면 된다.
export const defaultMockColDef={sortable:true, editable:true, filter:true, floatingFilter: true, flex:1, filter:"agTextColumnFilter", headerTooltip:"header info"}
