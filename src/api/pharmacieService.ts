import { apiClient } from './apiClient';
import { Pharmacie } from '../store/pharmacieStore';

export interface SearchFilters {
  departement?: string;
  commune?: string;
  arrondissement?: string;
  village?: string;
  garde?: boolean;
  page?: number;
  limit?: number;
}

export const pharmacieService = {
  // Récupérer toutes les pharmacies
  getPharmacies: async (page = 1, departement?: string, commune?: string) => {
    const params = new URLSearchParams({ page: page.toString() });
    if (departement) params.append('departement', departement);
    if (commune) params.append('commune', commune);
    
    const response = await apiClient.get(`/pharmacies?${params.toString()}`);
    return response.data;
  },

  // Récupérer une pharmacie par ID
  getPharmacie: async (id: string) => {
    const response = await apiClient.get(`/pharmacies/${id}`);
    return response.data;
  },

  // Rechercher des pharmacies
  searchPharmacies: async (query: string, filters?: SearchFilters) => {
    const response = await apiClient.post('/pharmacies/search', { query, ...filters });
    return response.data;
  },

  // Inscrire une nouvelle pharmacie
  inscrirePharmacie: async (data: Partial<Pharmacie>) => {
    const response = await apiClient.post('/pharmacies', data);
    return response.data;
  },

  // Mettre à jour une pharmacie
  updatePharmacie: async (id: string, data: Partial<Pharmacie>) => {
    const response = await apiClient.patch(`/pharmacies/${id}`, data);
    return response.data;
  },

  // Vérifier un email
  checkEmail: async (email: string) => {
    const response = await apiClient.post('/check-email', { email });
    return response.data;
  }
};