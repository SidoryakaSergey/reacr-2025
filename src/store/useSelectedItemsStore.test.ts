import { describe, it, expect, beforeEach } from 'vitest';
import { useSelectedItemsStore } from './selectedItemsStore';
import { act } from '@testing-library/react';

const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  image: 'https://rick.com/rick.png',
};

describe('useSelectedItemsStore', () => {
  beforeEach(() => {
    act(() => {
      useSelectedItemsStore.getState().clear();
    });
  });

  it('should have an empty initial state', () => {
    const selected = useSelectedItemsStore.getState().selected;
    expect(selected).toEqual({});
  });

  it('should add item when toggled on', () => {
    act(() => {
      useSelectedItemsStore.getState().toggleItem(mockCharacter);
    });

    const selected = useSelectedItemsStore.getState().selected;
    expect(selected[mockCharacter.id]).toEqual(mockCharacter);
  });

  it('should remove item when toggled off', () => {
    act(() => {
      useSelectedItemsStore.getState().toggleItem(mockCharacter);
      useSelectedItemsStore.getState().toggleItem(mockCharacter);
    });

    const selected = useSelectedItemsStore.getState().selected;
    expect(selected[mockCharacter.id]).toBeUndefined();
  });

  it('should clear all selected items', () => {
    act(() => {
      useSelectedItemsStore.getState().toggleItem(mockCharacter);
      useSelectedItemsStore.getState().clear();
    });

    const selected = useSelectedItemsStore.getState().selected;
    expect(selected).toEqual({});
  });
});
