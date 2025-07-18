import { render, screen, fireEvent } from '@testing-library/react';
import SearchControls from './SearchControls';
import { describe, it, expect, vi } from 'vitest';

describe('SearchControls', () => {
  it('renders input and buttons', () => {
    const handleInput = vi.fn();
    const handleSearch = vi.fn();
    const handleError = vi.fn();

    render(
      <SearchControls
        searchTerm="Rick"
        onInputChange={handleInput}
        onSearch={handleSearch}
        onErrorClick={handleError}
      />,
    );

    expect(screen.getByPlaceholderText(/search character/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /trigger error/i })).toBeInTheDocument();
  });

  it('calls onSearch when clicking Search button', () => {
    const handleSearch = vi.fn();

    render(<SearchControls searchTerm="" onInputChange={() => {}} onSearch={handleSearch} onErrorClick={() => {}} />);

    fireEvent.click(screen.getByText('Search'));
    expect(handleSearch).toHaveBeenCalled();
  });
});
