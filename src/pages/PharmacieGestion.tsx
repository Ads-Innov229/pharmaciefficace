/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-floating-promises */

import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePharmacieStore } from '../store/pharmacieStore';

const PharmacieGestion: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { 
    pharmacies, 
    loading, 
    error,
    fetchAllPharmacies,
    deletePharmacie 
  } = usePharmacieStore();
  
  // Charger les pharmacies au montage
  useEffect(() => {
    const loadPharmacies = async () => {
      try {
        await fetchAllPharmacies();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error loading pharmacies:', err);
      }
    };
    
    void loadPharmacies();
  }, [fetchAllPharmacies]);
  
  // Gestion de la suppression
  const handleDelete = async (id: string, nom: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la pharmacie "${nom}" ?`)) {
      try {
        await deletePharmacie(id);
        await fetchAllPharmacies(); // Recharger la liste après suppression
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error deleting pharmacie:', err);
      }
    }
  };
  
  // Filtrer les pharmacies selon le terme de recherche
  const filteredPharmacies = pharmacies.filter(pharmacie =>
    pharmacie.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pharmacie.commune?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (pharmacie.departement?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (pharmacie.telephone?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  // Afficher le statut de chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Afficher les erreurs
  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
        {error}
      </div>
    );
  }

  // Fonction pour obtenir la classe CSS du badge de statut
  const getStatusBadge = (status: boolean) => {
    return status 
      ? 'bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full'
      : 'bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full';
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Gestion des pharmacies</h1>
        <Link
          to="/pharmacies/nouveau"
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une pharmacie
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une pharmacie..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Localisation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPharmacies.length > 0 ? (
              filteredPharmacies.map((pharmacie) => (
                <tr key={pharmacie.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {pharmacie.image ? (
                          <img className="h-10 w-10 rounded-full" src={pharmacie.image} alt={pharmacie.nom} />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">{pharmacie.nom.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{pharmacie.nom}</div>
                        <div className="text-sm text-gray-500">{pharmacie.adresse}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                      <span>
                        {[pharmacie.commune, pharmacie.arrondissement, pharmacie.village]
                          .filter(Boolean)
                          .join(', ')}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{pharmacie.departement}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Phone className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {pharmacie.telephone || 'Non renseigné'}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Mail className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                      {pharmacie.email || 'Non renseigné'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getStatusBadge(pharmacie.abonnementActif)}>
                      {pharmacie.abonnementActif ? 'Actif' : 'Inactif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link
                        to={`/pharmacies/${pharmacie.id}`}
                        className="text-blue-600 hover:text-blue-900 mr-4"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(pharmacie.id, pharmacie.nom)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  Aucune pharmacie trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PharmacieGestion;
