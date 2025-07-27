import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import SearchApp from './components/SearchApp/SearchApp';
import CharacterDetails from './components/SearchApp/CharacterDetails';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { Navigate } from 'react-router-dom';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="/1" /> },
      {
        path: ':page',
        element: <SearchApp />,
        children: [{ path: ':detailsId', element: <CharacterDetails /> }],
      },
      { path: 'about', element: <About /> },
      { path: '404', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  },
];

describe('routing', () => {
  it('redirects "/" to "/1" and renders SearchApp', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/'] });
    render(<RouterProvider router={router} />);
    expect(await screen.findByTestId('search-app')).toBeInTheDocument();
  });

  it('renders About on /about', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/about'] });
    render(<RouterProvider router={router} />);
    expect(await screen.findByText(/about this the rick and morty api/i)).toBeInTheDocument();
  });

  it('renders CharacterDetails on /1/42', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/1/42'] });
    render(<RouterProvider router={router} />);
    expect(await screen.findByTestId('character-details')).toBeInTheDocument();
  });

  it('renders NotFound on /404', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/404'] });
    render(<RouterProvider router={router} />);
    expect(await screen.findByText(/404 - interdimensional mishap!/i)).toBeInTheDocument();
  });

  it('redirects unknown route to /404', async () => {
    const router = createMemoryRouter(routes, { initialEntries: ['/unknown-path'] });
    render(<RouterProvider router={router} />);
    expect(await screen.findByText(/404 - interdimensional mishap!/i)).toBeInTheDocument();
  });
});
