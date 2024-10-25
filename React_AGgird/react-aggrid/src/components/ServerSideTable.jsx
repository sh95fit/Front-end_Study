import React, { useEffect, useState } from 'react'

// React Data Grid Component
import { AgGridReact } from 'ag-grid-react';
// Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-grid.css";
// Optional Theme applied to the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";

import "ag-grid-enterprise";

import { colServerDefs, defaultServerColDef } from '../mock/ServerSideTableConfig';

import _ from 'lodash'

const Table = () => {

  const [colDefs, setColDefs] = useState(colServerDefs);

  const [gridApi, setGridApi] = useState(null);

  const [hideColumn, setHideColumn] = useState(true)

  // Server-side Quick Filter 예시
  const [searchText,setSearchText] = useState("")

  useEffect(() => {
    console.log(searchText)
    if(gridApi) {
      onGridReady(gridApi)
    }

  }, [searchText])

  // lodash를 이용한 검색 적용 방법
  const search = _.debounce((text) => {
    console.log(text)
    setSearchText(text)
  }, 500)

  const datasource = {
    getRows(params) {
      console.log(JSON.stringify(params, null, 1));

      // const {startRow, endRow, filterModel, sortModel} = params.request

      // infinit scroll 적용
      const {startRow, endRow, filterModel, sortModel} = params

      let url = `http://localhost:8888/olympic?`

      // Quick filter   (현재 버전에서는 적용되지 않음!)
      if(searchText) {
        url+=`q=${searchText}&`
      }

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
      if (sortModel.length) {
        const sortFields = sortModel.map(({ colId, sort }) =>
          sort === 'desc' ? `-${colId}` : `${colId}`
        ).join(',');
        url += `_sort=${sortFields}&`;
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
        const filterValue = filterModel[filter].filter;
        if (filterValue) {
          url += `${filter}=${filterValue}&`;
        }
      })


      // Pagination
      url+=`_start=${startRow}&_end=${endRow}`

      fetch(url)
      .then(httpResponse => httpResponse.json())
      .then(response => {
        params.successCallback(response, 499);
        console.log(response)
      })
      .catch(error => {
        console.error(error)
        params.failCallback()
      })
    }
  }


  const onGridReady=params=> {
    // gridApi=params.api
    setGridApi(params.api)
    // gridApi.setGridOption('datasource', datasource)

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
    return { mode: 'multiRow', checkboxes: true}
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

  // 로딩 적용
  const LoadingComponent = (props) => {
    return (
      <div className="flex items-center justify-center w-full h-full loading-container">
        {props.value !== undefined ? (
          props.value
        ) : (
          <img src="https://www.ag-grid.com/example-assets/loading.gif" alt="Loading..." />
        )}
      </div>
    );
  };

  // gridOptions 정의
  const gridOptions = {
    components: {
      loading: LoadingComponent,
    }
  };


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
          {/* <input className='w-full p-2 border-2 border-green-500 rounded-2xl focus:outline-none focus:border-none focus:ring focus:ring-green-200' type="search" placeholder='Search somethings...' onChange={e=>setSearchText(e.target.value)}/> */}
          <input className='w-full p-2 border-2 border-green-500 rounded-2xl focus:outline-none focus:border-none focus:ring focus:ring-green-200' type="search" placeholder='Search somethings...' onChange={e=>search(e.target.value)}/>
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
            rowModelType='infinite'
            defaultColDef={defaultServerColDef}
            rowSelection={rowSelectionType()}
            onRowSelected={onRowSelected}
            onSelectionChanged={onSelectionChanged}
            onGridReady={onGridReady}
            enableBrowserTooltips={true}
            tooltipShowDelay={{tooltipShowDelay:2}}
            // pagination={true}
            // paginationPageSizeSelector={[18, 10, 20, 50, 100]}
            // paginationPageSize={18}   // 페이지네이션 Row 수 직접 지정
            // paginationAutoPageSize={true}   // 지정된 height에 맞춰 페이지네이션 Row 자동 지정
            datasource={datasource}
            gridOptions={gridOptions}
        />
      </div>
    </div>
  )
}

export default Table
