import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SearchApp from './SearchApp';
import CharacterDetails from './CharacterDetails';
import { vi, beforeEach, describe, it, expect } from 'vitest';
import { ApiResponse } from '../../types';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'rick.png',
  episode: [],
  url: '',
  created: '',
};

const mockFetch = (response: ApiResponse, ok = true) =>
  vi.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
    }),
  );

beforeEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

const renderWithRouter = (initialRoute = '/1') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path=":page" element={<SearchApp />}>
          <Route path=":detailsId" element={<CharacterDetails />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
};

describe('SearchApp', () => {
  it('searches and displays characters', async () => {
    const searchResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [mockCharacter],
    };

    vi.stubGlobal('fetch', mockFetch(searchResponse));

    renderWithRouter('/1');

    fireEvent.change(screen.getByPlaceholderText(/search character/i), {
      target: { value: 'Rick' },
    });
    fireEvent.click(screen.getByText(/search/i));

    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByAltText(/rick sanchez/i)).toHaveAttribute('src', 'rick.png');
  });

  it('navigates to character details on card click', async () => {
    const searchResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [mockCharacter],
    };

    const detailsResponse = mockCharacter;

    vi.stubGlobal(
      'fetch',
      vi.fn((url: string) => {
        if (url.includes('/character/1')) {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(detailsResponse),
          });
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(searchResponse),
        });
      }),
    );

    renderWithRouter('/1');

    fireEvent.change(screen.getByPlaceholderText(/search character/i), {
      target: { value: 'Rick' },
    });
    fireEvent.click(screen.getByText(/search/i));

    const characterCard = await screen.findByText(/rick sanchez/i);
    fireEvent.click(characterCard);

    await waitFor(() => {
      expect(screen.getByTestId('right-panel')).toBeInTheDocument();
      expect(screen.getByText(/status:/i)).toBeInTheDocument();
    });
  });

  it('shows message when no characters found', async () => {
    const emptyResponse = {
      info: { count: 0, pages: 0, next: null, prev: null },
      results: [],
    };

    vi.stubGlobal('fetch', mockFetch(emptyResponse));

    renderWithRouter('/1');

    fireEvent.change(screen.getByPlaceholderText(/search character/i), {
      target: { value: 'NonExistentName' },
    });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
    });
  });
});
