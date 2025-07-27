import React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <AppHeader />
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

export default App;
