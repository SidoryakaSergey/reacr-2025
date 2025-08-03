import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import App from './App';
import SearchApp from './components/SearchApp/SearchApp';
import CharacterDetails from './components/SearchApp/CharacterDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/1" />,
      },
      {
        path: ':page',
        element: <SearchApp />,
        children: [
          {
            path: ':detailsId',
            element: <CharacterDetails />,
          },
        ],
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '404',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);
