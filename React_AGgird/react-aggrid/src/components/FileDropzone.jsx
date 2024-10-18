// import React, { useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import * as XLSX from 'xlsx';

// const FileDropzone = () => {
//   const [sheetsData, setSheetsData] = useState({}); // 시트별 데이터를 저장
//   const [activeSheet, setActiveSheet] = useState(''); // 현재 선택된 시트

//   const onDrop = (acceptedFiles) => {
//     const file = acceptedFiles[0];

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });

//       const sheets = {};
//       workbook.SheetNames.forEach((sheetName) => {
//         const worksheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
//         sheets[sheetName] = jsonData;
//       });

//       setSheetsData(sheets); // 시트별 데이터를 상태에 저장
//       setActiveSheet(workbook.SheetNames[0]); // 첫 번째 시트를 기본 활성 시트로 설정
//     };
//     reader.readAsArrayBuffer(file);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop });

//   // 셀 값 변경 핸들러
//   const handleCellChange = (e, rowIndex, cellIndex) => {
//     const newValue = e.target.value;

//     const updatedSheetData = [...sheetsData[activeSheet]];
//     updatedSheetData[rowIndex][cellIndex] = newValue;

//     setSheetsData({
//       ...sheetsData,
//       [activeSheet]: updatedSheetData, // 현재 시트의 데이터만 업데이트
//     });
//   };

//   // 수정된 데이터를 엑셀 파일로 저장하는 함수
//   const saveExcelFile = () => {
//     const workbook = XLSX.utils.book_new(); // 새로운 워크북 생성

//     Object.keys(sheetsData).forEach((sheetName) => {
//       const worksheet = XLSX.utils.aoa_to_sheet(sheetsData[sheetName]);
//       XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
//     });

//     // 엑셀 파일로 저장
//     XLSX.writeFile(workbook, 'modified_data.xlsx');
//   };

//   return (
//     <div>
//       <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed gray', padding: '20px' }}>
//         <input {...getInputProps()} />
//         <p>엑셀 파일을 여기에 드래그하거나 클릭하여 업로드하세요.</p>
//       </div>

//       {/* 시트 선택 버튼 */}
//       {Object.keys(sheetsData).length > 0 && (
//         <div style={{ marginTop: '20px' }}>
//           <div>
//             {Object.keys(sheetsData).map((sheetName) => (
//               <button
//                 key={sheetName}
//                 onClick={() => setActiveSheet(sheetName)}
//                 style={{
//                   marginRight: '5px',
//                   padding: '5px 10px',
//                   backgroundColor: activeSheet === sheetName ? 'lightgray' : 'white',
//                   border: '1px solid gray',
//                 }}
//               >
//                 {sheetName}
//               </button>
//             ))}
//           </div>

//           {/* 선택된 시트의 데이터 표시 */}
//           {sheetsData[activeSheet] && (
//             <div>
//               <table border="1" style={{ marginTop: '20px' }}>
//                 <thead>
//                   <tr>
//                     {sheetsData[activeSheet][0].map((col, index) => (
//                       <th key={index}>{col}</th>
//                     ))}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {sheetsData[activeSheet].slice(1).map((row, rowIndex) => (
//                     <tr key={rowIndex}>
//                       {row.map((cell, cellIndex) => (
//                         <td key={cellIndex}>
//                           <input
//                             type="text"
//                             value={cell}
//                             onChange={(e) => handleCellChange(e, rowIndex + 1, cellIndex)}
//                           />
//                         </td>
//                       ))}
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               {/* 수정된 데이터를 저장하는 버튼 */}
//               <button onClick={saveExcelFile} style={{ marginTop: '20px', padding: '5px 10px' }}>
//                 수정된 내용 저장
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileDropzone;


import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const FileDropzone = () => {
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // 첫 번째 시트 가져오기
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // 시트 데이터를 JSON 형식으로 변환
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // 첫 번째 행을 열 정의로 사용
      const cols = jsonData[0].map((col, index) => ({
        headerName: col,
        field: `col${index}`,
        editable: true, // 셀을 편집 가능하게 설정
        minWidth: 150, // 최소 너비 설정
      }));

      setColumnDefs(cols); // 열 정의 설정

      // 데이터를 객체 배열로 변환하여 설정
      const dataRows = jsonData.slice(1).map((row) => {
        const rowObj = {};
        row.forEach((cell, cellIndex) => {
          rowObj[`col${cellIndex}`] = cell !== undefined ? cell : ''; // 빈 셀은 ''로 처리
        });
        return rowObj; // 각 행을 객체로 반환
      });

      setRowData(dataRows); // 데이터 설정
    };
    reader.readAsArrayBuffer(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // 수정된 데이터를 엑셀 파일로 저장하는 함수
  const saveExcelFile = () => {
    const header = columnDefs.map(col => col.headerName); // 열 헤더 이름을 가져옴
    const updatedData = [header, ...rowData.map(row => {
      return columnDefs.map(col => row[col.field]); // 열 정의를 기반으로 각 셀의 값을 가져옴
    })];

    const worksheet = XLSX.utils.aoa_to_sheet(updatedData); // 배열을 시트로 변환
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    XLSX.writeFile(workbook, 'modified_data.xlsx');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div {...getRootProps({ className: 'dropzone' })} style={{ border: '2px dashed gray', padding: '20px' }}>
        <input {...getInputProps()} />
        <p>엑셀 파일을 여기에 드래그하거나 클릭하여 업로드하세요.</p>
      </div>

      {/* ag-Grid 테이블 */}
      {rowData.length > 0 && (
        <div className="ag-theme-alpine" style={{ height: '400px', width: '100%', marginTop: '20px' }}>
          <AgGridReact
            columnDefs={columnDefs}
            rowData={rowData}
            editType="fullRow" // 전체 행 편집 모드
            onGridReady={(params) => {
              params.api.sizeColumnsToFit(); // 그리드가 준비되면 열 너비 자동 조정
            }}
          />
        </div>
      )}

      {/* 수정된 데이터를 저장하는 버튼 */}
      {rowData.length > 0 && (
        <button onClick={saveExcelFile} style={{ marginTop: '20px', padding: '5px 10px' }}>
          수정된 내용 저장
        </button>
      )}
    </div>
  );
};

export default FileDropzone;
