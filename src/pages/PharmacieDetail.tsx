/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowLeft } from 'lucide-react';
import { Pharmacie, usePharmacieStore } from '../store/pharmacieStore';
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';

const PharmacieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchPharmacie, currentPharmacie, loading, error } = usePharmacieStore();
  const [pharmacie, setPharmacie] = useState<Pharmacie | null>(null);

  useEffect(() => {
    const loadPharmacie = async () => {
      try {
        if (id) {
          await fetchPharmacie(id);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de la pharmacie:', error);
      }
    };
    
    void loadPharmacie();
  }, [id, fetchPharmacie]);

  useEffect(() => {
    if (currentPharmacie) {
      setPharmacie(currentPharmacie);
    }
  }, [currentPharmacie]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !pharmacie) {
    const errorMessage = error || "La pharmacie demandée n'existe pas ou a été supprimée.";
    const title = error ? "Erreur" : "Pharmacie non trouvée";
    
    return (
      <ProtectedLayout title={title}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{errorMessage}</p>
          <Link
            to="/pharmacies"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="-ml-1 mr-2 h-5 w-5" />
            Retour à la liste
          </Link>
        </div>
      </ProtectedLayout>
    );
  }

  // Format location string based on available fields
  const getLocationString = () => {
    return [
      pharmacie.village,
      pharmacie.arrondissement,
      pharmacie.commune,
      pharmacie.departement
    ].filter(Boolean).join(', ');
  };
  
  // Format horaires for display (assuming it's a string with line breaks or semicolons)
  const formatHoraires = (horaires?: string) => {
    if (!horaires) return [];
    return horaires.split(/[\n;]/).map(line => line.trim()).filter(Boolean);
  };
  
  const horairesList = formatHoraires(pharmacie.horaires);

  return (
    <ProtectedLayout 
      title={pharmacie.nom}
      subtitle="Détails de la pharmacie"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link 
            to="/pharmacies" 
            className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Retour à la liste des pharmacies
          </Link>
          
          <div className="p-8 md:w-2/3">
            <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">
              Pharmacie
            </div>
            <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
              {pharmacie.nom}
            </h1>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <MapPin className="flex-shrink-0 h-5 w-5 text-gray-500 mt-0.5" />
                <div className="ml-3">
                  <p className="text-gray-700">{pharmacie.adresse}</p>
                  <p className="text-gray-500">{getLocationString()}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Phone className="flex-shrink-0 h-5 w-5 text-gray-500" />
                <a href={`tel:${pharmacie.telephone}`} className="ml-3 text-gray-700 hover:text-green-600">
                  {pharmacie.telephone}
                </a>
              </div>
              
              <div className="flex items-center">
                <Mail className="flex-shrink-0 h-5 w-5 text-gray-500" />
                <a href={`mailto:${pharmacie.email}`} className="ml-3 text-gray-700 hover:text-green-600">
                  {pharmacie.email}
                </a>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900">Horaires d'ouverture</h3>
              <div className="mt-2 space-y-1">
                {horairesList.length > 0 ? (
                  horairesList.map((horaire, index) => (
                    <div key={index} className="text-gray-600">
                      {horaire}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Aucun horaire renseigné</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-8 pb-8">
          {pharmacie.description && (
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Description</h3>
              <p className="mt-2 text-gray-600">{pharmacie.description}</p>
            </div>
          )}
          
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900">Localisation</h3>
            <div className="mt-4 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
              Carte de localisation
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default PharmacieDetail;
