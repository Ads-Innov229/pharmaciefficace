/**
 * StaffSurveyForm.tsx
 * 
 * Composant de formulaire d'évaluation du personnel
 * Permet aux employés de répondre à des questionnaires quotidiens ou globaux
 * avec authentification par code secret.
 * 
 * Fonctionnalités principales :
 * - Authentification par code secret
 * - Deux types de questionnaires : quotidien et global
 * - Gestion des réponses avec sauvegarde locale
 * - Navigation entre les questions
 * - Validation des réponses obligatoires
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Star, 
  Shield,
  Key,
  Eye,
  EyeOff,
  AlertCircle,
  Users,
  Calendar,
  Clock,
  Globe,
  ArrowLeft,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

/**
 * Interface décrivant les props du composant StaffSurveyForm
 */
export interface StaffSurveyFormProps {
  onSubmit?: (data: any) => void;
  onBack?: () => void;
}

/**
 * Interface décrivant la structure d'une question
 */
/**
 * Définit la structure d'une question dans le formulaire
 */
interface Question {
  id: string;                       // Identifiant unique de la question
  type: 'rating' | 'choice' | 'text' | 'yesno';  // Type de la question
  question: string;                 // Texte de la question
  options?: string[];               // Options pour les questions à choix multiples
  required: boolean;                // Si la réponse est obligatoire
  category?: string;                // Catégorie pour le regroupement visuel
}

/**
 * Structure d'une réponse fournie par l'utilisateur
 */
/**
 * Structure d'une réponse fournie par l'utilisateur
 */
interface Answer {
  questionId: string;               // ID de la question correspondante (obligatoire)
  value: number | string | boolean; // Valeur de la réponse
}

