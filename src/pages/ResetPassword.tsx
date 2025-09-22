/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable no-undef */

import React, { useState } from 'react';
import { Lock, CheckCircle, ArrowLeft, Eye, EyeOff, Shield, AlertTriangle, Check } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface PasswordCriteriaProps {
  children: React.ReactNode;
}

interface PasswordStrength {
  strength: number;
  criteria: {
    length: boolean;
    number: boolean;
    uppercase: boolean;
    special: boolean;
  };
}

const useToast = () => ({
  showToast: (message: string, type: ToastType) => {
    if (type === 'error') {
      window.alert('Veuillez entrer une adresse email valide');
    } else {
      window.alert(`✅ ${message}`);
    }
  }
});

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showToast } = useToast();
  const navigate = (path: string) => {
    console.log(`Navigation vers: ${path}`);
    // In a real app, you would use useNavigate from react-router-dom
    // const navigate = useNavigate();
    // navigate(path);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPassword || !confirmPassword) {
      showToast('Veuillez remplir tous les champs', 'error');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      showToast('Les mots de passe ne correspondent pas', 'error');
      return;
    }
    
    const passwordStrength = getPasswordStrength();
    if (passwordStrength.strength < 4) {
      showToast('Le mot de passe ne répond pas aux critères de sécurité', 'error');
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulation d'une requête API
      await new Promise<void>((resolve) => {
        window.setTimeout(resolve, 1500);
      });
      
      // Si le code est valide, on passe à l'étape suivante
      setIsSuccess(true);
      showToast('Votre mot de passe a été réinitialisé avec succès', 'success');
    } catch (error) {
      showToast('Une erreur est survenue lors de la réinitialisation', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Calcul de la force du mot de passe
  const getPasswordStrength = (): PasswordStrength => {
    const p = newPassword;
    let strength = 0;
    const criteria = {
      length: p.length >= 8,
      number: /\d/.test(p),
      uppercase: /[A-Z]/.test(p),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(p)
    };
    
    Object.values(criteria).forEach(met => met && strength++);
    return { strength, criteria };
  };

  const { strength, criteria } = getPasswordStrength();
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['Très faible', 'Faible', 'Moyen', 'Fort'];

  const SecurityTip = ({ children }: PasswordCriteriaProps) => (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
      <div className="flex items-start">
        <Shield className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <div className="text-sm text-blue-800">{children}</div>
      </div>
    </div>
  );

  const PasswordCriteria = () => (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700 mb-3">Critères de sécurité :</p>
      {[
        { key: 'length', label: 'Au moins 8 caractères' },
        { key: 'uppercase', label: 'Au moins une majuscule' },
        { key: 'number', label: 'Au moins un chiffre' },
        { key: 'special', label: 'Au moins un caractère spécial' }
      ].map(({ key, label }) => {
        const criteriaKey = key as keyof typeof criteria;
        return (
          <div key={key} className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
              criteria[criteriaKey] ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
            }`}>
              {criteria[criteriaKey] && <Check className="w-3 h-3" />}
            </div>
            <span className={`text-sm ${criteria[criteriaKey] ? 'text-green-600' : 'text-gray-500'}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mot de passe mis à jour !
          </h2>
          <p className="text-gray-600 mb-8">
            Votre mot de passe a été changé avec succès. 
            Vous pouvez maintenant l'utiliser pour vous connecter.
          </p>
          
          <div className="bg-green-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-2 text-green-700">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Votre compte est maintenant plus sécurisé</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigate('/profile')}
              className="w-full flex justify-center items-center py-3 px-4 rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Continuer
            </button>
            <button
              onClick={() => setIsSuccess(false)}
              className="w-full py-2 px-4 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              Changer à nouveau
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <button 
            onClick={() => navigate('/')} 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Retour</span>
          </button>
          
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Lock className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Changer le mot de passe
          </h2>
          <p className="text-gray-600">
            Renforcez la sécurité de votre compte
          </p>
        </div>

        <SecurityTip>
          <strong>Conseil de sécurité :</strong> Utilisez un mot de passe unique que vous n'utilisez sur aucun autre site. 
          Évitez les informations personnelles facilement devinables.
        </SecurityTip>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg">
          <div className="space-y-6">
            {/* Mot de passe actuel */}
            <div>
              <label htmlFor="current" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe actuel <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="current"
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Votre mot de passe actuel"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Nouveau mot de passe */}
            <div>
              <label htmlFor="new" className="block text-sm font-medium text-gray-700 mb-2">
                Nouveau mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="new"
                  type={showNewPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Votre nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              
              {newPassword && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Force du mot de passe</span>
                    <span className={`text-sm font-medium ${
                      strength <= 1 ? 'text-red-600' : 
                      strength === 2 ? 'text-orange-600' : 
                      strength === 3 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {strength > 0 ? strengthLabels[strength - 1] : 'Aucune'}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        strength > 0 ? strengthColors[strength - 1] : 'bg-gray-300'
                      }`}
                      style={{ width: `${(strength / 4) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirmation du mot de passe */}
            <div>
              <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le nouveau mot de passe <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                    confirmPassword && newPassword !== confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Confirmez votre nouveau mot de passe"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <div className="mt-2 flex items-center space-x-2 text-red-600">
                  <AlertTriangle className="w-4 h-4" />
                  <p className="text-xs">Les mots de passe ne correspondent pas</p>
                </div>
              )}
            </div>

            {/* Critères de sécurité */}
            {newPassword && (
              <div className="bg-gray-50 rounded-xl p-4">
                <PasswordCriteria />
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-2 border border-gray-300 rounded-xl text-sm bg-white hover:bg-gray-50 text-gray-700 transition-all duration-200"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !currentPassword || !newPassword || !confirmPassword || newPassword !== confirmPassword}
                className="flex items-center px-6 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mise à jour...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-4 w-4" />
                    Mettre à jour le mot de passe
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer sécurité */}
        <div className="text-center mt-8">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Toutes les données sont chiffrées et sécurisées</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;