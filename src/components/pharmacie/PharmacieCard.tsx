import type React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, Star } from 'lucide-react';
import { Pharmacie } from '../../store/pharmacieStore';

interface PharmacieCardProps {
  pharmacie: Pharmacie;
}

export const PharmacieCard: React.FC<PharmacieCardProps> = ({ pharmacie }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-blue-50 to-green-50 overflow-hidden">
        {pharmacie.image ? (
          <img 
            src={pharmacie.image} 
            alt={pharmacie.nom}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-6xl text-blue-200">💊</div>
          </div>
        )}
        
        {/* Badge d'abonnement */}
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            pharmacie.abonnementActif 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {pharmacie.abonnementActif ? 'Actif' : 'Inactif'}
          </span>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {pharmacie.nom}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
            <span className="text-sm">{pharmacie.adresse}</span>
          </div>
          
          {pharmacie.telephone && (
            <div className="flex items-center text-gray-600">
              <Phone className="w-4 h-4 mr-2 text-green-500" />
              <span className="text-sm">{pharmacie.telephone}</span>
            </div>
          )}
          
          {pharmacie.horaires && (
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-2 text-orange-500" />
              <span className="text-sm">{pharmacie.horaires}</span>
            </div>
          )}
        </div>

        {/* Localisation */}
        <div className="text-xs text-gray-500 mb-4">
          {pharmacie.commune}, {pharmacie.departement}
          {pharmacie.arrondissement && `, ${pharmacie.arrondissement}`}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <Star className="w-4 h-4 text-gray-300" />
            <span className="text-sm text-gray-600 ml-1">(4.0)</span>
          </div>
          
          <Link
            to={`/pharmacie?id=${pharmacie.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
          >
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
};