const StaffSurveyForm: React.FC<StaffSurveyFormProps> = (props) => {
  // Extraction des props
  const { onSubmit } = props;
  
  // États du composant
  const [surveyType, setSurveyType] = useState<'daily' | 'global' | null>(null);  // Type de questionnaire
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);           // Index de la question actuelle
  const [answers, setAnswers] = useState<Answer[]>([]);                          // Réponses fournies
  const [showCodeInput, setShowCodeInput] = useState(true);                      // Afficher le champ de code
  const [isCodeVisible, setIsCodeVisible] = useState(false);                    // Afficher/masquer le code
  const [secretCode, setSecretCode] = useState('');                             // Code secret saisi
  const [isCompleted, setIsCompleted] = useState(false);                        // Questionnaire terminé
  const [authenticationError, setAuthenticationError] = useState('');           // Erreur d'authentification
  
  // Horodatage de début pour calculer la durée du questionnaire
  const startTime = useState(Date.now())[0];

  // Code secret de démonstration (à remplacer par une authentification sécurisée en production)
  const DEMO_SECRET_CODE = 'PHARMA2024';

  /**
   * Questions du questionnaire quotidien
   * Évaluent différents aspects de la journée de travail
   */
  const dailyQuestions: Question[] = [
    {
      id: 'workload',
      type: 'rating',
      question: 'Comment évaluez-vous votre charge de travail aujourd\'hui ?',
      required: true,
      category: '💼 Travail'
    },
    {
      id: 'team_communication',
      type: 'rating',
      question: 'La communication avec vos collègues a-t-elle été fluide aujourd\'hui ?',
      required: true,
      category: '👥 Équipe'
    },
    {
      id: 'client_satisfaction',
      type: 'rating',
      question: 'Les clients semblaient-ils satisfaits de nos services aujourd\'hui ?',
      required: true,
      category: '😊 Service'
    },
    {
      id: 'stock_availability',
      type: 'yesno',
      question: 'Avez-vous rencontré des problèmes de stock aujourd\'hui ?',
      required: true,
      category: '📦 Stock'
    },
    {
      id: 'daily_improvement',
      type: 'text',
      question: 'Que pourrait-on améliorer pour demain ?',
      required: false,
      category: '💡 Amélioration'
    }
  ];

  /**
   * Questions du questionnaire global
   * Évaluent des aspects plus généraux du travail en pharmacie
   */
  const globalQuestions: Question[] = [
    {
      id: 'job_satisfaction',
      type: 'rating',
      question: 'À quel point êtes-vous satisfait(e) de votre travail dans cette pharmacie ?',
      required: true,
      category: '😊 Satisfaction'
    },
    {
      id: 'management_quality',
      type: 'rating',
      question: 'Comment évaluez-vous la qualité du management ?',
      required: true,
      category: '👔 Management'
    },
    {
      id: 'work_environment',
      type: 'rating',
      question: 'L\'environnement de travail est-il agréable ?',
      required: true,
      category: '🏢 Environnement'
    },
    {
      id: 'training_opportunities',
      type: 'rating',
      question: 'Êtes-vous satisfait(e) des opportunités de formation ?',
      required: true,
      category: '📚 Formation'
    },
    {
      id: 'career_development',
      type: 'choice',
      question: 'Voyez-vous des opportunités d\'évolution dans cette pharmacie ?',
      options: ['Excellentes', 'Bonnes', 'Moyennes', 'Limitées', 'Aucune'],
      required: true,
      category: '📈 Carrière'
    },
    {
      id: 'work_life_balance',
      type: 'rating',
      question: 'L\'équilibre vie professionnelle/personnelle est-il respecté ?',
      required: true,
      category: '⚖️ Équilibre'
    },
    {
      id: 'recommendation',
      type: 'yesno',
      question: 'Recommanderiez-vous cette pharmacie comme lieu de travail ?',
      required: true,
      category: '👍 Recommandation'
    },
    {
      id: 'general_feedback',
      type: 'text',
      question: 'Vos commentaires et suggestions pour améliorer l\'environnement de travail',
      required: false,
      category: '💬 Commentaires'
    }
  ];

  const questions = surveyType === 'daily' ? dailyQuestions : globalQuestions;
  const currentQuestion = questions?.[currentQuestionIndex];

  /**
   * Gère la soumission du code d'authentification
   * Vérifie si le code saisi correspond au code de démonstration
   */
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (secretCode === DEMO_SECRET_CODE) {
      setShowCodeInput(false);
      setAuthenticationError('');
    } else {
      setAuthenticationError('Code incorrect. Veuillez réessayer.');
    }
  };

  /**
   * Sélectionne le type de questionnaire
   * Réinitialise les réponses et l'index de la question actuelle
   */
  const handleSurveyTypeSelect = (type: 'daily' | 'global') => {
    setSurveyType(type);
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  /**
   * Gère la sélection d'une réponse par l'utilisateur
   * @param value - La valeur de la réponse (peut être un nombre, une chaîne ou un booléen)
   */
  /**
   * Gère la sélection d'une réponse par l'utilisateur
   * @param value - La valeur de la réponse (peut être un nombre, une chaîne ou un booléen)
   */
  const handleAnswer = (value: any) => {
    if (!currentQuestion) return;
    
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === currentQuestion.id);
      
      if (existingAnswerIndex >= 0) {
        // Mise à jour de la réponse existante
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { 
          ...newAnswers[existingAnswerIndex], 
          value,
          questionId: currentQuestion.id // S'assure que questionId est toujours défini
        };
        return newAnswers;
      } else {
        // Ajout d'une nouvelle réponse
        return [...prev, { 
          questionId: currentQuestion.id, 
          value 
        }];
      }
    });
  };

  const getCurrentAnswer = () => {
    if (!currentQuestion) return undefined;
    return answers.find(a => a.questionId === currentQuestion.id)?.value;
  };

  /**
   * Passe à la question suivante ou soumet le formulaire si c'est la dernière question
   * Vérifie d'abord si on peut passer à la question suivante avec canProceed()
   * Fait défiler la page vers le haut pour une meilleure expérience utilisateur
   */
  const handleNext = () => {
    if (!canProceed()) return;
    
    // Si c'est la dernière question, soumettre le formulaire
    if (currentQuestionIndex === questions.length - 1) {
      if (onSubmit) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000); // Durée en secondes
        onSubmit({
          surveyType,
          answers,
          duration: timeSpent,
          completedAt: new Date().toISOString()
        });
      }
      setIsCompleted(true);
      return;
    }
    
    // Sinon, passer à la question suivante
    setCurrentQuestionIndex(prev => prev + 1);
    
    // Faire défiler vers le haut de la question
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Vérifie si l'utilisateur peut passer à la question suivante
   * @returns true si la question n'est pas obligatoire ou si une réponse a été fournie
   */
  const canProceed = () => {
    if (!currentQuestion?.required) return true;
    const answer = getCurrentAnswer();
    return answer !== undefined && answer !== '';
  };

  /**
   * Retourne à la question précédente
   * Ne fait rien si on est déjà à la première question
   * Fait défiler la page vers le haut pour une meilleure expérience utilisateur
   */
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      // Faire défiler vers le haut de la question
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  /**
   * Composant pour les questions Oui/Non
   * Affiche deux boutons pour répondre par oui ou non
   */
  const YesNoComponent = () => {
    if (!currentQuestion) return null;
    const currentAnswer = getCurrentAnswer();
    const isYes = currentAnswer === true || currentAnswer === 'true';
    const isNo = currentAnswer === false || currentAnswer === 'false';
    
    return (
      <div className="flex justify-center space-x-6">
        <Button
          variant={isYes ? 'default' : 'outline'}
          size="lg"
          onClick={() => handleAnswer(true)}
          className={`min-w-[120px] flex items-center justify-center ${isYes ? 'bg-green-600 hover:bg-green-700' : ''}`}
        >
          {isYes && <CheckCircle className="w-5 h-5 mr-2" />}
          Oui
        </Button>
        <Button
          variant={isNo ? 'destructive' : 'outline'}
          size="lg"
          onClick={() => handleAnswer(false)}
          className={`min-w-[120px] flex items-center justify-center ${isNo ? 'bg-red-600 hover:bg-red-700' : ''}`}
        >
          {isNo && <CheckCircle className="w-5 h-5 mr-2" />}
          Non
        </Button>
      </div>
    );
  };

  /**
   * Composant pour les questions de notation (1 à 5 étoiles)
   * Affiche des boutons cliquables pour sélectionner une note
   */
  const RatingComponent = () => {
    const currentAnswer = getCurrentAnswer() as number;
    
    return (
      <div className="space-y-6">
        <div className="flex justify-center space-x-3">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleAnswer(rating)}
              className={`w-14 h-14 rounded-full transition-all duration-300 flex items-center justify-center font-bold shadow-md ${
                currentAnswer === rating
                  ? 'bg-green-600 text-white scale-110 shadow-lg'
                  : 'bg-white hover:bg-green-50 text-gray-600 hover:scale-105 border-2 border-gray-200 hover:border-green-300'
              }`}
            >
              {rating}
            </button>
          ))}
        </div>
        
        <div className="flex justify-between text-sm text-gray-500 px-4">
          <span>Très mauvais</span>
          <span>Très bien</span>
        </div>
        
        {currentAnswer && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full">
              {[...Array(currentAnswer)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="font-medium ml-2">
                {['Très mauvais', 'Mauvais', 'Moyen', 'Bien', 'Très bien'][currentAnswer - 1]}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const ChoiceComponent = () => {
    if (!currentQuestion?.options) return null;
    const currentAnswer = getCurrentAnswer() as string;
    
    return (
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleAnswer(option)}
            className={`w-full p-4 rounded-xl text-left transition-all duration-200 border-2 ${
              currentAnswer === option
                ? 'bg-green-600 text-white shadow-lg border-green-700'
                : 'bg-white hover:bg-green-50 text-gray-700 border-gray-200 hover:border-green-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              {currentAnswer === option && (
                <CheckCircle className="w-5 h-5" />
              )}
            </div>
          </button>
        ))}
      </div>
    );
  };


  // Écran de saisie du code secret
  if (showCodeInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Key className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Accès Personnel
              </h1>
              <p className="text-gray-600 mb-4">
                Saisissez le code secret de votre pharmacie
              </p>
              <div className="flex items-center justify-center text-sm text-green-600 bg-green-50 rounded-lg p-3">
                <Shield className="w-4 h-4 mr-2" />
                <span>Sondage 100% anonyme</span>
              </div>
            </div>

            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="relative">
                <div className="relative">
                  <Input
                    type={isCodeVisible ? 'text' : 'password'}
                    value={secretCode}
                    onChange={(e) => setSecretCode(e.target.value)}
                    placeholder="Code secret de la pharmacie"
                    onKeyPress={(e) => e.key === 'Enter' && handleCodeSubmit(e as any)}
                  />
                  <button
                    type="button"
                    onClick={() => setIsCodeVisible(!isCodeVisible)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {isCodeVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {authenticationError && (
                <div className="flex items-center text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {authenticationError}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full"
                disabled={!secretCode.trim()}
              >
                Accéder au sondage
              </Button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">Pourquoi un code secret ?</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Garantit que seul le personnel autorisé participe</li>
                <li>• Préserve l'anonymat total des réponses</li>
                <li>• Sécurise les données de la pharmacie</li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">
                Code de démonstration: <strong>PHARMA2024</strong>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sélection du type de sondage
  if (!surveyType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Choisissez votre sondage
              </h1>
              <p className="text-gray-600">
                Quel type de sondage souhaitez-vous remplir aujourd'hui ?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                className="cursor-pointer border-orange-200 hover:border-orange-300 transition-colors"
                onClick={() => handleSurveyTypeSelect('daily')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                      <Calendar className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Sondage Journalier</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Évaluez votre journée de travail et partagez vos observations quotidiennes.
                  </p>
                  <div className="flex items-center text-sm text-orange-600 font-medium mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>~3 minutes</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    5 questions sur votre expérience du jour
                  </div>
                </CardContent>
              </Card>

              <Card
                className="cursor-pointer border-green-200 hover:border-green-300 transition-colors"
                onClick={() => handleSurveyTypeSelect('global')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                      <Globe className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Sondage Global</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Évaluez votre expérience générale de travail dans cette pharmacie.
                  </p>
                  <div className="flex items-center text-sm text-green-600 font-medium mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>~5 minutes</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    8 questions sur votre satisfaction globale
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-amber-600 mr-3 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 mb-1">Anonymat garanti</h4>
                  <p className="text-sm text-amber-700">
                    Vos réponses sont totalement anonymes et ne peuvent pas être tracées jusqu'à vous. 
                    Soyez sincère pour nous aider à améliorer l'environnement de travail.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Écran de fin
  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Merci pour votre participation !
            </h2>
            <p className="text-gray-600 mb-6">
              Vos retours anonymes contribuent à améliorer l'environnement de travail et la qualité des services.
            </p>
            
            <div className="bg-green-50 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-center text-green-700 mb-2">
                <Shield className="w-5 h-5 mr-2" />
                <span className="font-semibold">Anonymat confirmé</span>
              </div>
              <p className="text-sm text-green-600">
                Vos réponses ont été soumises de manière totalement anonyme.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  setSurveyType(null);
                  setCurrentQuestionIndex(0);
                  setAnswers([]);
                  setIsCompleted(false);
                }}
                variant="default"
                className="flex-1"
              >
                Autre sondage
              </Button>
              <Button
                onClick={() => {
                  setShowCodeInput(true);
                  setSurveyType(null);
                  setCurrentQuestionIndex(0);
                  setAnswers([]);
                  setIsCompleted(false);
                  setSecretCode('');
                }}
                variant="outline"
                className="flex-1"
              >
                Retour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const TextComponent = () => {
    const [text, setText] = React.useState('');
    
    useEffect(() => {
      const answer = getCurrentAnswer();
      if (answer !== undefined) {
        setText(String(answer));
      }
    }, [currentQuestion, getCurrentAnswer]);
    
    return (
      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleAnswer(e.target.value);
          }}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[120px]"
          placeholder="Votre réponse..."
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card variant="elevated" className="overflow-hidden">
          {/* Header */}
          <div className={`p-6 text-white ${
            surveyType === 'daily' 
              ? 'bg-gradient-to-r from-orange-500 to-orange-600' 
              : 'bg-gradient-to-r from-green-600 to-green-700'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold">
                  {surveyType === 'daily' ? 'Sondage Journalier' : 'Sondage Global'}
                </h2>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Anonyme</span>
              </div>
            </div>

            {/* Barre de progression */}
            <div className="w-full bg-white/30 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-white/80 mt-2">
              <span>Question {currentQuestionIndex + 1} sur {questions.length}</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
          </div>

          {/* Question Content */}
          <CardContent className="p-8">
            {currentQuestion && (
              <>
                <div className="mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    {currentQuestion.category}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </>
            )}

            <div className="mb-8">
              {currentQuestion?.type === 'rating' && <RatingComponent />}
              {currentQuestion?.type === 'yesno' && <YesNoComponent />}
              {currentQuestion?.type === 'choice' && <ChoiceComponent />}
              {currentQuestion?.type === 'text' && <TextComponent />}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-gray-200">
              <Button 
                onClick={handlePrevious}
                variant="outline"
                className="mr-2"
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} sur {questions.length}
                </span>
                <Button 
                  onClick={handleNext}
                  variant="default"
                  disabled={!canProceed()}
                >
                  {currentQuestionIndex === questions.length - 1 ? 'Envoyer' : 'Question suivante'}
                  {currentQuestionIndex === questions.length - 1 
                    ? <CheckCircle className="w-4 h-4 ml-1" />
                    : <ArrowRight className="w-4 h-4 ml-1" />
                  }
                </Button>
              </div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center text-sm text-gray-600">
              <Shield className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
              <span>Vos réponses sont anonymes et confidentielles. Le temps moyen de completion est de 3 à 5 minutes.</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StaffSurveyForm;