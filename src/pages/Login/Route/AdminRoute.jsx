import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function AdminRoute() {
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const isAdmin = user && user.role === 'admin'; 

  return isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminRoute;
