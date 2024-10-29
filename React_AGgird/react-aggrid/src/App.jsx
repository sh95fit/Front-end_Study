import React, { useState } from 'react'
import './App.css'

// import Table from './components/Table';
// import InfiniteScroll from './components/InfiniteScroll'
// import ServerSideTable from './components/ServerSideTable'
// import FileDropzone from './components/FileDropzone'
import CrudTable from './components/CrudTable'
// import CrudDialog from './components/CrudDialog'


function App() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    // <FileDropzone />
    <div>
      <CrudTable/>

      {/* <div className='w-full h-screen'>
        <div className='absolute flex flex-col items-center justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <button onClick={() => setModalOpen(true)}>Open Modal</button>
          {modalOpen && (
            <CrudDialog
              title={
                <div className="py-4 text-xl font-semibold">Custom Header</div>
              }
              onClose={() => setModalOpen(false)}
              footer={
                <div className="flex justify-end gap-2 py-2">
                  <button variant="success" onClick={() => setModalOpen(false)}>
                    OK
                  </button>
                  <button variant="danger" onClick={() => setModalOpen(false)}>
                    Cancel
                  </button>
                </div>
              }
            >
              Modal Content
            </CrudDialog>)
          }
        </div>
      </div> */}

      {/* <Table /> */}
      {/* <InfiniteScroll /> */}
      {/* <ServerSideTable /> */}
    </div>
  )
}

export default App
