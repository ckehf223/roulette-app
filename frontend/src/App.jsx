import { useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import RouletteBoard from './components/RouletteBoard';
import Modal from 'react-modal';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './common/AuthContext';
import Resulthis from './components/Resulthis';

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
              <Route path="/his" element={<Resulthis />} />
            </Routes >
          </div>
        </div>

      </AuthProvider>
    </>
  )
}

export default App
