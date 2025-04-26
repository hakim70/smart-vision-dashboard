import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AgentRoute() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = user && user.role === 'agent'; 

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AgentRoute;
