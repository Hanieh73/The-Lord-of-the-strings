import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Protected } from './components';
import './App.css';
import {
  HomePage,
  AboutPage,
  NotFoundPage,
  LoginPage,
  RegisterPage,
  DashboardPage
} from './pages';
import { ExampleProvider } from './contexts';
//Don't forget to change name of Provider

//To protect Route do this element={<Protected><Page /></Protected>}

function App() {
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
      </Routes>
    </ExampleProvider>
  );
}

export default App;
