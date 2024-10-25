export const colServerDefs = [
  { headerName: "Athlete", field:"athlete" },
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

export const defaultServerColDef={sortable:true, editable:true, filter:true, floatingFilter: true, filter:"agTextColumnFilter", flex:1, tooltipValueGetter:(params)=>(`${params.data.athlete} | ${params.data.age} | ${params.data.country} | ${params.data.sport} | ${params.data.total}`), headerTooltip:"header info"}