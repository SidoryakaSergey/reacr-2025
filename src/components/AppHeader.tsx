import React from 'react';
import { Link } from 'react-router-dom';

const AppHeader: React.FC = () => {
  return (
    <header>
      <h1>The Rick and Morty API</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default AppHeader;
