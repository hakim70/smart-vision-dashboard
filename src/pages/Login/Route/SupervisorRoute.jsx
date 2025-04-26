import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function SupervisorRoute() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = user && user.role === 'supervisor'; 

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default SupervisorRoute;
