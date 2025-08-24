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

Modal.setAppElement('#root'); // 접근성 설정용 (필수)

function App() {

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
