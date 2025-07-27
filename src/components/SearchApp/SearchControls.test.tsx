import { render, screen, fireEvent } from '@testing-library/react';
import SearchControls from './SearchControls';
import { describe, it, expect, vi } from 'vitest';

describe('SearchControls', () => {
  const setup = () => {
    const handleInput = vi.fn();
    const handleSearch = vi.fn();
    const handleError = vi.fn();

    render(<SearchControls searchTerm="Rick" onInputChange={handleInput} onSearch={handleSearch} />);

    return { handleInput, handleSearch, handleError };
  };

  it('renders input and buttons', () => {
    setup();

    expect(screen.getByPlaceholderText(/search character/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSearch when clicking Search button', () => {
    const { handleSearch } = setup();
    fireEvent.click(screen.getByRole('button', { name: /search/i }));
    expect(handleSearch).toHaveBeenCalled();
  });

  it('calls onSearch when Enter is pressed in input field', () => {
    const { handleSearch } = setup();
    const input = screen.getByPlaceholderText(/search character/i);
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleSearch).toHaveBeenCalled();
  });

  it('calls onInputChange when typing in input', () => {
    const { handleInput } = setup();
    const input = screen.getByPlaceholderText(/search character/i);
    fireEvent.change(input, { target: { value: 'Morty' } });
    expect(handleInput).toHaveBeenCalled();
  });
});
