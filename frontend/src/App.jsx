import { useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import RouletteBoard from './components/RouletteBoard';
import Modal from 'react-modal';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './common/AuthContext';
import Resulthis from './components/Resulthis';
import RegisterMember from './components/RegisterMember';
import ProtectedRoute from './common/ProtectedRoute';
import Login from './components/Login';
import usePageTracking from './common/usePageTracking';
import ReactGA from "react-ga4";
import Weather from './components/Weather';

Modal.setAppElement('#root'); // 접근성 설정용 (필수)

function App() {
  useEffect(() => {
    // 발급받은 GA4 측정 ID 입력
    const gaId = import.meta.env.VITE_GA_ID;
    if (gaId) {
      ReactGA.initialize(gaId);
      ReactGA.send("pageview"); // 첫 페이지 로딩 시 기록
    }

  }, []);

  usePageTracking();
  return (
    <>
      <AuthProvider>
        <Header />
        <div className="content-container">
          <div className='content-wrap'>
            <Routes>
              <Route path="/*" element={<RouletteBoard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join" element={<RegisterMember />} />
              <Route path="/his" element={<ProtectedRoute><Resulthis /></ProtectedRoute>} />
            </Routes >
          </div>
        </div>

      </AuthProvider>
    </>
  )
}

export default App
