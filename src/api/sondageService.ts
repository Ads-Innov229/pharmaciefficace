import { apiClient } from './apiClient';

export interface Question {
  id: string;
  libelle: string;
  type: 'ouverte' | 'fermee';
  options?: string[];
  required: boolean;
}

export interface Reponse {
  questionId: string;
  reponse: string;
}

export const sondageService = {
  // Récupérer les questions du sondage journalier
  getSondageJournalier: async (pharmacieId: string) => {
    const response = await apiClient.get(`/sondage/journalier/${pharmacieId}`);
    return response.data;
  },

  // Récupérer les questions du sondage global
  getSondageGlobal: async (pharmacieId: string) => {
    const response = await apiClient.get(`/sondage/global/${pharmacieId}`);
    return response.data;
  },

  // Soumettre les réponses d'un sondage
  soumettreReponses: async (pharmacieId: string, type: 'journalier' | 'global', reponses: Reponse[]) => {
    const response = await apiClient.post('/sondage/store', {
      pharmacieId,
      type,
      reponses
    });
    return response.data;
  },

  // Vérifier le code secret assistant
  verifierCodeSecret: async (pharmacieId: string, code: string) => {
    const response = await apiClient.post('/verifier-code-secret', {
      pharmacieId,
      code
    });
    return response.data;
  },

  // Régénérer le code secret
  regenererCodeSecret: async (pharmacieId: string) => {
    const response = await apiClient.post('/regenererCodeSecret', { pharmacieId });
    return response.data;
  }
};