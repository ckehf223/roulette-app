/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { login as loginService, logout as logoutService, adminLogout as adminLogoutService } from '/src/auth/authService';
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginId, setLoginId] = useState('');
  const [role, setRole] = useState('');

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

  // 소셜 로그인
  const socialLogin = async (token, loginId) => {
    try {
      if (isTokenValid(token)) {
        localStorage.setItem('accessToken', token);
        const decodeToken = jwtDecode(token);
        setRole(decodeToken.role);
        setLoginId(loginId);
        setIsAuthenticated(true);
      } else {
        console.error('Invalid token');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Social login error:', error);
      setIsAuthenticated(false);
    }
  };

  // 공통 로그아웃
  const handleLogout = async (serviceFn) => {
    try {
      await serviceFn();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('accessToken');
      setIsAuthenticated(false);
      setLoginId('');
      setRole('');
    }
  };

  const logout = () => handleLogout(logoutService);
  const adminLogout = () => handleLogout(adminLogoutService);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      login,
      logout,
      adminLogout,
      socialLogin,
      loginId,
      role
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
