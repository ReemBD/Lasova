import React from 'react';
import { useSelector } from 'react-redux';
// import { Redirect, Route } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((store) => store.auth);

  console.log(
    '🚀 ~ file: ProtectedRoute.js ~ line 7 ~ ProtectedRoute ~ isAuthenticated',
    isAuthenticated
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
