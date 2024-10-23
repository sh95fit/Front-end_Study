// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import * as XLSX from 'xlsx';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// const FileDropzone = () => {
//   const [rowData, setRowData] = useState([]);
//   const [columnDefs, setColumnDefs] = useState([]);

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });

//       // 첫 번째 시트 가져오기
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       // 시트 데이터를 JSON 형식으로 변환
//       const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

//       // 첫 번째 행을 열 정의로 사용
//       const cols = jsonData[0].map((col, index) => ({
//         headerName: col,
//         field: `col${index}`,
//         editable: true, // 셀을 편집 가능하게 설정
//         minWidth: 150, // 최소 너비 설정
//       }));

//       setColumnDefs(cols); // 열 정의 설정

//       // 데이터를 객체 배열로 변환하여 설정
//       const dataRows = jsonData.slice(1).map((row) => {
//         const rowObj = {};
//         row.forEach((cell, cellIndex) => {
//           rowObj[`col${cellIndex}`] = cell !== undefined ? cell : ''; // 빈 셀은 ''로 처리
//         });
//         return rowObj; // 각 행을 객체로 반환
//       });

//       setRowData(dataRows); // 데이터 설정
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   // 수정된 데이터를 엑셀 파일로 저장하는 함수
//   const saveExcelFile = () => {
//     const header = columnDefs.map(col => col.headerName); // 열 헤더 이름을 가져옴
//     const updatedData = [header, ...rowData.map(row => {
//       return columnDefs.map(col => row[col.field]); // 열 정의를 기반으로 각 셀의 값을 가져옴
//     })];

//     const worksheet = XLSX.utils.aoa_to_sheet(updatedData); // 배열을 시트로 변환
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//     XLSX.writeFile(workbook, 'modified_data.xlsx');
//   };

//   // 열 삭제 핸들러
//   const handleDeleteColumn = (field) => {
//     setColumnDefs(prev => prev.filter(col => col.field !== field));
//     setRowData(prev => prev.map(row => {
//       const newRow = { ...row };
//       delete newRow[field];
//       return newRow;
//     }));
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed gray', padding: '20px' }}>
//         <input {...getInputProps()} />
//         <p>엑셀 파일을 여기에 드래그하거나 클릭하여 업로드하세요.</p>
//       </div>

//       {/* ag-Grid 테이블 */}
//       {rowData.length > 0 && (
//         <div className="ag-theme-alpine" style={{ height: '400px', width: '100%', marginTop: '20px' }}>
//           <AgGridReact
//             columnDefs={columnDefs}
//             rowData={rowData}
//             editType="fullRow" // 전체 행 편집 모드
//             onGridReady={(params) => {
//               params.api.sizeColumnsToFit(); // 그리드가 준비되면 열 너비 자동 조정
//             }}
//             onColumnResized={(params) => {
//               // 열 크기 조정 시 동작
//               params.api.refreshCells(); // 셀 새로 고침
//             }}
//             onGridColumnsChanged={(params) => {
//               // 열 변경 시 동작
//               const currentColDefs = params.columnApi.getAllColumns();
//               const newColumnDefs = currentColDefs.map(col => ({
//                 headerName: col.getColDef().headerName,
//                 field: col.getColId(),
//                 editable: true,
//               }));
//               setColumnDefs(newColumnDefs);
//             }}
//           />
//         </div>
//       )}

//       {/* 수정된 데이터를 저장하는 버튼 */}
//       {rowData.length > 0 && (
//         <button onClick={saveExcelFile} style={{ marginTop: '20px', padding: '5px 10px' }}>
//           수정된 내용 저장
//         </button>
//       )}

//       {/* 열 삭제 버튼 예시 */}
//       {columnDefs.length > 0 && (
//         <div style={{ marginTop: '20px' }}>
//           <h4>열 삭제 예시</h4>
//           {columnDefs.map(col => (
//             <button key={col.field} onClick={() => handleDeleteColumn(col.field)}>
//               {col.headerName} 삭제
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileDropzone;

import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const FileDropzone = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);
  const gridApiRef = useRef(null);
  const columnApiRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const cols = jsonData[0].map((col, index) => ({
        headerName: col,
        field: `col${index}`,
        editable: true,
        minWidth: 150,
      }));

      setColumnDefs(cols);
      const dataRows = jsonData.slice(1).map((row) => {
        const rowObj = {};
        row.forEach((cell, cellIndex) => {
          rowObj[`col${cellIndex}`] = cell !== undefined ? cell : '';
        });
        return rowObj;
      });

      setRowData(dataRows);
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const saveExcelFile = () => {
    if (!gridApiRef.current) {
      console.warn("그리드가 아직 준비되지 않았습니다.");
      return;
    }

    const header = columnDefs.map(col => col.headerName);
    const updatedData = [header, ...rowData.map(row => {
      return columnDefs.map(col => row[col.field]);
    })];

    const worksheet = XLSX.utils.aoa_to_sheet(updatedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'modified_data.xlsx');
  };

  const handleDeleteColumn = (field) => {
    setColumnDefs(prev => prev.filter(col => col.field !== field));
    setRowData(prev => prev.map(row => {
      const newRow = { ...row };
      delete newRow[field];
      return newRow;
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed gray', padding: '20px' }}>
        <input {...getInputProps()} />
        <p>엑셀 파일을 여기에 드래그하거나 클릭하여 업로드하세요.</p>
      </div>

      {rowData.length > 0 && (
        <div className="ag-theme-alpine" style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            onGridReady={(params) => {
              gridApiRef.current = params.api;
              columnApiRef.current = params.columnApi;
              params.api.sizeColumnsToFit();
            }}
            onColumnResized={() => {
              if (gridApiRef.current) {
                gridApiRef.current.refreshCells();
              }
            }}
            onColumnMoved={(params) => {
              if (columnApiRef.current) {
                const currentColDefs = columnApiRef.current.getAllColumns();
                const newColumnDefs = currentColDefs.map(col => ({
                  headerName: col.getColDef().headerName,
                  field: col.getColId(),
                  editable: true,
                }));

                setColumnDefs(newColumnDefs); // 열 순서가 변경될 때 상태 업데이트
              }
            }}
          />
        </div>
      )}

      {rowData.length > 0 && (
        <button onClick={saveExcelFile} style={{ marginTop: '20px', padding: '5px 10px' }}>
          수정된 내용 저장
        </button>
      )}

      {columnDefs.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h4>열 삭제 예시</h4>
          {columnDefs.map(col => (
            <button key={col.field} onClick={() => handleDeleteColumn(col.field)}>
              |  {col.headerName} |
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
