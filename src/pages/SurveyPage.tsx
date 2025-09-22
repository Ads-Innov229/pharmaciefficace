/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Users, ArrowLeft, ArrowRight } from 'lucide-react';
import ClientSurveyForm from '../components/surveys/CustomerSurveyForm';
import StaffSurveyForm from '../components/surveys/StaffSurveyForm';

const SurveyPage: React.FC = () => {
  const [surveyType, setSurveyType] = useState<'customer' | 'staff' | null>(null);
  const navigate = useNavigate();

  const handleSurveySubmit = (data: unknown) => {
    // eslint-disable-next-line no-console
    // eslint-disable-next-line no-console
    console.log('Survey submitted:', data);
    // Ici, vous pouvez ajouter la logique pour envoyer les données à votre API
    window.alert('Merci pour votre avis ! Votre réponse a été enregistrée.');
    navigate('/');
  };

  const handleBack = () => {
    if (surveyType) {
      setSurveyType(null);
    } else {
      navigate(-1);
    }
  };

  if (surveyType === 'customer') {
    return (
      <div className="container mx-auto p-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center text-primary-600 hover:text-primary-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Retour
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Enquête Client</h1>
        <ClientSurveyForm
          onSubmit={handleSurveySubmit}
          onBack={handleBack}
        />
      </div>
    );
  }

  if (surveyType === 'staff') {
    return (
      <div className="container mx-auto p-4">
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center text-primary-600 hover:text-primary-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Retour
        </button>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Enquête Personnel</h1>
        <StaffSurveyForm
          onSubmit={handleSurveySubmit}
          onBack={handleBack}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Sélectionnez le type d'enquête</h2>
          <p className="mt-2 text-sm text-gray-600">
            Choisissez le type d'enquête que vous souhaitez compléter
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setSurveyType('customer')}
            className="relative text-left bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all duration-200 cursor-pointer w-full"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-100 text-primary-600 mb-4">
              <User className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Enquête Client</h3>
            <p className="text-sm text-gray-500">
              Donnez votre avis sur votre expérience en tant que client
            </p>
            <div className="mt-4 text-sm text-primary-600 font-medium flex items-center">
              Commencer <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSurveyType('staff')}
            className="relative text-left bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:border-primary-500 hover:shadow-md transition-all duration-200 cursor-pointer w-full"
          >
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-secondary-100 text-secondary-600 mb-4">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Enquête Personnel</h3>
            <p className="text-sm text-gray-500">
              Questionnaire à destination du personnel de la pharmacie
            </p>
            <div className="mt-4 text-sm text-secondary-600 font-medium flex items-center">
              Commencer <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyPage;
