import { apiClient } from './apiClient';

export interface Departement {
  id: string;
  nom: string;
}

export interface Commune {
  id: string;
  nom: string;
  departementId: string;
}

export interface Arrondissement {
  id: string;
  nom: string;
  communeId: string;
}

export interface Village {
  id: string;
  nom: string;
  arrondissementId: string;
}

export const locationService = {
  getDepartements: async (): Promise<Departement[]> => {
    const response = await apiClient.get('/departements');
    return response.data;
  },

  getCommunes: async (departementId: string): Promise<Commune[]> => {
    const response = await apiClient.get(`/getCommunes/${departementId}`);
    return response.data;
  },

  getArrondissements: async (communeId: string): Promise<Arrondissement[]> => {
    const response = await apiClient.get(`/getArrondissements/${communeId}`);
    return response.data;
  },

  getVillages: async (arrondissementId: string): Promise<Village[]> => {
    const response = await apiClient.get(`/getVillages/${arrondissementId}`);
    return response.data;
  }
};