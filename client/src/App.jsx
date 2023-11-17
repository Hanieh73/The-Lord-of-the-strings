import { useState, useRef, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Protected } from './components';
import {BackgroundMusic, BackgroundMusic2} from'./assets'
import './App.css';
import {
  HomePage,
  AboutPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  GamePage,
  DashboardPage
} from './pages';
import { ExampleProvider } from './contexts';

function App() {
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioPlayed) {
        const audio = new Audio(BackgroundMusic2);
        audio.volume = 0.2;
        audio.play();
        setAudioPlayed(true);
      }
    };
     document.addEventListener('click', handleFirstInteraction, { once: true });
     return () => {
       document.removeEventListener('click', handleFirstInteraction);
     };
   }, [audioPlayed]);
  return (
    <>
    <ExampleProvider>
      <Routes>
        <Route path="/" />
          <Route index element={<HomePage />} />
          <Route
            path="/about"
            element={
              <Protected>
                <AboutPage />
              </Protected>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/*" element={<NotFoundPage />} />
        
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </ExampleProvider>
    </>
  );
}

export default App;
