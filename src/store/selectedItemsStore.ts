import { create } from 'zustand';
import { CharacterPreview } from '../types';

interface SelectedItemsState {
  selected: Record<number, CharacterPreview>;
  toggleItem: (item: CharacterPreview) => void;
  clear: () => void;
}

export const useSelectedItemsStore = create<SelectedItemsState>((set) => ({
  selected: {},
  toggleItem: (item) =>
    set((state) => {
      const exists = !!state.selected[item.id];
      const updated = { ...state.selected };
      if (exists) delete updated[item.id];
      else updated[item.id] = item;
      return { selected: updated };
    }),
  clear: () => set({ selected: {} }),
}));
