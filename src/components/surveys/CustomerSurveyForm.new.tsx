import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Types
type Option = {
  id: number;
  libelle: string;
  poids: number;
};

type Question = {
  id: string;
  libelle: string;
  type: string;
  options: Option[];
};

type Answer = {
  questionId: string;
  response: string;
  optionId?: number;
  poids?: number;
};

interface CustomerSurveyFormProps {
  onSubmit: (data: { answers: Answer[] }) => void;
  onBack: () => void;
}

// Données de test pour les questions du sondage
const surveyQuestions: Question[] = [
  {
    id: '1',
    libelle: 'Comment évaluez-vous votre expérience globale ?',
    type: 'rating',
    options: [
      { id: 1, libelle: '1 - Très mauvaise', poids: 1 },
      { id: 2, libelle: '2 - Mauvaise', poids: 2 },
      { id: 3, libelle: '3 - Moyenne', poids: 3 },
      { id: 4, libelle: '4 - Bonne', poids: 4 },
      { id: 5, libelle: '5 - Excellente', poids: 5 },
    ],
  },
  {
    id: '2',
    libelle: 'Le personnel était-il aimable et professionnel ?',
    type: 'yesno',
    options: [
      { id: 1, libelle: 'Oui', poids: 1 },
      { id: 2, libelle: 'Non', poids: 0 },
    ],
  },
  {
    id: '3',
    libelle: 'Avez-vous des commentaires à ajouter ?',
    type: 'text',
    options: [],
  },
];

const CustomerSurveyForm: React.FC<CustomerSurveyFormProps> = ({ 
  onSubmit, 
  onBack 
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [error] = useState('');
  
  const currentQuestion = surveyQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === surveyQuestions.length - 1;
  const currentAnswer = answers.find(a => a.questionId === currentQuestion?.id);
  const canProceed = currentQuestion?.type === 'text' || currentAnswer !== undefined;

  const handleAnswer = (option: Option) => {
    if (!currentQuestion) return;
    
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      response: option.libelle,
      optionId: option.id,
      poids: option.poids
    };

    setAnswers(prev => {
      const existingIndex = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (existingIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingIndex] = newAnswer;
        return newAnswers;
      }
      return [...prev, newAnswer];
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onSubmit({ answers });
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => Math.max(0, prev - 1));
  };

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Questionnaire non disponible</h2>
            <p className="text-gray-600 mb-6">Désolé, aucune question n'est disponible pour le moment.</p>
            <Button onClick={onBack} variant="default">
              Retour à l'accueil
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Questionnaire de satisfaction</h1>
            <p className="text-gray-600 mb-6">
              Question {currentQuestionIndex + 1} sur {surveyQuestions.length}
            </p>
            
            {/* Question actuelle */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">{currentQuestion.libelle}</h2>
              
              {/* Options de réponse */}
              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <Button
                    key={option.id}
                    variant={currentAnswer?.optionId === option.id ? 'default' : 'outline'}
                    className="w-full justify-start"
                    onClick={() => handleAnswer(option)}
                  >
                    {option.libelle}
                  </Button>
                ))}
              </div>
              
              {/* Champ de texte pour les questions ouvertes */}
              {currentQuestion.type === 'text' && (
                <textarea
                  className="mt-4 w-full p-2 border rounded-md"
                  rows={4}
                  placeholder="Votre réponse..."
                  value={currentAnswer?.response || ''}
                  onChange={(e) => {
                    const newAnswer: Answer = {
                      questionId: currentQuestion.id,
                      response: e.target.value
                    };
                    setAnswers(prev => {
                      const existingIndex = prev.findIndex(a => a.questionId === currentQuestion.id);
                      if (existingIndex >= 0) {
                        const newAnswers = [...prev];
                        newAnswers[existingIndex] = newAnswer;
                        return newAnswers;
                      }
                      return [...prev, newAnswer];
                    });
                  }}
                />
              )}
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button 
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                variant="outline"
              >
                Précédent
              </Button>
              
              <Button 
                onClick={handleNext}
                disabled={!canProceed}
                variant="default"
              >
                {isLastQuestion ? 'Terminer' : 'Suivant'}
              </Button>
            </div>
            
            {/* Bouton de retour */}
            <div className="mt-6">
              <Button 
                onClick={onBack}
                variant="ghost"
                className="text-gray-600 hover:text-gray-900"
              >
                Retour à l'accueil
              </Button>
            </div>
            
            {/* Message d'erreur */}
            {error && (
              <div className="mt-4 text-red-500">
                {error}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerSurveyForm;
