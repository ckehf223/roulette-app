/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as loginService, logout as logoutService, adminLogout as adminLogoutService } from '/src/auth/authService';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginId, setLoginId] = useState('');
  const [role, setRole] = useState('');
  const nav = useNavigate();

  // 토큰 유효성 검사
  const isTokenValid = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  };

  // 초기 로드
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && isTokenValid(token)) {
      const decodeToken = jwtDecode(token);
      setLoginId(decodeToken.userId);
      setRole(decodeToken.role);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, []);

  // 로그인
  const login = async (username, password) => {
    try {
      const response = await loginService(username, password);
      if (response.status === 200) {
        const token = localStorage.getItem('accessToken');
        if (isTokenValid(token)) {
          const decodeToken = jwtDecode(token);
          setLoginId(decodeToken.userId);
          setRole(decodeToken.role);
          setIsAuthenticated(true);
        }
      }
      return response;
    } catch (error) {
      console.error('Login error:', error);
      setIsAuthenticated(false);
    }
  };

  // 공통 로그아웃
  const handleLogout = async () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setLoginId('');
    setRole('');
    nav("/", { replace: true })
  };

  const logout = () => handleLogout();
  const adminLogout = () => handleLogout(adminLogoutService);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      login,
      logout,
      adminLogout,
      loginId,
      role
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
