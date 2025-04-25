
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout/AppLayout';
import Dashboard from './components/Dashboard/Dashboard';

import Supervisor from './pages/Supervisor/Supervisor';
import SupervisorUpdate from './pages/Supervisor/SupervisorUpdate/SupervisorUpdate';
import SupervisorList from './pages/Supervisor/SupervisorList/SupervisorList';

import Sector from './pages/Sector/Sector';
import SectorList from './pages/Sector/SectorList/SectorList';
import SectorUpdate from './pages/Sector/SectorUpdate/SectorUpdate';

import Agent from './pages/Agent/Agent';
import AgentList from './pages/Agent/AgentList/AgentList';
import AgentUpdate from './pages/Agent/AgentUpdate/AgentUpdate';


import Camera from './pages/Camera/camera';
import CameraList from './pages/Camera/CameraList/CameraList';
import CameraUpdate from './pages/Camera/CameraUpdate/CameraUpdate'

import Login from './pages/login/Login';





// haseb role fuction guard 

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/supervisors" element={<SupervisorList />} />
          <Route path="/supervisorupdate" element={<SupervisorUpdate />} />

          <Route path="/Sector" element={< Sector/>} />
          <Route path="/Sectors" element={< SectorList/>} />
          <Route path="/update-sector/:id" element={< SectorUpdate/>} />
          
          <Route path="/Agent" element={< Agent/>} />
          <Route path="/Agents" element={< AgentList/>} />
          <Route path="/update-agent/:id" element={< AgentUpdate/>} />

          <Route path="/Camera" element={< Camera/>} />
          <Route path="/Cameras" element={< CameraList/>} />
          <Route path="/update-camera/:id" element={< CameraUpdate/>} />

          <Route path="/login" element={< Login/>} />



        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
