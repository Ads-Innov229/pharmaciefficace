/**
 * CustomerSurveyForm.tsx
 * 
 * Composant de formulaire d'évaluation client pour les pharmacies
 * Permet aux clients de noter leur expérience et de fournir des commentaires
 * sur différents aspects du service de la pharmacie.
 * 
 * Fonctionnalités principales :
 * - Sélection de la pharmacie évaluée
 * - Réponses à des questions fermées et ouvertes
 * - Notation par étoiles
 * - Soumission des réponses
 */

import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Building2,
  AlertCircle,
  Star,
  MessageSquare,
  User,
  Shield,
  MapPin,
  Loader2
} from 'lucide-react';

/**
 * Interface décrivant une pharmacie
 */
interface Pharmacy {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
}

/**
 * Types pour les questions et réponses du sondage
 */

/**
 * Interface décrivant une option de réponse
 */
interface Option {
  id: number;           // Identifiant unique de l'option
  optiontype_id: number; // Type d'option
  libelle: string;      // Texte de l'option
  ordre: number;        // Ordre d'affichage
  poids: number | null; // Poids pour le calcul des scores
}

/**
 * Interface décrivant une question du sondage
 */
interface Question {
  id: number;                  // Identifiant unique de la question
  sondage_id: number | null;   // ID du sondage parent
  optiontype_id: number | null; // Type de question
  libelle: string;             // Texte de la question
  type: 'fermee' | 'ouverte';  // Type de réponse (fermée/ouverte)
  est_question_profil: number; // Si c'est une question de profil
  target_group: string | null; // Groupe cible
  est_conditionnelle: number;  // Si la question est conditionnelle
  question_parent: number | null; // ID de la question parente si conditionnelle
  options: Option[];           // Options de réponse
}

/**
 * Interface décrivant une réponse à une question
 */
interface Answer {
  questionId: number;       // ID de la question
  optionId?: number;        // ID de l'option sélectionnée (si applicable)
  value: string | number;   // Valeur de la réponse
  poids: number | null;     // Poids pour le calcul des scores
}

/**
 * Interface décrivant les propriétés du composant
 */
interface ClientSurveyFormProps {
  /** Fonction appelée lors de la soumission du formulaire */
  onSubmit: (data: any) => void;
  
  /** Fonction appelée lors du retour en arrière */
  onBack: () => void;
}

