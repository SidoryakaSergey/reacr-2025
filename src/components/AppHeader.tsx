import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/useTheme';
import './AppHeader.css';

const AppHeader: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <h1 className="header-title">The Rick and Morty API</h1>
      <nav className="nav-menu">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Home
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          About
        </NavLink>
      </nav>
      <div className="theme-switcher">
        <button onClick={toggleTheme}>{theme === 'light' ? '🌙 Dark' : '☀️ Light'}</button>
      </div>
    </header>
  );
};

export default AppHeader;
