// Données mock pour le développement
import { Departement, Commune, Arrondissement, Village } from '../api/locationService';

export const mockDepartements: Departement[] = [
  { id: '1', nom: 'Littoral' },
  { id: '2', nom: 'Atlantique' },
  { id: '3', nom: 'Ouémé' },
  { id: '4', nom: 'Borgou' },
  { id: '5', nom: 'Zou' },
  { id: '6', nom: 'Collines' },
  { id: '7', nom: 'Donga' },
  { id: '8', nom: 'Alibori' },
  { id: '9', nom: 'Atacora' },
  { id: '10', nom: 'Couffo' },
  { id: '11', nom: 'Mono' },
  { id: '12', nom: 'Plateau' },
];

export const mockCommunes: { [departementId: string]: Commune[] } = {
  '1': [
    { id: '1-1', nom: 'Cotonou', departementId: '1' },
  ],
  '2': [
    { id: '2-1', nom: 'Abomey-Calavi', departementId: '2' },
    { id: '2-2', nom: 'Allada', departementId: '2' },
    { id: '2-3', nom: 'Kpomassè', departementId: '2' },
    { id: '2-4', nom: 'Ouidah', departementId: '2' },
    { id: '2-5', nom: 'Sô-Ava', departementId: '2' },
    { id: '2-6', nom: 'Toffo', departementId: '2' },
    { id: '2-7', nom: 'Tori-Bossito', departementId: '2' },
    { id: '2-8', nom: 'Zè', departementId: '2' },
  ],
  '3': [
    { id: '3-1', nom: 'Porto-Novo', departementId: '3' },
    { id: '3-2', nom: 'Adjara', departementId: '3' },
    { id: '3-3', nom: 'Avrankou', departementId: '3' },
    { id: '3-4', nom: 'Bonou', departementId: '3' },
    { id: '3-5', nom: 'Dangbo', departementId: '3' },
    { id: '3-6', nom: 'Sèmè-Podji', departementId: '3' },
  ],
};

export const mockArrondissements: { [communeId: string]: Arrondissement[] } = {
  '1-1': [
    { id: '1-1-1', nom: '1er Arrondissement', communeId: '1-1' },
    { id: '1-1-2', nom: '2e Arrondissement', communeId: '1-1' },
    { id: '1-1-3', nom: '3e Arrondissement', communeId: '1-1' },
    { id: '1-1-4', nom: '4e Arrondissement', communeId: '1-1' },
    { id: '1-1-5', nom: '5e Arrondissement', communeId: '1-1' },
  ],
  '2-1': [
    { id: '2-1-1', nom: 'Abomey-Calavi Centre', communeId: '2-1' },
    { id: '2-1-2', nom: 'Godomey', communeId: '2-1' },
    { id: '2-1-3', nom: 'Togba', communeId: '2-1' },
  ],
};

export const mockVillages: { [arrondissementId: string]: Village[] } = {
  '1-1-1': [
    { id: '1-1-1-1', nom: 'Ganhi', arrondissementId: '1-1-1' },
    { id: '1-1-1-2', nom: 'Gbegamey', arrondissementId: '1-1-1' },
  ],
  '1-1-2': [
    { id: '1-1-2-1', nom: 'Cadjehoun', arrondissementId: '1-1-2' },
    { id: '1-1-2-2', nom: 'Fidjrossè', arrondissementId: '1-1-2' },
  ],
  '2-1-1': [
    { id: '2-1-1-1', nom: 'Calavi Centre', arrondissementId: '2-1-1' },
    { id: '2-1-1-2', nom: 'Zogbadjè', arrondissementId: '2-1-1' },
  ],
};