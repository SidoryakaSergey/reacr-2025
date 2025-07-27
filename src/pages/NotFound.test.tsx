import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Page', () => {
  it('renders 404 heading and text', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(/404/i);
    expect(screen.getByText(/wrong dimension/i)).toBeInTheDocument();
  });

  it('has link to go back home', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );

    const link = screen.getByRole('link', { name: /jump back home/i });
    expect(link).toBeInTheDocument();
    expect(link.getAttribute('href')).toBe('/');
  });
});
