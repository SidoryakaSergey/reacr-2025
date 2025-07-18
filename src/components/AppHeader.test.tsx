import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AppHeader from './AppHeader';

describe('AppHeader', () => {
  it('renders the app title', () => {
    render(<AppHeader />);
    expect(screen.getByText(/the rick and morty api/i)).toBeInTheDocument();
  });
});
