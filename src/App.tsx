import React from 'react';
import AppHeader from './components/AppHeader';
import ErrorBoundary from './components/ErrorBoundary';
import SearchApp from './components/SearchApp/SearchApp';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <AppHeader />
          <SearchApp />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
