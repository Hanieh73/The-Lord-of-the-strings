import { Routes, Route } from 'react-router-dom';
import { Header, Protected } from './components';
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

function App() {
  return (
    <>
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
          <Route path="/game" element={<GamePage />} />
          <Route path="/*" element={<NotFoundPage />} />
          
        <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
