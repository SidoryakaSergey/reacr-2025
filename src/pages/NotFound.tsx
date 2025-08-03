import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="notfound-container">
    <h2 className="notfound-title">404 - Interdimensional Mishap!</h2>
    <p className="notfound-text">
      Wubba Lubba Dub Dub! Looks like you’ve jumped into the wrong dimension, buddy. This page doesn’t exist in{' '}
      <span className="highlight">this universe</span>. Maybe Rick spilled some portal fluid here?
    </p>
    <Link to="/" className="btn notfound-btn">
      Jump Back Home
    </Link>
  </div>
);

export default NotFound;
