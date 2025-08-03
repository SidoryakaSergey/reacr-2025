import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectedFlyout from './SelectedFlyout';
import { useSelectedItemsStore } from '../../store/selectedItemsStore';

describe('SelectedFlyout', () => {
  beforeEach(() => {
    useSelectedItemsStore.getState().clear();
    vi.restoreAllMocks();
  });

  it('should render selected items and clear on "Unselect All"', () => {
    useSelectedItemsStore.getState().toggleItem({
      id: 1,
      name: 'Rick Sanchez',
      image: 'rick.png',
    });

    render(<SelectedFlyout />);
    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Unselect All/i));
    expect(screen.queryByText(/1 items are selected/i)).not.toBeInTheDocument();
  });

  it('should trigger download on "Download"', () => {
    useSelectedItemsStore.getState().toggleItem({
      id: 2,
      name: 'Morty Smith',
      image: 'morty.png',
    });

    const createObjectURLMock = vi.fn(() => 'blob:http://localhost/fake-url');
    const revokeObjectURLMock = vi.fn();
    vi.stubGlobal('URL', {
      createObjectURL: createObjectURLMock,
      revokeObjectURL: revokeObjectURLMock,
    } as unknown as typeof URL);

    const realCreateElement = document.createElement.bind(document);
    const anchor = realCreateElement('a');
    const clickSpy = vi.spyOn(anchor, 'click');

    const createElementSpy = vi.spyOn(document, 'createElement').mockImplementation((tagName: string) => {
      if (tagName === 'a') return anchor;
      return realCreateElement(tagName);
    });

    render(<SelectedFlyout />);
    fireEvent.click(screen.getByText(/Download/i));

    expect(clickSpy).toHaveBeenCalled();
    expect(createObjectURLMock).toHaveBeenCalled();
    expect(revokeObjectURLMock).toHaveBeenCalled();
    expect(anchor.download).toBe('1_items.csv');
    expect(anchor.href).toBe('blob:http://localhost/fake-url');

    createElementSpy.mockRestore();
  });
});
