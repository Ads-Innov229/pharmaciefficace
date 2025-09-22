import React, { useState } from 'react';
import { 
  UserPlus, 
  Settings, 
  MessageSquare, 
  BarChart3, 
  ArrowRight, 
  CheckCircle,
  Users,
  Shield
} from 'lucide-react';

// Désactiver la vérification de type pour les icônes Lucide
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconType = React.ComponentType<any>;

interface Step {
  number: string;
  title: string;
  description: string;
  details: string[];
  icon: IconType;
  color: string;
}

interface SubStep {
  title: string;
  description: string;
  icon: IconType;
}

const HowItWorksSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps: Step[] = [
    {
      number: '1',
      title: 'Créez votre compte pharmacie',
      description: 'Inscrivez votre pharmacie en quelques minutes et recevez votre code secret par email.',
      details: [
        'Remplissez le formulaire avec les informations de votre pharmacie',
        'Ajoutez une photo et description de votre établissement',
        'Définissez votre localisation avec la carte intégrée',
        'Recevez votre code secret sécurisé par email'
      ],
      icon: UserPlus,
      color: 'from-green-600 to-green-700'
    },
    {
      number: '2',
      title: 'Configurez votre équipe',
      description: 'Paramétrez les accès de votre personnel et personnalisez vos sondages selon vos besoins.',
      details: [
        'Partagez le code secret avec votre équipe',
        'Personnalisez les questions des sondages clients',
        'Configurez la fréquence des sondages internes',
        'Définissez les paramètres de notification'
      ],
      icon: Settings,
      color: 'from-orange-500 to-orange-600'
    },
    {
      number: '3',
      title: 'Lancez vos premiers sondages',
      description: 'Commencez à collecter les avis clients et les retours de votre personnel en toute simplicité.',
      details: [
        'Activez la collecte d\'avis clients anonymes',
        'Lancez les premiers sondages internes journaliers',
        'Surveillez les premiers retours en temps réel',
        'Ajustez les paramètres selon vos observations'
      ],
      icon: MessageSquare,
      color: 'from-green-500 to-green-600'
    },
    {
      number: '4',
      title: 'Analysez et améliorez',
      description: 'Consultez vos tableaux de bord détaillés et prenez des décisions éclairées pour votre pharmacie.',
      details: [
        'Accédez à votre dashboard avec statistiques en temps réel',
        'Exportez vos rapports en PDF ou Excel',
        'Identifiez les axes d\'amélioration prioritaires',
        'Mesurez l\'impact de vos actions correctives'
      ],
      icon: BarChart3,
      color: 'from-orange-600 to-orange-700'
    }
  ];

  const userTypes: SubStep[] = [
    {
      title: 'Pour les clients',
      description: 'Interface simple pour donner des avis anonymes jusqu\'à 2 fois par jour',
      icon: MessageSquare
    },
    {
      title: 'Pour le personnel',
      description: 'Accès sécurisé par code secret pour les sondages internes',
      icon: Users
    },
    {
      title: 'Pour les responsables',
      description: 'Dashboard complet avec gestion d\'abonnement et exports',
      icon: Shield
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Formes décoratives */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-50 to-orange-50 border-2 border-green-200 text-green-700 text-sm font-semibold mb-6 shadow-md">
            <ArrowRight className="w-4 h-4 mr-2" />
            Guide d'utilisation
          </div>
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            Comment <span className="bg-gradient-to-r from-green-600 to-orange-500 bg-clip-text text-transparent">ça marche</span> ?
          </h2>
          <div className="h-1 w-32 bg-gradient-to-r from-green-500 to-orange-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Découvrez comment améliorer votre service client en 4 étapes simples
          </p>
        </div>

        {/* Types d'utilisateurs */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 px-4 sm:px-0">
          {userTypes.map((type, index) => {
            const Icon = type.icon;
            const colors = ['from-green-600 to-green-700', 'from-orange-500 to-orange-600', 'from-green-500 to-green-600'];
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${colors[index]} flex items-center justify-center text-white mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {type.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {type.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Étapes principales */}
        <div className="relative max-w-6xl mx-auto">
          {/* Ligne de connexion pour desktop */}
          <div className="hidden lg:block absolute top-20 left-0 right-0 h-1 bg-gradient-to-r from-green-600/30 via-orange-500/30 to-green-600/30 rounded-full"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;
              
              return (
                <div 
                  key={index}
                  className={`p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer relative ${
                    isActive 
                      ? 'bg-white shadow-xl border-t-4 border-green-600' 
                      : 'bg-gray-50 hover:shadow-md hover:bg-white'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Numéro de l'étape */}
                  <div className={`absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-semibold text-sm shadow-lg`}>
                    {step.number}
                  </div>
                  
                  {/* Icône */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Contenu */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{step.description}</p>
                  
                  {/* Indicateur d'expansion */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Cliquer pour détails</span>
                    <ArrowRight className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                      isActive ? 'rotate-90 text-green-600' : 'group-hover:translate-x-1 group-hover:text-green-600'
                    }`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Détails de l'étape active */}
          {steps[activeStep] && (
            <div className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200">
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${steps[activeStep]?.color || 'from-gray-400 to-gray-500'} flex items-center justify-center mr-4`}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">
                    Étape {steps[activeStep]?.number || ''}: {steps[activeStep]?.title || ''}
                  </h4>
                  <p className="text-gray-700">Détails de mise en œuvre</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {steps[activeStep]?.details?.map((detail, i) => (
                  <div key={i} className="flex items-start space-x-3 bg-white rounded-lg p-4 shadow-sm">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${steps[activeStep]?.color || 'from-gray-400 to-gray-500'} mt-2 flex-shrink-0`}></div>
                    <p className="text-gray-700 leading-relaxed">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Bouton d'essai gratuit */}
        <div className="mt-20 text-center">
          <button className="bg-gradient-to-r from-green-600 to-orange-500 text-white font-semibold px-12 py-4 rounded-xl hover:opacity-90 transition-opacity duration-200 shadow-lg">
            Essai gratuit
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;