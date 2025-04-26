import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

function AppLayout() {
  return (
    <div className="app-layout" style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div className="main-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div className="page-content" style={{ flex: 1, padding: '1rem' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
