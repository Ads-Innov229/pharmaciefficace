import React, { useState } from 'react';
import { MessageSquare, BarChart3, Users, Shield, Clock, Activity as Target, ChevronRight } from 'lucide-react';

// Define the icon map first
const iconMap = {
  MessageSquare,
  BarChart3,
  Users,
  Shield,
  Clock,
  Target
} as const;

type FeatureIcon = keyof typeof iconMap;

interface Feature {
  icon: FeatureIcon;
  title: string;
  description: string;
  details: string[];
  color: string;
}

// Données adaptées à PharmaciEfficace
const features: Feature[] = [
  {
    icon: 'MessageSquare',
    title: 'Sondages clients anonymes',
    description: 'Collectez les avis de vos clients de manière anonyme pour obtenir des retours sincères',
    details: [
      'Jusqu\'à 2 avis par client par jour',
      'Questions personnalisables par pharmacie',
      'Anonymat total garanti',
      'Interface simple et intuitive'
    ],
    color: 'from-[#4D7C2C] to-[#5A8F35]'
  },
  {
    icon: 'BarChart3',
    title: 'Tableaux de bord dynamiques',
    description: 'Visualisez vos performances avec des statistiques en temps réel et des rapports détaillés',
    details: [
      'Graphiques interactifs et exports PDF/Excel',
      'Suivi des tendances de satisfaction',
      'Alertes automatiques sur les baisses de performance',
      'Comparaison avec les standards du secteur'
    ],
    color: 'from-[#4D7C2C] to-[#5A8F35]'
  },
  {
    icon: 'Users',
    title: 'Gestion RH',
    description: 'Optimisez la gestion de votre équipe selon les normes pharmaceutiques béninoises',
    details: [
      'Accès sécurisé par code secret',
      'Sondages journaliers et périodiques',
      'Anonymat complet du personnel',
      'Questions ouvertes et fermées'
    ],
    color: 'from-[#E57325] to-[#F58537]'
  },
  {
    icon: 'Shield',
    title: 'Sécurité RGPD',
    description: 'Données médicales sécurisées conformément aux réglementations béninoises',
    details: [
      'Chiffrement bout en bout',
      'Conformité RGPD',
      'Stockage sécurisé des données sensibles',
      'Accès contrôlé par rôles'
    ],
    color: 'from-[#4D7C2C] to-[#5A8F35]'
  },
  {
    icon: 'Clock',
    title: 'Abonnements adaptés',
    description: 'Forfaits flexibles spécialement conçus pour les pharmacies béninoises',
    details: [
      'Plans adaptés à chaque taille de pharmacie',
      'Paiements en FCFA sans frais cachés',
      'Support technique local au Bénin',
      'Facturation conforme à la réglementation béninoise'
    ],
    color: 'from-[#E57325] to-[#F58537]'
  },
  {
    icon: 'Target',
    title: 'Amélioration continue',
    description: 'Outils d\'analyse pour optimiser votre pharmacie selon le marché béninois',
    details: [
      'Analyse prédictive des tendances',
      'Recommandations d\'actions correctives',
      'Suivi des améliorations mises en place',
      'Benchmarking avec autres pharmacies'
    ],
    color: 'from-[#4D7C2C] to-[#5A8F35]'
  }
];

const FeatureCard: React.FC<{ feature: Feature; index: number; isExpanded: boolean; onToggle: () => void }> = ({ 
  feature, 
  index, 
  isExpanded, 
  onToggle 
}) => {
  const Icon = iconMap[feature.icon];
  
  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden ${
        isExpanded ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      
      <div className="relative p-8 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <button
            onClick={onToggle}
            className="p-2 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors duration-200 group"
          >
            <ChevronRight className={`w-5 h-5 text-[#666666] group-hover:text-[#4D7C2C] transition-all duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`} />
          </button>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-[#4D7C2C] transition-colors font-['Poppins']">
          {feature.title}
        </h3>
        
        <p className="text-[#666666] mb-6 leading-relaxed flex-grow font-['Roboto']">
          {feature.description}
        </p>

        {isExpanded && (
          <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-5">
            Découvrez nos <span className="text-[#4D7C2C]">fonctionnalités clés</span>
          </h2>
          <div className="h-1 w-24 bg-[#E57325] mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Une plateforme complète pour améliorer la qualité de vos services pharmaceutiques
          </p>
          <ul className="space-y-3">
            {feature.details.map((detail, i) => (
              <li key={i} className="flex items-start">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${feature.color} mt-2 mr-3 flex-shrink-0`}></div>
                <span className="text-[#666666] font-['Roboto']">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
        )}

        <div className={`w-full h-1 bg-gradient-to-r ${feature.color} rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      </div>
    </div>
  );
};

export const FeaturesSection = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#4D7C2C]/10 text-[#4D7C2C] text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2" />
            Fonctionnalités principales
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 font-['Poppins']">
            Une solution complète pour votre
            <span className="bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35] bg-clip-text text-transparent"> pharmacie</span>
          </h2>
          <p className="text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed font-['Roboto']">
            Découvrez comment PharmaciEfficace transforme la gestion de votre pharmacie grâce à des outils innovants et intuitifs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              isExpanded={expandedIndex === index}
              onToggle={() => toggleExpand(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};