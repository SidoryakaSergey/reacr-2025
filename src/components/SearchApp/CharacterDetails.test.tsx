import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetails from './CharacterDetails';
import { Character } from '../../types';

const mockCharacter: Character = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth (C-137)', url: '' },
  location: { name: 'Citadel of Ricks', url: '' },
  image: 'rick.png',
  episode: [],
  url: '',
  created: '',
};

describe('CharacterDetails', () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const renderWithRouter = (id = '1') => {
    return render(
      <MemoryRouter initialEntries={[`/1/${id}`]}>
        <Routes>
          <Route path="/1/:detailsId" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>,
    );
  };

  it('shows loading initially', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    });

    renderWithRouter();

    expect(screen.getByText(/loading character/i)).toBeInTheDocument();
    await waitFor(() => screen.getByText(/rick sanchez/i));
  });

  it('renders character details on success', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    });

    renderWithRouter();

    expect(await screen.findByText(/rick sanchez/i)).toBeInTheDocument();
    expect(screen.getByText(/status: alive/i)).toBeInTheDocument();
    expect(screen.getByText(/origin: earth/i)).toBeInTheDocument();
  });

  it('shows error message if character not found', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
    });

    renderWithRouter();

    expect(await screen.findByText(/character not found/i)).toBeInTheDocument();
  });

  it('closes panel on "Close" button click', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => mockCharacter,
    });

    renderWithRouter();

    await waitFor(() => screen.getByText(/rick sanchez/i));

    const closeBtn = screen.getByText(/close/i);
    fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(screen.queryByText(/rick sanchez/i)).not.toBeInTheDocument();
    });
  });
});
