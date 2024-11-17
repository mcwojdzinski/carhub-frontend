import { create } from 'zustand';
import { Car } from './interface/Car';
import axios from 'axios';

interface StoreState {
    cars: Car[];
    fetchCars: () => Promise<void>;
    addCar: (newCar: Car) => Promise<void>;
    deleteCar: (id: string) => Promise<void>;
  }

const useStore = create<StoreState>((set) => ({
  cars: [],

  fetchCars: async () => {
    try {
      const response = await axios.get('/');
      set({ cars: response.data });
    } catch (error) {
      console.error('Błąd podczas pobierania samochodów:', error);
    }
  },

  addCar: async (newCar: Car) => {
    try {
      await axios.post('/', newCar);
      set((state: any) => ({ cars: [...state.cars, newCar] }));
    } catch (error) {
      console.error('Błąd podczas dodawania samochodu:', error);
    }
  },

  deleteCar: async (id: string) => {
    try {
      await axios.delete(`/${id}`);
      set((state: any) => ({
        cars: state.cars.filter((car: any) => car._id !== id),
      }));
    } catch (error) {
      console.error('Błąd podczas usuwania samochodu:', error);
    }
  },
}));

export default useStore