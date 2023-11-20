import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';


import { Protected } from './components';

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
import { ExampleProvider } from './contexts';
const App = () => {
  
  return (
    <ExampleProvider>
      <Routes>
        <Route path="/" >
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
          <Route path="/*" element={<NotFoundPage />} />
          
        </Route>
        <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
        <Route path="/game" element={<GamePage />} />
        <Route path="load" element={<GameLibraryPage />} />

      </Routes>
    </ExampleProvider>
  );
};

export default App;