import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { describe, it, expect } from 'vitest';

describe('CardList', () => {
  it('renders list of characters', () => {
    const characters = [
      { id: 1, name: 'Rick Sanchez', image: 'rick.png' },
      { id: 2, name: 'Morty Smith', image: 'morty.png' },
    ];

    render(<CardList characters={characters} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
});
