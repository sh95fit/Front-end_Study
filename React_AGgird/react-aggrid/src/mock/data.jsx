export const rowMockData = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
]

export const colMockDefs = [
  { headerName: "Make", field: "make" },
  { headerName: "Model", field: "model" },
  { headerName: "Price", field: "price", valueFormatter: p => '$ ' + p.value.toLocaleString() },
  { headerName: "Electric", field: "electric" }
]

// 개별 설정 시 colDefs에 각 필드에 지정해주면 된다.
export const defaultMockColDef={sortable:true, editable:true, filter:true, floatingFilter: true, flex:1}
