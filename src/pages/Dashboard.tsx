/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable no-undef */
/* eslint-disable no-console */

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { 
  Users as UsersIcon, 
  MessageSquare as MessageSquareIcon, 
  Star as StarIcon,
  FileText as FileTextIcon,
  Activity as ActivityIcon,
  BarChart2 as BarChart2Icon,
  Clock as ClockIcon,
  AlertTriangle as AlertTriangleIcon,
  Download as DownloadIcon,
  Eye as EyeIcon,
  ArrowRight as ArrowRightIcon
} from 'lucide-react';

type LucideIcon = React.ComponentType<{ className?: string; size?: number | string }>;

interface StatCard {
  id: number;
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  description: string;
  color: string;
}

interface RecentActivity {
  id: number;
  type: 'client_survey' | 'staff_survey' | 'report' | 'alert';
  title: string;
  description: string;
  time: string;
  status: 'new' | 'read' | 'urgent';
  icon: LucideIcon;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [pharmacyName] = useState('Pharmacie du Progrès'); // Récupéré depuis le contexte utilisateur

  // Données de statistiques adaptées à PharmaciEfficace
  const stats: StatCard[] = useMemo(() => [
    {
      id: 1,
      title: 'Avis clients',
      value: '47',
      icon: MessageSquareIcon,
      trend: 'up',
      trendValue: '12%',
      description: 'Cette semaine',
      color: 'from-blue-600 to-blue-700'
    },
    {
      id: 2,
      title: 'Satisfaction moyenne',
      value: '4.6/5',
      icon: StarIcon,
      trend: 'up',
      trendValue: '0.3',
      description: 'Note globale',
      color: 'from-yellow-600 to-orange-600'
    },
    {
      id: 3,
      title: 'Sondages personnel',
      value: '23',
      icon: UsersIcon,
      trend: 'neutral',
      trendValue: '0%',
      description: 'Cette semaine',
      color: 'from-green-600 to-green-700'
    }
  ], []);

  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      type: 'client_survey',
      title: 'Nouvel avis client reçu',
      description: 'Évaluation 5/5 avec commentaire positif sur l\'accueil',
      time: 'Il y a 2 heures',
      status: 'new',
      icon: MessageSquareIcon
    },
    {
      id: 2,
      type: 'staff_survey',
      title: 'Sondage journalier complété',
      description: 'Équipe du matin - Ambiance de travail évaluée',
      time: 'Il y a 4 heures',
      status: 'read',
      icon: UsersIcon
    },
    {
      id: 3,
      type: 'alert',
      title: 'Alerte satisfaction',
      description: 'Baisse temporaire de la note moyenne (4.2/5)',
      time: 'Hier',
      status: 'urgent',
      icon: AlertTriangleIcon
    },
    {
      id: 4,
      type: 'report',
      title: 'Rapport hebdomadaire généré',
      description: 'Analyse des tendances et recommandations',
      time: 'Il y a 2 jours',
      status: 'read',
      icon: FileTextIcon
    }
  ]);


  const handleActivityClick = useCallback((id: number) => {
    setRecentActivities(prevActivities => 
      prevActivities.map(activity => 
        activity.id === id 
          ? { ...activity, status: activity.status === 'new' ? 'read' as const : activity.status }
          : activity
      )
    );
  }, []);

  const getActivityStatusStyles = (status: 'new' | 'read' | 'urgent') => {
    switch (status) {
      case 'new': {
        return 'bg-blue-100 border-l-4 border-l-blue-600';
      }
      case 'urgent': {
        return 'bg-red-100 border-l-4 border-l-red-600';
      }
      case 'read': {
        return 'bg-white hover:bg-gray-50 border-l-4 border-l-transparent';
      }
      default: {
        const _exhaustiveCheck: never = status;
        return _exhaustiveCheck;
      }
    }
  };

  const getActivityStatusIndicator = (status: 'new' | 'read' | 'urgent') => {
    switch (status) {
      case 'new': {
        return <div className="w-3 h-3 bg-blue-600 rounded-full"></div>;
      }
      case 'read': {
        return <div className="w-3 h-3 bg-gray-400 rounded-full"></div>;
      }
      case 'urgent': {
        return <div className="w-3 h-3 bg-red-600 rounded-full"></div>;
      }
      default: {
        const _exhaustiveCheck: never = status;
        return _exhaustiveCheck;
      }
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulation de chargement des données
        await new Promise(resolve => window.setTimeout(resolve, 1200));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Erreur lors du chargement du tableau de bord');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Chargement de votre tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* En-tête */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="mt-1 text-sm text-gray-700">
                Bon retour, <span className="font-medium">{pharmacyName}</span> - Aperçu de vos performances
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <div className="relative rounded-md shadow-sm">
                <select
                  id="period"
                  name="period"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-primary-600 sm:text-sm rounded-md bg-white text-gray-900"
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <option value="7d">7 derniers jours</option>
                  <option value="30d">30 derniers jours</option>
                  <option value="90d">3 derniers mois</option>
                </select>
              </div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-700 hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-600"
              >
                <DownloadIcon className="-ml-1 mr-2 h-4 w-4" />
                Exporter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cartes de statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        {stat.value}
                      </p>
                      <div className="flex items-center">
                        {stat.trend === 'up' && (
                          <ArrowRightIcon className="w-4 h-4 ml-1 rotate-45" />
                        )}
                        {stat.trend === 'down' && (
                          <ArrowRightIcon className="w-4 h-4 ml-1 -rotate-45" />
                        )}
                        <span className={`text-sm font-semibold ${stat.trend === 'up' ? 'text-green-600' :
                          stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                          {stat.trend !== 'neutral' && stat.trendValue} {stat.description}
                        </span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activités récentes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center justify-between mb-4">
                  <span className="flex items-center">
                    <ActivityIcon className="w-5 h-5 mr-2 text-blue-700" />
                    Activités récentes
                  </span>
                  <button className="text-sm text-blue-700 hover:text-blue-900 font-semibold hover:underline">
                    Voir tout
                  </button>
                </h3>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        onClick={() => handleActivityClick(activity.id)}
                        className={`px-6 py-4 cursor-pointer transition-colors duration-150 ${getActivityStatusStyles(activity.status)}`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0">
                            {getActivityStatusIndicator(activity.status)}
                          </div>
                          <div className="flex-shrink-0">
                            <Icon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-medium ${activity.status === 'new' ? 'text-blue-900' : 'text-gray-900'}`}>
                              {activity.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {activity.description}
                            </p>
                            <div className="flex items-center mt-2">
                              <ClockIcon className="w-3 h-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-500">{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Actions rapides */}
          <div className="mt-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Actions rapides
                </h3>
                <p className="text-green-100">
                  Gérez votre pharmacie plus efficacement
                </p>
              </div>
              <div className="flex space-x-4">
                <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center">
                  <BarChart2Icon className="w-4 h-4 mr-2" />
                  Voir les rapports
                </button>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center">
                  <EyeIcon className="w-4 h-4 mr-2" />
                  Code QR sondage
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;