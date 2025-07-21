import { render, screen } from '@testing-library/react';
import Card from './Card';
import { describe, it, expect } from 'vitest';

describe('Card', () => {
  it('renders character name and image', () => {
    render(<Card name="Rick Sanchez" image="rick.png" />);

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();

    const img = screen.getByAltText('Rick Sanchez') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('rick.png');
  });
});
