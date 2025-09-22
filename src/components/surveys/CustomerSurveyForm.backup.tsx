import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Building2,
  AlertCircle,
  Star,
  Clock
} from 'lucide-react';

interface Option {
  id: number;
  optiontype_id: number;
  libelle: string;
  ordre: number;
  poids: number;
}

interface Question {
  id: number;
  sondage_id: number | null;
  optiontype_id: number | null;
  libelle: string;
  type: 'fermee' | 'ouverte';
  est_question_profil: number;
  target_group: string | null;
  est_conditionnelle: number;
  question_parent: number | null;
  options: Option[];
}

interface Answer {
  questionId: number;
  optionId?: number | undefined;
  value: string | number;
  poids: number | null;
}

interface SurveySubmissionResult {
  success: boolean;
  answers: Answer[];
}

interface ClientSurveyFormProps {
  onSubmit: (data: SurveySubmissionResult) => void;
  onBack: () => void;
}

const ClientSurveyForm: React.FC<ClientSurveyFormProps> = ({ onSubmit, onBack }): JSX.Element => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [selectedPharmacy, setSelectedPharmacy] = useState<string>('');
  const [showPharmacySelection, setShowPharmacySelection] = useState<boolean>(true);
  const [dailySubmissions, setDailySubmissions] = useState<number>(0);
  const [startTime] = useState<number>(Date.now());

  // Structure des questions basée sur votre modèle de données
  const surveyQuestions: Question[] = [
    // Questions de profil
    {
      id: 1,
      sondage_id: 1, // Sondage Client
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
        { id: 30, optiontype_id: 8, libelle: "Moins de 18", ordre: 1, poids: 1 },
        { id: 31, optiontype_id: 8, libelle: "18–25", ordre: 2, poids: 2 },
        { id: 32, optiontype_id: 8, libelle: "26–35", ordre: 3, poids: 3 },
        { id: 33, optiontype_id: 8, libelle: "36–50", ordre: 4, poids: 4 },
        { id: 34, optiontype_id: 8, libelle: "Plus de 50", ordre: 5, poids: 5 }
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
    // Questions d'évaluation
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
        { id: 7, optiontype_id: 2, libelle: "Très bon(ne)", ordre: 1, poids: 5 },
        { id: 6, optiontype_id: 2, libelle: "Bon(ne)", ordre: 2, poids: 4 },
        { id: 5, optiontype_id: 2, libelle: "Moyen(ne)", ordre: 3, poids: 3 },
        { id: 4, optiontype_id: 2, libelle: "Mauvais(e)", ordre: 4, poids: 2 },
        { id: 3, optiontype_id: 2, libelle: "Très mauvais(e)", ordre: 5, poids: 1 }
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
        { id: 7, optiontype_id: 2, libelle: "Très bon(ne)", ordre: 1, poids: 5 },
        { id: 6, optiontype_id: 2, libelle: "Bon(ne)", ordre: 2, poids: 4 },
        { id: 5, optiontype_id: 2, libelle: "Moyen(ne)", ordre: 3, poids: 3 },
        { id: 4, optiontype_id: 2, libelle: "Mauvais(e)", ordre: 4, poids: 2 },
        { id: 3, optiontype_id: 2, libelle: "Très mauvais(e)", ordre: 5, poids: 1 }
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
        { id: 7, optiontype_id: 2, libelle: "Très bon(ne)", ordre: 1, poids: 5 },
        { id: 6, optiontype_id: 2, libelle: "Bon(ne)", ordre: 2, poids: 4 },
        { id: 5, optiontype_id: 2, libelle: "Moyen(ne)", ordre: 3, poids: 3 },
        { id: 4, optiontype_id: 2, libelle: "Mauvais(e)", ordre: 4, poids: 2 },
        { id: 3, optiontype_id: 2, libelle: "Très mauvais(e)", ordre: 5, poids: 1 }
      ]
    },
    {
      id: 7,
      sondage_id: 1,
      optiontype_id: 1,
      libelle: "Les médicaments recherchés étaient-ils disponibles ?",
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
        { id: 7, optiontype_id: 2, libelle: "Très bon(ne)", ordre: 1, poids: 5 },
        { id: 6, optiontype_id: 2, libelle: "Bon(ne)", ordre: 2, poids: 4 },
        { id: 5, optiontype_id: 2, libelle: "Moyen(ne)", ordre: 3, poids: 3 },
        { id: 4, optiontype_id: 2, libelle: "Mauvais(e)", ordre: 4, poids: 2 },
        { id: 3, optiontype_id: 2, libelle: "Très mauvais(e)", ordre: 5, poids: 1 }
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
        { id: 7, optiontype_id: 2, libelle: "Très bon(ne)", ordre: 1, poids: 5 },
        { id: 6, optiontype_id: 2, libelle: "Bon(ne)", ordre: 2, poids: 4 },
        { id: 5, optiontype_id: 2, libelle: "Moyen(ne)", ordre: 3, poids: 3 },
        { id: 4, optiontype_id: 2, libelle: "Mauvais(e)", ordre: 4, poids: 2 },
        { id: 3, optiontype_id: 2, libelle: "Très mauvais(e)", ordre: 5, poids: 1 }
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

  // Mock data for available pharmacies
  const availablePharmacies = [
    { id: '1', name: 'Pharmacie Centrale', location: '123 Rue Principale' },
    { id: '2', name: 'Pharmacie du Centre', location: '456 Avenue Centrale' },
    { id: '3', name: 'Pharmacie des Fleurs', location: '789 Boulevard des Fleurs' },
  ];

  // Initialize daily submissions count
  useEffect(() => {
    const today = new Date().toDateString();
    const submissions = parseInt(localStorage.getItem(`client_submissions_${today}`) || '0', 10);
    setDailySubmissions(submissions);
  }, []);

  // Get current question
  const getCurrentQuestion = (): Question | undefined => {
    return surveyQuestions[currentQuestionIndex];
  };

  // Get current answer for the current question
  const getCurrentAnswer = (): Answer | undefined => {
    const currentQuestion = getCurrentQuestion();
    return currentQuestion ? answers.find(a => a.questionId === currentQuestion.id) : undefined;
  };

  // Check if user can proceed to next question
  const canProceed = (): boolean => {
    const answer = getCurrentAnswer();
    const question = getCurrentQuestion();
    return question?.type === 'ouverte' ? true : answer !== undefined;
  };

  // Handle pharmacy selection
  const handlePharmacySelect = (pharmacyId: string): void => {
    setSelectedPharmacy(pharmacyId);
    setShowPharmacySelection(false);
  };

  // Submit survey data to the server
  const submitSurvey = async (): Promise<boolean> => {
    if (dailySubmissions >= 2) {
      alert('Vous avez déjà soumis 2 avis aujourd\'hui. Merci de revenir demain !');
      return false;
    }

    try {
      const completionTime = (Date.now() - startTime) / 1000;
      
      const surveyData = {
        sondage_type: 'client',
        pharmacyId: selectedPharmacy,
        answers,
        completionTime,
        timestamp: new Date().toISOString()
      };

      console.log('Données du sondage client:', surveyData);
      
      // Simuler un appel API asynchrone
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Incrémenter le compteur quotidien
      const today = new Date().toDateString();
      const newCount = dailySubmissions + 1;
      localStorage.setItem(`client_submissions_${today}`, newCount.toString());
      setDailySubmissions(newCount);
      
      setIsCompleted(true);
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      alert('Une erreur s\'est produite. Veuillez réessayer.');
      return false;
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const success = await submitSurvey();
    if (success) {
      onSubmit({ success: true, answers });
      setIsCompleted(true);
    }
  };

  // Navigation functions
  const nextQuestion = async (): Promise<void> => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Gérer la soumission du formulaire
      const success = await submitSurvey();
      if (success) {
        onSubmit({ success: true, answers });
        setIsCompleted(true);
      }
    }
  };

  const prevQuestion = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Handle answer selection
  const handleAnswer = (optionId: number, value: string | number, poids: number | null = null): void => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;
    
    const newAnswers = answers.filter((a: Answer) => a.questionId !== currentQuestion.id);
    newAnswers.push({ 
      questionId: currentQuestion.id, 
      optionId, 
      value, 
      poids: poids !== undefined ? poids : null
    });
    setAnswers(newAnswers);
  };

  // Handle text answer
  const handleTextAnswer = (value: string): void => {
    const currentQuestion = getCurrentQuestion();
    if (!currentQuestion) return;
    
    const newAnswers = answers.filter(a => a.questionId !== currentQuestion.id);
    newAnswers.push({ 
      questionId: currentQuestion.id, 
      value,
      optionId: undefined,
      poids: null
    });
    setAnswers(newAnswers);
  };

  // Get question category for display
  const getQuestionCategory = (question: Question): string => {
    if (question.est_question_profil === 1) {
      return 'Profil';
    }
    switch (question.optiontype_id) {
      case 1: return 'Oui/Non';
      case 2: return 'Évaluation';
      default: return 'Question';
    }
  };

  // Render back button component
  const renderBackButton = (): JSX.Element => (
    <button 
      onClick={onBack}
      className="mb-4 flex items-center text-blue-600 hover:text-blue-800"
      type="button"
    >
      <ArrowLeft className="w-5 h-5 mr-1" /> Retour
    </button>
  );

  // Text Component for open questions
  const TextComponent = (): JSX.Element => {
    const currentAnswer = getCurrentAnswer();
    
    return (
      <div className="space-y-4">
        <textarea
          value={currentAnswer?.value as string || ''}
          onChange={(e) => handleTextAnswer(e.target.value)}
          placeholder="Partagez vos commentaires de manière anonyme..."
          className="w-full h-32 p-4 border-2 border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none"
          aria-label="Zone de commentaires"
        />
        <div className="flex items-center text-sm text-gray-500">
          <span>Votre avis nous aide à améliorer nos services.</span>
        </div>
      </div>
    );
  };

  // Rating Component for evaluation questions
  const RatingComponent = (): JSX.Element => {
    const currentAnswer = getCurrentAnswer();
    const currentQuestion = getCurrentQuestion();
    
    if (!currentQuestion) return <div>Erreur: Question non trouvée</div>;
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswer(option.id, option.libelle, option.poids)}
              className={`p-4 rounded-xl text-left transition-all duration-200 ${
                currentAnswer?.optionId === option.id
                  ? 'bg-orange-600 text-white shadow-lg'
                  : 'bg-white hover:bg-orange-50 text-gray-800 border-2 border-gray-200 hover:border-orange-400'
              }`}
              aria-pressed={currentAnswer?.optionId === option.id}
              type="button"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option.libelle}</span>
                <div className="flex items-center">
                  {/* Affichage des étoiles pour les questions d'évaluation */}
                  {currentQuestion.optiontype_id === 2 && (
                    <div className="flex ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < (6 - option.ordre) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {currentAnswer?.optionId === option.id && (
                    <CheckCircle className="w-5 h-5 ml-2" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Yes/No Component for binary questions
  const YesNoComponent = (): JSX.Element => {
    const currentAnswer = getCurrentAnswer();
    const currentQuestion = getCurrentQuestion();
    
    if (!currentQuestion) return <div>Erreur: Question non trouvée</div>;
    
    return (
      <div className="flex justify-center space-x-6">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option.id, option.libelle, option.poids)}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-200 min-w-[120px] border-2 ${
              currentAnswer?.optionId === option.id
                ? option.libelle === 'Oui' 
                  ? 'bg-green-600 text-white shadow-lg border-green-700'
                  : 'bg-red-600 text-white shadow-lg border-red-700'
                : 'bg-white hover:bg-gray-50 text-gray-800 border-gray-300 hover:border-gray-400'
            }`}
            aria-pressed={currentAnswer?.optionId === option.id}
            type="button"
          >
            {option.libelle}
          </button>
        ))}
      </div>
    );
  };

  // Get current question with proper type checking
  const currentQuestion = getCurrentQuestion();
  
  // Early return if no current question and not in a special state
  if ((!currentQuestion || !surveyQuestions.length) && !showPharmacySelection && !isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Question non trouvée</h2>
          <p className="text-gray-600 mb-6">Désolé, nous n'avons pas pu charger cette question.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
            type="button"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }

  // Vérification limite quotidienne
  if (dailySubmissions >= 2 && !isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Limite quotidienne atteinte
          </h2>
          <p className="text-gray-600 mb-6">
            Vous avez atteint le nombre maximum de soumissions pour aujourd'hui. Revenez demain pour continuer à participer !
          </p>
          <button
            onClick={onBack}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200"
            type="button"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  // Pharmacy selection section
  if (showPharmacySelection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
          {renderBackButton()}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sélectionnez votre pharmacie
            </h1>
            <p className="text-gray-600">
              Choisissez la pharmacie que vous souhaitez évaluer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availablePharmacies.map((pharmacy) => (
              <button
                key={pharmacy.id}
                type="button"
                onClick={() => handlePharmacySelect(pharmacy.id)}
                className="p-6 bg-white hover:bg-green-50 rounded-xl text-left transition-all duration-200 border-2 border-gray-200 hover:border-green-400 group shadow-sm hover:shadow-md"
                aria-label={`Sélectionner ${pharmacy.name}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-700">
                    {pharmacy.name}
                  </h3>
                  <ArrowRight 
                    className="w-5 h-5 text-gray-400 group-hover:text-green-500 transition-colors duration-200"
                    aria-hidden="true"
                  />
                </div>
                <p className="text-sm text-gray-500">{pharmacy.location}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Completion screen
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-xl text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Merci pour votre avis !
          </h2>
          <p className="text-gray-600 mb-6">
            Votre retour anonyme nous aide à améliorer la qualité des services pharmaceutiques.
          </p>
          
          <div className="bg-orange-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-orange-700">
              <strong>Rappel :</strong> Vous pouvez soumettre jusqu'à 2 avis par jour.
              <br />
              Avis soumis aujourd'hui : <strong>{dailySubmissions}/2</strong>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.location.href = '/pharmacies'}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 border-2 border-green-700 hover:border-green-800 shadow-sm"
              type="button"
            >
              Évaluer une autre pharmacie
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="flex-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold px-6 py-3 rounded-xl transition-colors duration-200 border-2 border-gray-300 hover:border-gray-400 shadow-sm"
              type="button"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main survey form
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(135deg, rgba(77, 124, 44, 0.9), rgba(90, 143, 53, 0.95))`
      }}
    >
      {/* Overlay animé */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4D7C2C]/80 via-[#5A8F35]/70 to-[#4D7C2C]/80"></div>
      
      {/* Formes décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#E57325]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* En-tête du sondage */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6 border border-white/30 font-['Roboto']">
            <span className="w-2 h-2 bg-[#4D7C2C] rounded-full mr-2 animate-pulse"></span>
            Sondage Client • Réponses anonymes
          </div>
          
          {/* Barre de progression */}
          <div className="w-full bg-white/30 rounded-full h-2.5 mb-2">
            <div
              className="bg-[#E57325] h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / surveyQuestions.length) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-white/90 mb-6">
            <span>Question {currentQuestionIndex + 1} sur {surveyQuestions.length}</span>
            <span className="font-medium">{Math.round(((currentQuestionIndex + 1) / surveyQuestions.length) * 100)}% complété</span>
          </div>
        </div>

        {/* Contenu de la question */}
        <form onSubmit={(e) => {
          e.preventDefault();
          void handleFormSubmit(e);
        }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
          {currentQuestion && (
            <>
              <div className="mb-6">
                <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium font-['Roboto'] ${
                  currentQuestion.est_question_profil === 1
                    ? 'bg-blue-100/20 text-blue-100 border border-blue-200/20'
                    : 'bg-[#E57325]/20 text-white border border-[#E57325]/30'
                }`}>
                  {getQuestionCategory(currentQuestion)}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-8 leading-relaxed font-['Poppins']">
                {currentQuestion.libelle}
              </h2>
            </>
          )}

          {currentQuestion && (
            <div className="mb-8">
              {currentQuestion.type === 'fermee' && currentQuestion.optiontype_id === 1 && <YesNoComponent />}
              {currentQuestion.type === 'fermee' && currentQuestion.optiontype_id !== 1 && <RatingComponent />}
              {currentQuestion.type === 'ouverte' && <TextComponent />}
            </div>
          )}

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
            <button
              onClick={prevQuestion}
              disabled={currentQuestionIndex === 0}
              type="button"
              className={`group flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-200 border-2 font-['Poppins'] ${
                currentQuestionIndex === 0
                  ? 'bg-white/10 text-white/50 border-white/20 cursor-not-allowed'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white/50 shadow-sm hover:shadow-lg hover:scale-[1.02]'
              }`}
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Précédent
            </button>

            <button
              onClick={() => void nextQuestion()}
              disabled={!canProceed()}
              type="button"
              className={`group relative flex-1 flex items-center justify-center px-6 py-4 rounded-xl font-semibold transition-all duration-200 border-2 font-['Poppins'] overflow-hidden ${
                canProceed()
                  ? 'bg-[#E57325] hover:bg-[#F58537] text-white border-[#E57325] hover:border-[#F58537] shadow-lg hover:shadow-[#E57325]/25 hover:scale-[1.02]'
                  : 'bg-white/10 text-white/50 border-white/20 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center">
                {currentQuestionIndex === surveyQuestions.length - 1 ? 'Envoyer le sondage' : 'Question suivante'}
                {currentQuestionIndex === surveyQuestions.length - 1 ? (
                  <CheckCircle className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                ) : (
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                )}
              </span>
              {canProceed() && (
                <div className="absolute inset-0 bg-[#F58537] rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              )}
            </button>
          </div>

          {/* Aide */}
          <div className="mt-8 flex items-center justify-center text-sm text-white/80 font-['Roboto']">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1.5" />
              Temps estimé : 4-6 minutes • Réponses 100% anonymes
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientSurveyForm;