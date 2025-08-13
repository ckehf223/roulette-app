import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '/src/common/AuthContext';

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, role } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setIsInitialized(true);
    }
  }, [isAuthenticated]);
  if (!isInitialized) {
    return null;
  }
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  if (!role) {
    return <Navigate to="/admin/login" replace />;
  }
  if (role === 'ROLE_MEMBER') {
    return <Navigate to="/" replace />;
  }
  if (role === 'ROLE_ADMIN') {
    return element || <Outlet />;
  }
};


export default PrivateRoute;