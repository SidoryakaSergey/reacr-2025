import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import SearchApp from './SearchApp';
import ErrorBoundary from '../ErrorBoundary';
import { Character, ApiResponse } from '../../types';

const mockCharacters: Character[] = [
  { id: 1, name: 'Rick Sanchez', image: 'rick.png' },
  { id: 2, name: 'Morty Smith', image: 'morty.png' },
];

const mockResponse: ApiResponse = {
  info: {
    count: 2,
    pages: 1,
    next: null,
    prev: null,
  },
  results: mockCharacters,
};

describe('SearchApp', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(global.localStorage.__proto__, 'getItem').mockReturnValue('');
    vi.spyOn(global.localStorage.__proto__, 'setItem').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders input and buttons', () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<SearchApp />);
    expect(screen.getByPlaceholderText(/search character/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/trigger error/i)).toBeInTheDocument();
  });

  it('loads characters from API and renders them', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    render(<SearchApp />);

    await waitFor(() => {
      expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
      expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
  });

  it('handles API error and displays error message', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
    });

    render(<SearchApp />);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('throws error when triggerError is true', () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(
        <ErrorBoundary>
          <SearchApp />
        </ErrorBoundary>,
      );

      fireEvent.click(screen.getByText(/trigger error/i));
    }).not.toThrow();
  });
});
