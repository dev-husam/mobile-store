import { create } from 'zustand';

export const useVehicleStore = create((set) => ({
    vehicles: [],
    setVehicles: (vehicles: any[]) => set((state) => ({ ...state, vehicles: vehicles })),
    removeAllVehicles: () => set({ vehicles: [] }),
}))