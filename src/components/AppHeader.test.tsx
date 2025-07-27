import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import AppHeader from './AppHeader';

describe('AppHeader', () => {
  it('renders the app title', () => {
    render(
      <MemoryRouter>
        <AppHeader />
      </MemoryRouter>,
    );
    expect(screen.getByText(/the rick and morty api/i)).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <AppHeader />
      </MemoryRouter>,
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

  it('applies active class to correct link', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <AppHeader />
      </MemoryRouter>,
    );
    const aboutLink = screen.getByText(/about/i);
    const homeLink = screen.getByText(/home/i);

    expect(aboutLink).toHaveClass('active');
    expect(homeLink).not.toHaveClass('active');
  });
});
