import { create } from 'zustand';
import { ICategory } from '../constants/data'

export const useCategoriesStore = create((set) => ({
    categories: [],
    setCategories: (categories: ICategory[]) => set((state) => ({ ...state, categories: categories })),
    removeAllCategories: () => set({ categories: [] }),
}))