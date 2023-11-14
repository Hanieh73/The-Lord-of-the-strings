import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useExample } from '../../contexts';

const styles = ({ isActive }) => ({ color: isActive ? '#2B061E' : '#875053' });

export default function Header() {
  const { isLoggedIn } = useExample();

  return (
    <main>
      <header>
        <h1>NAVIGATION</h1>
        <nav>
          <NavLink to="/" style={styles}>
            Home
          </NavLink>
          <NavLink to="/about" style={styles}>
            About
          </NavLink>
          <NavLink id="loginButton" to="/login">
            {isLoggedIn ? 'Logout' : 'Login'}
          </NavLink>
        </nav>
      </header>
      <Outlet />
    </main>
  );
}
