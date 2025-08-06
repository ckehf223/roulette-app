import { useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import RouletteBoard from './components/RouletteBoard';

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
