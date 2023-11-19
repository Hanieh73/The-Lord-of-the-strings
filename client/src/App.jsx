import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import {
  HomePage,
  AboutPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  GamePage,
  DashboardPage,
  GameLibraryPage,
} from './pages';

const App = () => {
  return (
    <>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="load" element={<GameLibraryPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
