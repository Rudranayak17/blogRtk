import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hook';


const ProtectedRoute: React.FC = ({ children }) => {
  const { isAuthenticated, user, loading } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return loading === false ? (children ? children : <Outlet />) : null;
};

export default ProtectedRoute;
