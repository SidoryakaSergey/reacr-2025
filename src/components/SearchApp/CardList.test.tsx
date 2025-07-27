import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { describe, it, expect, vi } from 'vitest';

describe('CardList', () => {
  it('renders list of characters', () => {
    const characters = [
      { id: 1, name: 'Rick Sanchez', image: 'rick.png' },
      { id: 2, name: 'Morty Smith', image: 'morty.png' },
    ];

    const mockOnClick = vi.fn();

    render(<CardList characters={characters} onCardClick={mockOnClick} />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });
  it('calls onCardClick when a card is clicked', () => {
    const characters = [{ id: 1, name: 'Rick Sanchez', image: 'rick.png' }];
    const mockOnClick = vi.fn();

    render(<CardList characters={characters} onCardClick={mockOnClick} />);

    screen.getByText('Rick Sanchez').click();

    expect(mockOnClick).toHaveBeenCalledWith(1);
  });
});
