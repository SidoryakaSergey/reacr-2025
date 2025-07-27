import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import About from './About';

describe('About component', () => {
  it('renders the title', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /about this the rick and morty api/i })).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<About />);
    expect(screen.getByText(/this portal-powered api explorer was created/i)).toBeInTheDocument();
    expect(screen.getByText(/thanatus666/i)).toBeInTheDocument();
  });

  it('renders a link to RS School React Course', () => {
    render(<About />);
    const link = screen.getByRole('link', {
      name: /visit rs school react course/i,
    });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://rs.school/courses/reactjs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });

  it('has correct test id', () => {
    render(<About />);
    expect(screen.getByTestId('about-page')).toBeInTheDocument();
  });
});
