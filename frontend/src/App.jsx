import { useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import RouletteBoard from './components/RouletteBoard';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 접근성 설정용 (필수)

function App() {

  return (
    <>
      <Header />
      <RouletteBoard />
    </>
  )
}

export default App
