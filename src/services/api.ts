
import axios from 'axios';

const API_BASE_URL = 'https://api-test.example.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Vehicle {
  id?: number;
  veiculo: string;
  marca: string;
  ano: number;
  descricao: string;
  vendido: boolean;
  created?: string;
  updated?: string;
}

export const vehicleService = {
  getAll: async (): Promise<Vehicle[]> => {
    try {
      const response = await api.get('/veiculos');
      return response.data;
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      return [];
    }
  },

  getById: async (id: number): Promise<Vehicle | null> => {
    try {
      const response = await api.get(`/veiculos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching vehicle ${id}:`, error);
      return null;
    }
  },

  create: async (vehicle: Vehicle): Promise<Vehicle | null> => {
    try {
      const response = await api.post('/veiculos', vehicle);
      return response.data;
    } catch (error) {
      console.error('Error creating vehicle:', error);
      return null;
    }
  },

  update: async (id: number, vehicle: Vehicle): Promise<Vehicle | null> => {
    try {
      const response = await api.put(`/veiculos/${id}`, vehicle);
      return response.data;
    } catch (error) {
      console.error(`Error updating vehicle ${id}:`, error);
      return null;
    }
  },

  delete: async (id: number): Promise<boolean> => {
    try {
      await api.delete(`/veiculos/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting vehicle ${id}:`, error);
      return false;
    }
  },
};

export default vehicleService;