// Mock data for pharmacies
const availablePharmacies: Pharmacy[] = [
  { 
    id: '1', 
    name: 'Pharmacie Centrale', 
    location: '123 Rue Principale, Cotonou',
    rating: 4.8,
    image: 'https://images.pexels.com/photos/48603/pharmacy-cure-tablets-pharmacy-48603.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '2', 
    name: 'Pharmacie du Centre', 
    location: '456 Avenue Centrale, Porto-Novo',
    rating: 4.6,
    image: 'https://images.pexels.com/photos/4047184/pexels-photo-4047184.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  { 
    id: '3', 
    name: 'Pharmacie des Fleurs', 
    location: '789 Boulevard des Fleurs, Parakou',
    rating: 4.7,
    image: 'https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
];

// Survey questions configuration - CORRECTED SYNTAX
const surveyQuestions: Question[] = [
  {
    id: 1,
    sondage_id: 1,
    optiontype_id: 7,
    libelle: "Quel est votre genre ?",
    type: "fermee",
    est_question_profil: 1,
    target_group: "tous",
    est_conditionnelle: 0,
    question_parent: null,
    options: [
      { id: 28, optiontype_id: 7, libelle: "Homme", ordre: 1, poids: 0 },
      { id: 29, optiontype_id: 7, libelle: "Femme", ordre: 2, poids: 0 }
    ]
  },
  {
    id: 2,
    sondage_id: 1,
    optiontype_id: 8,
    libelle: "Quel est votre tranche d'âge ?",
    type: "fermee",
    est_question_profil: 1,
    target_group: "tous",
    est_conditionnelle: 0,
    question_parent: null,
    options: [
      { id: 30, optiontype_id: 8, libelle: "Moins de 18 ans", ordre: 1, poids: 1 },
      { id: 31, optiontype_id: 8, libelle: "18–25 ans", ordre: 2, poids: 2 },
      { id: 32, optiontype_id: 8, libelle: "26–35 ans", ordre: 3, poids: 3 },
      { id: 33, optiontype_id: 8, libelle: "36–50 ans", ordre: 4, poids: 4 },
      { id: 34, optiontype_id: 8, libelle: "Plus de 50 ans", ordre: 5, poids: 5 }
    ]
  },
  {
    id: 3,
    sondage_id: 1,
    optiontype_id: 10,
    libelle: "À quelle fréquence visitez-vous cette pharmacie ?",
    type: "fermee",
    est_question_profil: 1,
    target_group: "clients",
    est_conditionnelle: 0,
    question_parent: null,
    options: [
      { id: 45, optiontype_id: 10, libelle: "Première visite", ordre: 1, poids: 1 },
      { id: 46, optiontype_id: 10, libelle: "Occasionnellement", ordre: 2, poids: 2 },
      { id: 47, optiontype_id: 10, libelle: "Régulièrement", ordre: 3, poids: 3 },
      { id: 48, optiontype_id: 10, libelle: "Très souvent", ordre: 4, poids: 4 }
    ]
  },
  {
    id: 4,
    sondage_id: 1,
    optiontype_id: 2,
    libelle: "Comment évaluez-vous la qualité de l'accueil reçu ?",
    type: "fermee",
    est_question_profil: 0,
    target_group: null,
    est_conditionnelle: 0,
    question_parent: null,
    options: [
      { id: 7, optiontype_id: 2, libelle: "Excellent", ordre: 1, poids: 5 },
      { id: 6, optiontype_id: 2, libelle: "Très bien", ordre: 2, poids: 4 },
      { id: 5, optiontype_id: 2, libelle: "Bien", ordre: 3, poids: 3 },
      { id: 4, optiontype_id: 2, libelle: "Moyen", ordre: 4, poids: 2 },
      { id: 3, optiontype_id: 2, libelle: "Insuffisant", ordre: 5, poids: 1 }
    ]
  },
  {
    id: 5,
    sondage_id: 1,
    optiontype_id: 2,
    libelle: "Êtes-vous satisfait du temps d'attente ?",
    type: "fermee",
    est_question_profil: 0,
    target_group: null,
    est_conditionnelle: 0,
    question_parent: null,
    options: [
      { id: 7, optiontype_id: 2, libelle: "Excellent", ordre: 1, poids: 5 },
      { id: 6, optiontype_id: 2, libelle: "Très bien", ordre: 2, poids: 4 },
      { id: 5, optiontype_id: 2, libelle: "Bien", ordre: 3, poids: 3 },
      { id: 4, optiontype_id: 2, libelle: "Moyen", ordre: 4, poids: 2 },
      { id: 3, optiontype_id: 2, libelle: "Insuffisant", ordre: 5, poids: 1 }
    ]
  },
  {
    id: 6,
    sondage_id: 1,
    optiontype_id: 2,
    libelle: "Les conseils pharmaceutiques étaient-ils pertinents ?",
    type: "fermee",
    est_question_profil: 0,
    target_group: null,
    est_conditionnelle: 0,
    question_parent: null,
    options: [
      { id: 7, optiontype_id: 2, libelle: "Excellent", ordre: 1, poids: 5 },
      { id: 6, optiontype_id: 2, libelle: "Très bien", ordre: 2, poids: 4 },
      { id: 5, optiontype_id: 2, libelle: "Bien", ordre: 3, poids: 3 },
      { id: 4, optiontype_id: 2, libelle: "Moyen", ordre: 4, poids: 2 },
      { id: 3, optiontype_id: 2, libelle: "Insuffisant", ordre: 5, poids: 1 }
    ]
  },
  {
    id: 8,
    sondage_id: 1,
    optiontype_id: 2,
    libelle: "Comment jugez-vous la propreté des locaux ?",
    type: "fermee",
    est_question_profil: 0,
    target_group: null,
    est_conditionnelle: 0,
    question_parent: null,
    options: [
      { id: 7, optiontype_id: 2, libelle: "Excellent", ordre: 1, poids: 5 },
      { id: 6, optiontype_id: 2, libelle: "Très bien", ordre: 2, poids: 4 },
      { id: 5, optiontype_id: 2, libelle: "Bien", ordre: 3, poids: 3 },
      { id: 4, optiontype_id: 2, libelle: "Moyen", ordre: 4, poids: 2 },
      { id: 3, optiontype_id: 2, libelle: "Insuffisant", ordre: 5, poids: 1 }
    ]
  },
  {
    id: 9,
    sondage_id: 1,
    optiontype_id: 2,
    libelle: "Les prix pratiqués vous semblent-ils corrects ?",
    type: "fermee",
    est_question_profil: 0,
    target_group: null,
    est_conditionnelle: 0,
    question_parent: null,
    options: [
      { id: 7, optiontype_id: 2, libelle: "Excellent", ordre: 1, poids: 5 },
      { id: 6, optiontype_id: 2, libelle: "Très bien", ordre: 2, poids: 4 },
      { id: 5, optiontype_id: 2, libelle: "Bien", ordre: 3, poids: 3 },
      { id: 4, optiontype_id: 2, libelle: "Moyen", ordre: 4, poids: 2 },
      { id: 3, optiontype_id: 2, libelle: "Insuffisant", ordre: 5, poids: 1 }
    ]
  },
  {
    id: 10,
    sondage_id: 1,
    optiontype_id: 1,
    libelle: "Recommanderiez-vous cette pharmacie à vos proches ?",
    type: "fermee",
    est_question_profil: 0,
    target_group: null,
    est_conditionnelle: 0,
    question_parent: null,
    options: [
      { id: 1, optiontype_id: 1, libelle: "Oui", ordre: 1, poids: 5 },
      { id: 2, optiontype_id: 1, libelle: "Non", ordre: 2, poids: 1 }
    ]
  },
  {
    id: 11,
    sondage_id: 1,
    optiontype_id: null,
    libelle: "Commentaires ou suggestions pour améliorer le service :",
    type: "ouverte",
    est_question_profil: 0,
    target_group: null,
    est_conditionnelle: 0,
    question_parent: null,
    options: []
  }
];

/**
 * Composant de formulaire d'évaluation client
 * Gère l'affichage des questions, la collecte des réponses et la soumission
 */
const ClientSurveyForm: React.FC<ClientSurveyFormProps> = ({ onSubmit, onBack }) => {
  // État du formulaire
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0); // Index de la question actuelle
  const [answers, setAnswers] = useState<Answer[]>([]); // Réponses fournies par l'utilisateur
  const [isCompleted, setIsCompleted] = useState<boolean>(false); // Si le formulaire est soumis
  
  // État de sélection de la pharmacie
  const [showPharmacySelection, setShowPharmacySelection] = useState<boolean>(true); // Gestion de la sélection d'une pharmacie
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>(''); // ID de la pharmacie sélectionnée

  // État de soumission
  const [dailySubmissions, setDailySubmissions] = useState<number>(0); // Nombre de soumissions quotidiennes
  const [startTime] = useState<number>(Date.now());

  useEffect(() => {
    // Simulation du localStorage pour les soumissions quotidiennes
    const today = new Date().toDateString();
    const stored = sessionStorage.getItem(`client_submissions_${today}`);
    const submissions = stored ? parseInt(stored, 10) : 0;
    setDailySubmissions(submissions);
  }, []);

  const getCurrentQuestion = (): Question | undefined => {
    return surveyQuestions[currentQuestionIndex];
  };

  /**
   * Récupère la réponse actuelle pour la question en cours
   * @returns La réponse actuelle ou undefined si aucune réponse
   */
  const getCurrentAnswer = (): Answer | undefined => {
    const currentQuestion = getCurrentQuestion();
    return currentQuestion ? answers.find(a => a.questionId === currentQuestion.id) : undefined;
  };

  // Fonction pour vérifier si on peut passer à la question suivante
  const canProceed = (): boolean => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return false;
    
    // Si la question n'est pas obligatoire, on peut passer à la suivante
    if (currentQuestion.est_question_profil !== 1) return true;
    
    // Vérifie si une réponse a été fournie
    const answer = getCurrentAnswer();
    return answer !== undefined && answer.value !== '';
  };

  /**
   * Gère la sélection d'une pharmacie
   * @param pharmacyId - ID de la pharmacie sélectionnée
   */
  const handlePharmacySelect = (pharmacyId: string): void => {
    setSelectedPharmacy(pharmacyId);
    setShowPharmacySelection(false);
  };

  /**
   * Soumet le formulaire d'évaluation
   */
  const submitSurvey = async (): Promise<void> => {
    if (dailySubmissions >= 2) {
      return;
    }

    const completionTime = (Date.now() - startTime) / 1000;
    
    const surveyData = {
      sondage_type: 'client',
      pharmacyId: selectedPharmacy,
      answers,
      completionTime,
      timestamp: new Date().toISOString()
    };

    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Données du sondage client:', surveyData);
      
      const today = new Date().toDateString();
      const newCount = dailySubmissions + 1;
      sessionStorage.setItem(`client_submissions_${today}`, newCount.toString());
      setDailySubmissions(newCount);
      
      setIsCompleted(true);
      
      // Appel du callback
      if (onSubmit) {
        onSubmit(surveyData);
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    }
  };

  const nextQuestion = (): void => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      submitSurvey();
    }
  };

  /**
   * Reviens à la question précédente
   */
  const prevQuestion = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  /**
   * Gère la sélection d'une réponse
   * @param questionId - ID de la question
   * @param optionId - ID de l'option sélectionnée (pour les questions à choix multiples)
   * @param value - Valeur de la réponse (pour les champs texte ouverts)
   * @param poids - Poids de la réponse pour le calcul des scores
   */
  const handleAnswer = (questionId: number, optionId: number, value?: string | number, poids: number | null = null) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      const answerValue = value !== undefined ? value : optionId;
      
      if (existingAnswerIndex >= 0) {
        // Mise à jour d'une réponse existante
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { 
          questionId, 
          optionId, 
          value: answerValue as string | number,
          poids
        };
        return newAnswers;
      } else {
        // Ajout d'une nouvelle réponse
        return [...prev, { 
          questionId, 
          optionId, 
          value: answerValue as string | number,
          poids
        }];
      }
    });
  };

  /**
   * Gère la réponse à une question ouverte
   * @param value - Valeur de la réponse
   */
  const handleTextAnswer = (value: string): void => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;
    
    setAnswers(prevAnswers => [
      ...prevAnswers.filter(a => a.questionId !== currentQuestion.id),
      { 
        questionId: currentQuestion.id, 
        value,
        poids: null
      }
    ]);
  };

  const getQuestionCategory = (question: Question): { label: string; color: string; icon: React.ReactNode } => {
    if (question.est_question_profil === 1) {
      return {
        label: '👤 Profil',
        color: 'bg-blue-100 text-blue-700 border-blue-200',
        icon: <User className="w-4 h-4" />
      };
    }
    switch (question.optiontype_id) {
      case 1: 
        return {
          label: '✓ Oui/Non',
          color: 'bg-green-100 text-green-700 border-green-200',
          icon: <CheckCircle className="w-4 h-4" />
        };
      case 2: 
        return {
          label: '⭐ Évaluation',
          color: 'bg-orange-100 text-orange-700 border-orange-200',
          icon: <Star className="w-4 h-4" />
        };
      default: 
        return {
          label: '💬 Question',
          color: 'bg-purple-100 text-purple-700 border-purple-200',
          icon: <MessageSquare className="w-4 h-4" />
        };
    }
  };

  // Composant Button simplifié
  const Button: React.FC<{
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'outline' | 'ghost' | 'success' | 'destructive';
    size?: 'sm' | 'md' | 'lg';
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    loading?: boolean;
    className?: string;
  }> = ({ 
    children, 
    onClick, 
    disabled, 
    variant = 'primary', 
    size = 'md', 
    leftIcon, 
    rightIcon, 
    loading, 
    className = '' 
  }) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantClasses = {
      primary: 'bg-orange-500 text-white hover:bg-orange-600 focus:ring-orange-500 disabled:bg-gray-300',
      outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500 disabled:opacity-50',
      ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500 disabled:opacity-50',
      success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 disabled:bg-gray-300',
      destructive: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-gray-300'
    };
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base'
    };

    return (
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      >
        {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {leftIcon && !loading && <span className="mr-2">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    );
  };

  // Composant Card simplifié
  const Card: React.FC<{
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'elevated';
    hoverable?: boolean;
    interactive?: boolean;
    onClick?: () => void;
  }> = ({ children, className = '', variant = 'default', hoverable, interactive, onClick }) => {
    const baseClasses = 'bg-white rounded-xl border';
    const variantClasses = variant === 'elevated' ? 'shadow-lg border-gray-200' : 'border-gray-200';
    const hoverClasses = hoverable ? 'hover:shadow-md transition-shadow duration-200' : '';
    const interactiveClasses = interactive ? 'cursor-pointer hover:shadow-lg transition-all duration-200' : '';

    return (
      <div 
        className={`${baseClasses} ${variantClasses} ${hoverClasses} ${interactiveClasses} ${className}`}
        onClick={onClick}
      >
        {children}
      </div>
    );
  };

  const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
    return <div className={`p-6 ${className}`}>{children}</div>;
  };

  // Composants de questions
  const TextComponent = (): JSX.Element => {
    const currentAnswer = getCurrentAnswer();
    
    return (
      <div className="space-y-4">
        <textarea
          value={currentAnswer?.value as string || ''}
          onChange={(e) => handleTextAnswer(e.target.value)}
          placeholder="Partagez vos commentaires de manière anonyme..."
          className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl resize-none 
                   focus:ring-2 focus:ring-orange-500 focus:border-orange-500 
                   focus:outline-none transition-all duration-200"
          aria-label="Zone de commentaires"
        />
        <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          <Shield className="w-4 h-4 mr-2 text-green-600" />
          <span>Votre avis nous aide à améliorer nos services de manière anonyme.</span>
        </div>
      </div>
    );
  };

  const RatingComponent = (): JSX.Element => {
    const currentAnswer = getCurrentAnswer();
    const currentQuestion = getCurrentQuestion();
    
    if (!currentQuestion) return <div>Erreur: Question non trouvée</div>;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(currentQuestion.id, option.id, option.libelle, option.poids)}
              className={`p-4 rounded-xl text-left transition-all duration-300 border-2 ${
                currentAnswer?.optionId === option.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg border-orange-600 transform scale-[1.02]'
                  : 'bg-white hover:bg-orange-50 text-gray-800 border-gray-200 hover:border-orange-400 hover:shadow-md'
              }`}
              type="button"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-base">{option.libelle}</span>
                <div className="flex items-center gap-2">
                  {currentQuestion.optiontype_id === 2 && (
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < (6 - option.ordre) 
                              ? currentAnswer?.optionId === option.id 
                                ? 'text-yellow-300 fill-current' 
                                : 'text-yellow-400 fill-current'
                              : currentAnswer?.optionId === option.id
                                ? 'text-white/40'
                                : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {currentAnswer?.optionId === option.id && (
                    <CheckCircle className="w-5 h-5" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  const YesNoComponent = (): JSX.Element => {
    const currentAnswer = getCurrentAnswer();
    const currentQuestion = getCurrentQuestion();
    
    if (!currentQuestion) return <div>Erreur: Question non trouvée</div>;
    
    return (
      <div className="flex justify-center space-x-6">
        {currentQuestion.options.map((option) => (
          <Button
            key={option.id}
            onClick={() => handleAnswer(currentQuestion.id, option.id, option.libelle, option.poids)}
            variant={
              currentAnswer?.optionId === option.id
                ? option.libelle === 'Oui' 
                  ? 'success'
                  : 'destructive'
                : 'outline'
            }
            size="lg"
            className="min-w-[140px]"
            rightIcon={currentAnswer?.optionId === option.id ? <CheckCircle className="w-5 h-5" /> : undefined}
          >
            {option.libelle}
          </Button>
        ))}
      </div>
    );
  };

  const currentQuestion = getCurrentQuestion();

  // Gestion des états d'erreur et limite
  if (dailySubmissions >= 2 && !isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto">
          <CardContent>
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Limite quotidienne atteinte
              </h2>
              <p className="text-gray-600 mb-6">
                Vous avez atteint le nombre maximum de soumissions pour aujourd'hui.
              </p>
              
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center text-green-700 mb-2">
                  <Shield className="w-5 h-5 mr-2" />
                  <span className="font-semibold">Évaluation envoyée avec succès</span>
                </div>
                <p className="text-sm text-green-600">
                  Votre feedback a été transmis de manière totalement anonyme à la pharmacie.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setShowPharmacySelection(true);
                    setCurrentQuestionIndex(0);
                    setAnswers([]);
                    setIsCompleted(false);
                    setSelectedPharmacy('');
                  }}
                  variant="primary"
                >
                  Évaluer une autre pharmacie
                </Button>
                <Button onClick={onBack} variant="outline">
                  Retour à l'accueil
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Pharmacy selection view
  if (showPharmacySelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-6xl w-full mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              <Button
                variant="ghost"
                onClick={onBack}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className="mb-6"
              >
                Retour
              </Button>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building2 className="w-8 h-8 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Sélectionnez votre pharmacie
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Choisissez la pharmacie que vous souhaitez évaluer. Votre avis nous aide à améliorer nos services.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {availablePharmacies.map((pharmacy) => (
                  <Card 
                    key={pharmacy.id}
                    className={`p-0 overflow-hidden transition-all duration-300 ${
                      selectedPharmacy === pharmacy.id 
                        ? 'ring-2 ring-orange-500 shadow-lg' 
                        : 'hover:shadow-md hover:-translate-y-1'
                    }`}
                    onClick={() => handlePharmacySelect(pharmacy.id)}
                  >
                    <div className="h-40 bg-gray-100 overflow-hidden">
                      <img 
                        src={pharmacy.image} 
                        alt={pharmacy.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{pharmacy.name}</h3>
                          <p className="text-gray-600 text-sm mt-1">{pharmacy.location}</p>
                        </div>
                        <div className="flex items-center bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          {pharmacy.rating}
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">À 5 min à pied</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <Button
                  onClick={() => setShowPharmacySelection(false)}
                  disabled={!selectedPharmacy}
                  variant="primary"
                  size="lg"
                  className="min-w-[200px]"
                >
                  Continuer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main survey form
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Progress bar */}
        <div className="h-2 bg-gray-100">
          <div 
            className="h-full bg-orange-500 transition-all duration-500"
            style={{
              width: `${((currentQuestionIndex + 1) / surveyQuestions.length) * 100}%`
            }}
          ></div>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="ghost"
              onClick={onBack}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="text-gray-600 hover:text-orange-600"
            >
              Retour
            </Button>
            
            <div className="text-sm text-gray-500">
              Question {currentQuestionIndex + 1} sur {surveyQuestions.length}
            </div>
          </div>

          {currentQuestion && (
            <>
              <div className="mb-6">
                {(() => {
                  const { label, color, icon } = getQuestionCategory(currentQuestion);
                  return (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${color}`}>
                      {icon}
                      <span className="ml-1.5">{label}</span>
                    </span>
                  );
                })()}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-8 leading-relaxed">
                {currentQuestion.libelle}
              </h2>

              <div className="mb-10">
                {currentQuestion.type === 'fermee' && currentQuestion.optiontype_id === 1 && <YesNoComponent />}
                {currentQuestion.type === 'fermee' && currentQuestion.optiontype_id !== 1 && <RatingComponent />}
                {currentQuestion.type === 'ouverte' && <TextComponent />}
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                <Button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  variant="outline"
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                  className={currentQuestionIndex === 0 ? 'opacity-50' : ''}
                >
                  Précédent
                </Button>

                <Button
                  onClick={nextQuestion}
                  disabled={!canProceed()}
                  variant="primary"
                  rightIcon={
                    currentQuestionIndex === surveyQuestions.length - 1 ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4" />
                    )
                  }
                  className="min-w-[140px]"
                >
                  {currentQuestionIndex === surveyQuestions.length - 1 ? 'Terminer' : 'Suivant'}
                </Button>
              </div>
            </>
          )}

          <div className="mt-8 text-center text-sm text-gray-500 flex items-center justify-center">
            <Shield className="w-4 h-4 mr-2 text-green-500" />
            <span>Vos réponses sont anonymes et confidentielles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientSurveyForm;