import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { describe, it, expect, vi } from 'vitest';

describe('Card', () => {
  it('calls onCardClick when a card is clicked', () => {
    const characters = [{ id: 1, name: 'Rick Sanchez', image: 'rick.png' }];
    const mockOnClick = vi.fn();

    render(<CardList characters={characters} onCardClick={mockOnClick} />);

    screen.getByRole('button', { name: /Rick Sanchez/i }).click();

    expect(mockOnClick).toHaveBeenCalledWith(1);
  });
});
