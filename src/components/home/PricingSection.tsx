import React, { useState } from 'react';
import { Check, X, Zap, Crown, Star } from 'lucide-react';

// Données locales adaptées à PharmaciEfficace
const pricingPlans = [
  {
    name: "Essentiel",
    price: "15,000",
    originalPrice: "20,000",
    period: "FCFA/mois",
    description: "Parfait pour les petites pharmacies",
    features: [
      "Sondages clients illimités",
      "Dashboard de base",
      "Jusqu'à 1 utilisateur personnel",
      "Rapports mensuels",
      "Support par email",
      "Code secret sécurisé"
    ],
    limitations: [
      "Analytics avancées",
      "API personnalisée",
      "Support prioritaire"
    ],
    cta: "Commencer l'essai",
    featured: false,
    badge: "",
    color: "from-green-500 to-green-600"
  },
  {
    name: "Professionnel",
    price: "35,000",
    originalPrice: "45,000",
    period: "FCFA/mois",
    description: "Le plus populaire pour pharmacies moyennes",
    features: [
      "Toutes les fonctionnalités Essentiel",
      "Jusqu'à 3 utilisateurs personnel",
      "Sondages internes journaliers et globaux",
      "Analytics avancées avec graphiques",
      "Rapports hebdomadaires personnalisés",
      "Export PDF/Excel illimité",
      "Support prioritaire",
      "Formation en ligne incluse",
      "Alertes de renouvellement",
      "Comparaison avec benchmarks secteur"
    ],
    limitations: [
      "API personnalisée",
      "Compte dédié"
    ],
    cta: "Essai gratuit 30 jours",
    featured: true,
    badge: "Plus populaire",
    color: "from-green-600 to-green-700"
  },
  {
    name: "Entreprise",
    price: "Sur devis",
    originalPrice: "",
    period: "personnalisé",
    description: "Pour groupes et chaînes de pharmacies",
    features: [
      "Toutes les fonctionnalités Pro",
      "Utilisateurs personnel illimités",
      "Multi-pharmacies (gestion centralisée)",
      "API personnalisée complète",
      "Support 24/7 dédié",
      "Compte manager personnel",
      "Formation sur site",
      "Intégration systèmes existants",
      "SLA garantis",
      "Rapports consolidés multi-sites",
      "Fonctionnalités sur-mesure"
    ],
    limitations: [],
    cta: "Nous contacter",
    featured: false,
    badge: "Sur mesure",
    color: "from-orange-500 to-orange-600"
  }
];

interface PricingPlan {
  name: string;
  price: string;
  originalPrice: string;
  period: string;
  description: string;
  features: string[];
  limitations: string[];
  cta: string;
  featured: boolean;
  badge: string;
  color: string;
}

