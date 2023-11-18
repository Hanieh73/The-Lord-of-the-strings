import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import {BackgroundMusic} from'./assets'
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

const App = () => {
  const [audioPlayed, setAudioPlayed] = useState(false);

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!audioPlayed) {
        const audio = new Audio(BackgroundMusic);
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
