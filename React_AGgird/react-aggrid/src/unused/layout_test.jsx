import React, { useState } from 'react'
import './App.css'

function App() {
  // 사이드바 상태를 관리하는 상태 변수
  const [isSidebarSmall, setIsSidebarSmall] = useState(true);

  // 사이드바 크기 토글 함수
  const toggleSidebarSize = () => {
    setIsSidebarSmall(prevState => !prevState);
  };

  return (
    <div className={`grid h-screen ${isSidebarSmall ? 'grid-cols-[100px_1fr]' : 'grid-cols-[250px_1fr]'}`}>
      <div className="p-4 text-white bg-gray-800">
        {/* 사이드바 토글 버튼 */}
        <button
          className="p-2 mb-4 text-white bg-blue-500 rounded"
          onClick={toggleSidebarSize}
        >
          {isSidebarSmall ? 'Expand Sidebar' : 'Collapse Sidebar'}
        </button>
        <h2>Sidebar</h2>
        <ul>
          <li>Menu 1</li>
          <li>Menu 2</li>
          <li>Menu 3</li>
        </ul>
      </div>

      <div className="flex flex-col">
        {/* Header */}
        <div className="p-4 text-white bg-blue-600">
          <h1>Header</h1>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-auto">
          <h2>Content</h2>
          <p>This is the main content area.</p>
        </div>
      </div>
    </div>
  )
}

export default App
