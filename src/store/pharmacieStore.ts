import { create } from 'zustand';
import { apiClient } from '../api/apiClient';
import { toast } from 'react-hot-toast';

export interface Pharmacie {
  // Required fields
  id: string;
  nom: string;
  adresse: string;
  telephone: string;
  email: string;
  departement: string;
  commune: string;
  abonnementActif: boolean;
  
  // Optional fields
  arrondissement?: string | undefined;
  village?: string | undefined;
  latitude?: number | undefined;
  longitude?: number | undefined;
  image?: string | undefined;
  description?: string | undefined;
  horaires?: string | undefined;
  codeSecret?: string | undefined;
  dateExpiration?: string | undefined;
}

interface PharmacieStore {
  // State
  pharmacies: Pharmacie[];
  currentPharmacie: Pharmacie | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchAllPharmacies: () => Promise<void>;
  fetchPharmacie: (id: string) => Promise<Pharmacie | null>;
  createPharmacie: (pharmacie: Omit<Pharmacie, 'id'>) => Promise<Pharmacie | null>;
  updatePharmacie: (id: string, updates: Partial<Pharmacie>) => Promise<Pharmacie | null>;
  deletePharmacie: (id: string) => Promise<boolean>;
  
  // Helper setters
  setPharmacies: (pharmacies: Pharmacie[]) => void;
  setCurrentPharmacie: (pharmacie: Pharmacie | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePharmacieStore = create<PharmacieStore>((set, get) => ({
  // Initial state
  pharmacies: [],
  currentPharmacie: null,
  loading: false,
  error: null,

  // Actions
  fetchAllPharmacies: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.get<Pharmacie[]>('/pharmacies');
      set({ pharmacies: response.data, loading: false });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur lors du chargement des pharmacies';
      set({ error: errorMsg, loading: false });
      toast.error(errorMsg);
      throw error;
    }
  },

  fetchPharmacie: async (id: string) => {
    set({ loading: true, error: null });
    try {
      // Check if the pharmacie is already in the store
      const existing = get().pharmacies.find(p => p.id === id);
      if (existing) {
        set({ currentPharmacie: existing, loading: false });
        return existing;
      }
      
      // Otherwise, fetch it from the API
      const response = await apiClient.get<Pharmacie>(`/pharmacies/${id}`);
      const pharmacie = response.data;
      
      // Update the store
      set(state => ({
        pharmacies: state.pharmacies.some(p => p.id === pharmacie.id)
          ? state.pharmacies.map(p => p.id === pharmacie.id ? pharmacie : p)
          : [...state.pharmacies, pharmacie],
        currentPharmacie: pharmacie,
        loading: false
      }));
      
      return pharmacie;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur lors du chargement de la pharmacie';
      set({ error: errorMsg, loading: false });
      toast.error(errorMsg);
      throw error;
    }
  },

  createPharmacie: async (pharmacieData: Omit<Pharmacie, 'id'>) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.post<Pharmacie>('/pharmacies', pharmacieData);
      const newPharmacie = response.data;
      
      set(state => ({
        pharmacies: [...state.pharmacies, newPharmacie],
        currentPharmacie: newPharmacie,
        loading: false
      }));
      
      toast.success('Pharmacie créée avec succès');
      return newPharmacie;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur lors de la création de la pharmacie';
      set({ error: errorMsg, loading: false });
      toast.error(errorMsg);
      throw error;
    }
  },

  updatePharmacie: async (id: string, updates: Partial<Pharmacie>) => {
    set({ loading: true, error: null });
    try {
      const response = await apiClient.patch<Pharmacie>(`/pharmacies/${id}`, updates);
      const updatedPharmacie = response.data;
      
      set(state => ({
        pharmacies: state.pharmacies.map(p => p.id === id ? updatedPharmacie : p),
        currentPharmacie: state.currentPharmacie?.id === id 
          ? updatedPharmacie 
          : state.currentPharmacie,
        loading: false
      }));
      
      toast.success('Pharmacie mise à jour avec succès');
      return updatedPharmacie;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur lors de la mise à jour de la pharmacie';
      set({ error: errorMsg, loading: false });
      toast.error(errorMsg);
      throw error;
    }
  },

  deletePharmacie: async (id: string) => {
    set({ loading: true, error: null });
    try {
      await apiClient.delete(`/pharmacies/${id}`);
      
      set(state => ({
        pharmacies: state.pharmacies.filter(p => p.id !== id),
        currentPharmacie: state.currentPharmacie?.id === id ? null : state.currentPharmacie,
        loading: false
      }));
      
      toast.success('Pharmacie supprimée avec succès');
      return true;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Erreur lors de la suppression de la pharmacie';
      set({ error: errorMsg, loading: false });
      toast.error(errorMsg);
      throw error;
    }
  },

  // Helper setters
  setPharmacies: (pharmacies) => set({ pharmacies }),
  setCurrentPharmacie: (pharmacie) => set({ currentPharmacie: pharmacie }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error })
}));