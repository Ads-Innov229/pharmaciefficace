import React, { useState } from 'react';
import { Download, FileText, Search } from 'lucide-react';

const RapportsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Données factices pour les rapports
  const rapports = [
    {
      id: 1,
      titre: 'Rapport de vente mensuel - Juin 2023',
      date: '30/06/2023',
      type: 'Ventes',
      taille: '2.5 MB',
    },
    {
      id: 2,
      titre: 'Analyse des stocks - Juin 2023',
      date: '28/06/2023',
      type: 'Stocks',
      taille: '1.8 MB',
    },
    {
      id: 3,
      titre: 'Rapport des commandes fournisseurs',
      date: '25/06/2023',
      type: 'Commandes',
      taille: '3.2 MB',
    },
  ];

  const filteredRapports = rapports.filter(rapport =>
    rapport.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rapport.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Rapports</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
          <FileText className="w-5 h-5 mr-2" />
          Nouveau rapport
        </button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Rechercher un rapport..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredRapports.map((rapport) => (
            <li key={rapport.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="flex-shrink-0 h-10 w-10 text-green-500" />
                    <div className="ml-4">
                      <div className="text-sm font-medium text-green-600 truncate">
                        {rapport.titre}
                      </div>
                      <div className="mt-1 flex text-sm text-gray-500">
                        <span className="mr-2">{rapport.type}</span>
                        <span>•</span>
                        <span className="mx-2">{rapport.date}</span>
                        <span>•</span>
                        <span className="ml-2">{rapport.taille}</span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button className="font-medium text-green-600 hover:text-green-500 mr-4">
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {filteredRapports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun rapport trouvé</h3>
          <p className="mt-1 text-sm text-gray-500">
            Aucun rapport ne correspond à votre recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default RapportsPage;
