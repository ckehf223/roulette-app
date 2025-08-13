import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as loginService, logout as logoutService, adminLogout as adminLogoutService } from '/src/auth/authService';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loginId, setLoginId] = useState();
  const [role, setRole] = useState();

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
    if (token != null) {
      const decodeToken = jwtDecode(token);
      setLoginId(decodeToken.userId)
      setRole(decodeToken.role);
    }
  }, []);

  const login = async (username, password) => {
    try {
      const response = await loginService(username, password);
      if (response.status === 200) {
        const token = localStorage.getItem('accessToken');
        const decodeToken = jwtDecode(token);
        setLoginId(decodeToken.userId)
        setRole(decodeToken.role);
        setIsAuthenticated(true);
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
    }
  };

  const socialLogin = async (token, loginId) => {
    try {
      localStorage.setItem('accessToken', token);
      const decodeToken = jwtDecode(token);
      setRole(decodeToken.role);
      setLoginId(loginId);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Social login error:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = async () => {
    try {
      await logoutService();
      setIsAuthenticated(false);
      setLoginId('');
      setRole('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const adminLogout = async () => {
    try {
      await adminLogoutService();
      setIsAuthenticated(false);
      setLoginId('');
      setRole('');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, adminLogout, socialLogin, loginId, role }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};