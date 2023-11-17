import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useExample } from '../../contexts';

const styles = ({ isActive }) => ({ color: isActive ? '#2B061E' : '#875053' });

export default function Header() {
  const { isLoggedIn } = useExample();

  return (
    <>
      .
      <Outlet />
    </>
  );
}