const PricingCard: React.FC<{ plan: PricingPlan; isAnnual: boolean }> = ({ plan, isAnnual }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const calculateAnnualPrice = (monthlyPrice: string) => {
    if (monthlyPrice === "Sur devis") return monthlyPrice;
    const monthly = parseInt(monthlyPrice.replace(/[^0-9]/g, ''));
    const annual = Math.round(monthly * 12 * 0.85); // 15% de réduction
    return annual.toLocaleString('fr-FR');
  };

  const displayPrice = isAnnual && plan.price !== "Sur devis" 
    ? calculateAnnualPrice(plan.price)
    : plan.price;

  const displayPeriod = isAnnual && plan.price !== "Sur devis" 
    ? "FCFA/an" 
    : plan.period;
  
  const getIcon = (planName: string) => {
    switch (planName) {
      case 'Essentiel':
        return <Zap className="w-6 h-6" />;
      case 'Professionnel':
        return <Star className="w-6 h-6" />;
      case 'Entreprise':
        return <Crown className="w-6 h-6" />;
      default:
        return <Check className="w-6 h-6" />;
    }
  };

  return (
    <div 
      className={`p-8 rounded-2xl border-2 transition-all duration-300 relative ${
        plan.featured 
          ? 'border-green-600 bg-white shadow-xl transform -translate-y-2' 
          : 'border-gray-100 bg-white hover:border-green-200 hover:shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {plan.badge && (
        <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${plan.color} shadow-lg`}>
          {plan.badge}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center mx-auto mb-4 text-white ${
          isHovered ? 'scale-110' : ''
        } transition-transform duration-300`}>
          {getIcon(plan.name)}
        </div>
        
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
        <p className="text-gray-600 text-sm">{plan.description}</p>
      </div>

      {/* Prix */}
      <div className="text-center mb-8">
        <div className="flex items-end justify-center mb-2">
          {plan.originalPrice && !isAnnual && (
            <span className="text-lg text-gray-400 line-through mr-2">{plan.originalPrice}</span>
          )}
          <span className="text-4xl font-semibold text-gray-900">
            {displayPrice}
            {isAnnual && plan.price !== "Sur devis" && (
              <span className="ml-2 text-sm font-normal text-green-600">
                (Économisez 15%)
              </span>
            )}
          </span>
        </div>
        <span className="text-gray-600">{displayPeriod}</span>
        {isAnnual && plan.price !== "Sur devis" && (
          <div className="mt-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
              15% d'économie
            </span>
          </div>
        )}
      </div>

      {/* Fonctionnalités */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
          <Check className="w-4 h-4 text-green-600 mr-2" />
          Inclus
        </h4>
        <ul className="space-y-3">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-600 text-sm">{feature}</span>
            </li>
          ))}
        </ul>

        {plan.limitations.length > 0 && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
              <X className="w-4 h-4 text-gray-400 mr-2" />
              Non inclus
            </h4>
            <ul className="space-y-2">
              {plan.limitations.map((limitation, i) => (
                <li key={i} className="flex items-start">
                  <X className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500 text-sm">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA */}
      <button 
        className={`w-full py-4 px-6 rounded-xl font-medium transition-all duration-200 ${
          plan.featured 
            ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 shadow-lg hover:shadow-green-600/30 transform hover:-translate-y-0.5' 
            : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-md'
        }`}
      >
        {plan.featured && <Zap className="w-4 h-4 inline-block mr-2 -mt-1" />}
        {plan.cta}
      </button>

      {/* Garantie */}
      {plan.name !== "Entreprise" && (
        <p className="text-center text-xs text-gray-500 mt-4">
          ✅ Essai gratuit • ⌚ Aucun engagement
        </p>
      )}
    </div>
  );
};

const PricingSection: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-orange-50 border-2 border-green-200 text-green-700 text-sm font-semibold mb-6 shadow-md">
            <Zap className="w-4 h-4 mr-2" />
            Nos offres
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-5">
            Des tarifs <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">adaptés</span> à votre pharmacie
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-green-500 to-orange-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-10">
            Choisissez la formule qui correspond le mieux à vos besoins et à votre budget
          </p>
          
          {/* Basculeur Mensuel/Annuel amélioré */}
          <div className="bg-gray-50 p-4 rounded-xl max-w-md mx-auto mb-12 border border-gray-100 shadow-sm">
            <p className="text-center text-sm text-gray-600 mb-3">Choisissez votre période de facturation</p>
            <div className="flex justify-center items-center">
              <span className={`mr-4 font-medium text-base ${!isAnnual ? 'text-green-700 font-semibold' : 'text-gray-500'}`}>Mensuel</span>
              <button
                type="button"
                className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 ${
                  isAnnual ? 'bg-green-600' : 'bg-gray-200'
                }`}
                role="switch"
                aria-checked={isAnnual}
                onClick={() => setIsAnnual(!isAnnual)}
              >
                <span className="sr-only">Changer la périodicité</span>
                <span
                  aria-hidden="true"
                  className={`${
                    isAnnual ? 'translate-x-7' : 'translate-x-0.5'
                  } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition-all duration-200 ease-in-out`}
                />
              </button>
              <div className="ml-4 flex items-center">
                <span className={`font-medium text-base ${isAnnual ? 'text-green-700 font-semibold' : 'text-gray-500'}`}>Annuel</span>
                <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 border border-green-200">
                  Économisez 15%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 sm:px-0">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} isAnnual={isAnnual} />
          ))}
        </div>

        {/* Tableau de comparaison détaillé */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">
            Comparaison des offres
          </h3>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-16">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fonctionnalités</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Essentiel</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Professionnel</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Entreprise</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Sondages clients</td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Utilisateurs personnel</td>
                    <td className="px-6 py-4 text-center text-sm">1 max</td>
                    <td className="px-6 py-4 text-center text-sm">3 max</td>
                    <td className="px-6 py-4 text-center text-sm">Illimité</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-900">Analytics avancées</td>
                    <td className="px-6 py-4 text-center"><X className="w-5 h-5 text-gray-400 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                    <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-green-600 mx-auto" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">Support</td>
                    <td className="px-6 py-4 text-center text-sm">Email</td>
                    <td className="px-6 py-4 text-center text-sm">Prioritaire</td>
                    <td className="px-6 py-4 text-center text-sm">24/7 dédié</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ rapide */}
        <div className="bg-gradient-to-r from-green-600 to-orange-500 rounded-2xl p-8 text-white text-center max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6">Questions fréquentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-semibold mb-2">Puis-je changer d'offre ?</h4>
              <p className="text-green-100 text-sm">Oui, à tout moment et sans frais supplémentaires.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Y a-t-il des frais d'installation ?</h4>
              <p className="text-green-100 text-sm">Non, la configuration et la formation sont incluses.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Les données sont-elles sécurisées ?</h4>
              <p className="text-green-100 text-sm">Chiffrement bout en bout et conformité RGPD garantis.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Support en français ?</h4>
              <p className="text-green-100 text-sm">Oui, support complet en français avec équipe locale.</p>
            </div>
          </div>
          <div className="mt-8">
            <button className="bg-white text-green-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors duration-200 shadow-lg">
              Démarrer l'essai gratuit
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;