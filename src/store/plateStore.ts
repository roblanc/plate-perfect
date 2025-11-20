import { create } from 'zustand';
import { PlateState } from '@/types/plate';
import { validatePlate } from '@/data/countryFormats';

interface PlateStore extends PlateState {
  setPlateNumber: (plateNumber: string) => void;
  setCountry: (country: string) => void;
  setCarColor: (color: string) => void;
  setCarModel: (model: string) => void;
  validate: () => void;
}

export const usePlateStore = create<PlateStore>((set, get) => ({
  plateNumber: 'B 123 ABC',
  country: 'RO',
  carColor: '#FF0000',
  carModel: 'sedan',
  isValid: true,
  errorMessage: undefined,

  setPlateNumber: (plateNumber) => {
    set({ plateNumber });
    get().validate();
  },

  setCountry: (country) => {
    set({ country });
    get().validate();
  },

  setCarColor: (color) => set({ carColor: color }),

  setCarModel: (model) => set({ carModel: model }),

  validate: () => {
    const { plateNumber, country } = get();
    const result = validatePlate(plateNumber, country);
    set({ isValid: result.isValid, errorMessage: result.errorMessage });
  }
}));
