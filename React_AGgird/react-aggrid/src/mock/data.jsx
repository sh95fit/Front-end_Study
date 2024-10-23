export const rowMockData = [
  { make: "Tesla", model: "Model Y", price: 64950, electric: true },
  { make: "Ford", model: "F-Series", price: 33850, electric: false },
  { make: "Toyota", model: "Corolla", price: 29600, electric: false },
]

export const colMockDefs = [
  { headerName: "Make", field: "make" },
  { headerName: "Model", field: "model" },
  { headerName: "Price", field: "price", valueFormatter: p => '$ ' + p.value.toLocaleString(),
    // cellStyle:(params)=>(
    //   params.value >= 30000 ? {color: 'green', borderLeft:'4px green solid'} : {color: "red", borderLeft:'4px red solid'}
    // ),
    cellClass:(params)=>(
      params.value >= 30000 ? "moreThan30000" : "lessThan30000"
    )
  },
  { headerName: "Electric", field: "electric" },
  { headerName: "Action", field: "price",
    cellRenderer:(params)=> {
      return <button className="flex items-center justify-center h-full p-1 border-4 rounded-lg border-indigo-500/100" onClick={() => window.alert(`${params.data.make} ${params.data.model} ${params.data.price}`)}>Action</button>;
    }
  }
]

// 개별 설정 시 colDefs에 각 필드에 지정해주면 된다.
export const defaultMockColDef={sortable:true, editable:true, filter:true, floatingFilter: true, flex:1, tooltipValueGetter:(params)=>(`${params.data.model} ${params.data.price}`), headerTooltip:"header info"}
