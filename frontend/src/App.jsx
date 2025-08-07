import { useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import RouletteBoard from './components/RouletteBoard';
// App.jsx 또는 index.jsx 최상단에서 실행
import Modal from 'react-modal';

Modal.setAppElement('#root'); // 접근성 설정용 (필수)

function App() {

  useEffect(() => {
    const preloadImages = () => {
      for (let i = 2; i <= 8; i++) {
        const img = new Image();
        img.src = `/images/pp${i}.png`;
      }
    };
    preloadImages();
  }, []);

  return (
    <>
      <Header />
      <RouletteBoard />
    </>
  )
}

export default App
