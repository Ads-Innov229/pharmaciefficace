import React, { useState } from 'react';
import { Plus, BarChart2, CheckCircle, Clock, Users } from 'lucide-react';

interface Sondage {
  id: number;
  titre: string;
  statut: 'actif' | 'termine' | 'brouillon';
  dateCreation: string;
  dateFin: string;
  participants: number;
  questions: number;
}

type TabType = 'tous' | 'actifs' | 'termines' | 'brouillons';

const SondagesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('tous');
  
  // Données factices pour les sondages
  const sondages: Sondage[] = [
    {
      id: 1,
      titre: 'Satisfaction client - Juin 2023',
      statut: 'actif',
      dateCreation: '01/06/2023',
      dateFin: '30/06/2023',
      participants: 124,
      questions: 10,
    },
    {
      id: 2,
      titre: 'Évaluation des produits',
      statut: 'termine',
      dateCreation: '01/05/2023',
      dateFin: '31/05/2023',
      participants: 89,
      questions: 8,
    },
    {
      id: 3,
      titre: 'Nouveaux services à proposer',
      statut: 'brouillon',
      dateCreation: '15/06/2023',
      dateFin: '',
      participants: 0,
      questions: 5,
    },
  ];

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case 'actif':
        return 'bg-green-100 text-green-800';
      case 'termine':
        return 'bg-gray-100 text-gray-800';
      case 'brouillon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case 'actif':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'termine':
        return <CheckCircle className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  const filteredSondages = sondages.filter(sondage => {
    if (activeTab === 'tous') return true;
    if (activeTab === 'actifs') return sondage.statut === 'actif';
    if (activeTab === 'termines') return sondage.statut === 'termine';
    if (activeTab === 'brouillons') return sondage.statut === 'brouillon';
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Sondages</h1>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center">
          <Plus className="w-5 h-5 mr-2" />
          Nouveau sondage
        </button>
      </div>

      {/* Onglets */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'tous' as const, label: 'Tous les sondages' },
            { id: 'actifs' as const, label: 'Actifs' },
            { id: 'termines' as const, label: 'Terminés' },
            { id: 'brouillons' as const, label: 'Brouillons' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Liste des sondages */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredSondages.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredSondages.map((sondage) => (
              <li key={sondage.id} className="hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
                        <BarChart2 className="h-5 w-5" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {sondage.titre}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center text-sm text-gray-500">
                          <span className="mr-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(sondage.statut)}`}>
                              {getStatusIcon(sondage.statut)}
                              {sondage.statut.charAt(0).toUpperCase() + sondage.statut.slice(1)}
                            </span>
                          </span>
                          <span className="mr-3 flex items-center">
                            <Users className="h-4 w-4 mr-1 text-gray-400" />
                            {sondage.participants} participants
                          </span>
                          <span className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-gray-400" />
                            {sondage.questions} questions
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <div className="text-sm text-gray-500">
                        Créé le {sondage.dateCreation}
                        {sondage.dateFin && ` • Clôture le ${sondage.dateFin}`}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <BarChart2 className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun sondage trouvé</h3>
            <p className="mt-1 text-sm text-gray-500">
              {activeTab === 'tous'
                ? 'Commencez par créer votre premier sondage.'
                : `Aucun sondage ${activeTab} pour le moment.`}
            </p>
            <div className="mt-6">
              <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                <Plus className="-ml-1 mr-2 h-5 w-5" />
                Nouveau sondage
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SondagesPage;
