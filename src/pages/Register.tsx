/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */

import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Lock, Building2, Phone, MapPin, ArrowRight, 
  Eye, EyeOff, Star, Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Fallbacks for missing icons
const Crown = Star; // Using Star as a fallback for Crown
const CalendarDays = Calendar; // Using Calendar as a fallback for CalendarDays

// Custom SVG for missing icons
interface IconProps {
  className?: string;
}

const Zap = ({ className = '' }: IconProps) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const CreditCard = ({ className = '' }: IconProps) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

type FormData = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  nomPharmacie: string;
  ifu: string;
  telephonePharmacie: string;
  adresse: string;
  password: string;
  confirmPassword: string;
};

type PlanType = 'essentiel' | 'professionnel' | 'entreprise';
type BillingType = 'mensuel' | 'annuel';

interface Plan {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  custom?: boolean;
  features: string[];
}

type ToastType = 'success' | 'error' | 'warning' | 'info';

const useToast = () => {
  const showToast = (message: string, type: ToastType) => {
    // Implémentation de la notification toast
    if (type === 'error') {
      alert(`❌ ${message}`);
    } else {
      alert(`✅ ${message}`);
    }
  };
  return { showToast };
};

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    nomPharmacie: '',
    ifu: '',
    telephonePharmacie: '',
    adresse: '',
    password: '',
    confirmPassword: '',
  });
  
  // Form state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [step, setStep] = useState(1);
  
  // Subscription state
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('professionnel');
  const [billingType, setBillingType] = useState<BillingType>('mensuel');
  const [duration, setDuration] = useState(1);

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[!@#$%^&*(),.?":{}|<>]+/)) strength++;
    return Math.min(strength, 4);
  };
  
  // Password strength state and calculation
  const [passwordStrength, setPasswordStrength] = useState(() => {
    const current = calculatePasswordStrength(formData.password);
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-[#4D7C2C]'];
    const labels = ['Faible', 'Moyen', 'Bon', 'Excellent'];
    return { colors, labels, current };
  });
  
  // Update password strength when password changes
  useEffect(() => {
    const current = calculatePasswordStrength(formData.password);
    setPasswordStrength(prev => ({
      ...prev,
      current
    }));
  }, [formData.password]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const plans: Record<PlanType, Plan> = {
    essentiel: {
      name: 'Essentiel',
      icon: Zap,
      description: 'Parfait pour les petites pharmacies',
      monthlyPrice: 15000,
      annualPrice: 180000,
      popular: false,
      custom: false,
      features: [
        'Sondages clients illimités',
        'Dashboard de base',
        "Jusqu'à 3 utilisateurs personnel",
        'Rapports mensuels',
        'Support par email'
      ]
    },
    professionnel: {
      name: 'Professionnel',
      icon: Star,
      description: 'Le plus populaire pour pharmacies moyennes',
      monthlyPrice: 35000,
      annualPrice: 420000,
      popular: true,
      custom: false,
      features: [
        'Toutes les fonctionnalités Essentiel',
        "Jusqu'à 10 utilisateurs personnel",
        'Sondages internes journaliers et globaux',
        'Analytics avancées avec graphiques',
        'Rapports hebdomadaires personnalisés'
      ]
    },
    entreprise: {
      name: 'Entreprise',
      icon: Crown,
      description: 'Pour groupes et chaînes de pharmacies',
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      custom: true,
      features: [
        'Toutes les fonctionnalités Pro',
        'Utilisateurs personnel illimités',
        'Multi-pharmacies (gestion centralisée)',
        'API personnalisée complète',
        'Support 24/7 dédié'
      ]
    }
  };

  const calculatePrice = (plan: PlanType) => {
    if (plan === 'entreprise') return 'Sur devis';
    const basePrice = billingType === 'mensuel' 
      ? plans[plan].monthlyPrice 
      : plans[plan].annualPrice;
    const total = basePrice * duration;
    return `${total.toLocaleString()} FCFA`;
  };

  const nextStep = () => {
    if (step === 1 && (!formData.nom || !formData.prenom || !formData.email || !formData.telephone)) {
      showToast('Veuillez remplir tous les champs obligatoires', 'error');
      return;
    }
    if (step === 2 && (!formData.nomPharmacie || !formData.ifu || !formData.telephonePharmacie || !formData.adresse || !formData.password || !formData.confirmPassword)) {
      window.alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    if (step === 2 && formData.password !== formData.confirmPassword) {
      window.alert('Les mots de passe ne correspondent pas');
      return;
    }
    if (step === 2 && !acceptTerms) {
      showToast('Veuvez accepter les conditions d\'utilisation', 'error');
      return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#F8FAF5] to-[#E8F0E0] relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4D7C2C]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#E57325]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="flex items-center justify-center p-6">
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-200/50 overflow-hidden">
            
            {/* En-tête avec logo et titre */}
            <div className="px-8 pt-12 pb-8 text-center bg-white border-b border-gray-100 selection:bg-[#E57325] selection:text-white">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4D7C2C] to-[#5A8F35] flex items-center justify-center shadow-md">
                  <User className="w-10 h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Rejoignez <span className="text-[#4D7C2C]">Pharmacie</span><span className="text-[#E57325]">Efficace</span>
              </h1>
              <p className="text-gray-600 text-base">
                Créez votre compte et transformez la gestion de votre pharmacie
              </p>
            </div>

            <div className="px-8 pb-8">
              {/* Indicateur de progression */}
              <div className="mb-10">
                <div className="flex items-center justify-between max-w-2xl mx-auto relative">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div key={stepNumber} className="flex flex-col items-center relative z-10">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2
                          ${step >= stepNumber 
                            ? 'bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35] text-white border-transparent shadow-md' 
                            : 'bg-white text-gray-400 border-gray-300'}`}
                      >
                        {stepNumber}
                      </div>
                      <span className={`text-xs mt-2 text-center font-medium ${step >= stepNumber ? 'text-gray-900' : 'text-gray-400'}`}>
                        {stepNumber === 1 && 'Informations'}
                        {stepNumber === 2 && 'Pharmacie'}
                        {stepNumber === 3 && 'Abonnement'}
                        {stepNumber === 4 && 'Validation'}
                      </span>
                      {stepNumber < 4 && (
                        <div className="absolute top-5 left-10 w-16 h-1 -ml-1 lg:w-20">
                          <div className={`h-full rounded-full transition-all duration-300 ${
                            step > stepNumber ? 'bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35]' : 'bg-gray-200'
                          }`}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-sm">
                {step === 1 && (
                  <div className="space-y-8">
                    <div className="text-center mb-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Vos informations personnelles</h3>
                      <p className="text-gray-500 text-sm">Commençons par faire connaissance</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="prenom" className="block text-sm font-semibold text-gray-700 mb-2">
                          Prénom <span className="text-[#E57325]">*</span>
                        </label>
                        <input
                          id="prenom"
                          name="prenom"
                          type="text"
                          required
                          value={formData.prenom}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700 placeholder-gray-400"
                          placeholder="Votre prénom"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="nom" className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom <span className="text-[#E57325]">*</span>
                        </label>
                        <input
                          id="nom"
                          name="nom"
                          type="text"
                          required
                          value={formData.nom}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700 placeholder-gray-400"
                          placeholder="Votre nom"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email <span className="text-[#E57325]">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#4D7C2C] transition-colors" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700 placeholder-gray-400"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="telephone" className="block text-sm font-semibold text-gray-700 mb-2">
                          Téléphone <span className="text-[#E57325]">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#4D7C2C] transition-colors" />
                          </div>
                          <input
                            id="telephone"
                            name="telephone"
                            type="tel"
                            required
                            value={formData.telephone}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700 placeholder-gray-400"
                            placeholder="+229 XX XX XX XX"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center px-8 py-3 rounded-xl text-white bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35] hover:from-[#5A8F35] hover:to-[#4D7C2C] shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                      >
                        Suivant
                        <ArrowRight className="ml-3 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Votre pharmacie & sécurité</h3>
                      <p className="text-gray-600">Informations sur votre établissement</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="nomPharmacie" className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom de la pharmacie <span className="text-[#E57325]">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Building2 className="h-5 w-5 text-gray-400 group-focus-within:text-[#4D7C2C] transition-colors" />
                          </div>
                          <input
                            id="nomPharmacie"
                            name="nomPharmacie"
                            type="text"
                            required
                            value={formData.nomPharmacie}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700 placeholder-gray-400"
                            placeholder="Pharmacie du Centre"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="ifu" className="block text-sm font-semibold text-gray-700 mb-2">
                            Numéro IFU <span className="text-[#E57325]">*</span>
                          </label>
                          <input
                            id="ifu"
                            name="ifu"
                            type="text"
                            required
                            value={formData.ifu}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700 placeholder-gray-400"
                            placeholder="Numéro IFU de la pharmacie"
                          />
                        </div>

                        <div>
                          <label htmlFor="telephonePharmacie" className="block text-sm font-semibold text-gray-700 mb-2">
                            Téléphone pharmacie <span className="text-[#E57325]">*</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-[#4D7C2C] transition-colors" />
                            </div>
                            <input
                              id="telephonePharmacie"
                              name="telephonePharmacie"
                              type="tel"
                              required
                              value={formData.telephonePharmacie}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700 placeholder-gray-400"
                              placeholder="+229 XX XX XX XX"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="adresse" className="block text-sm font-semibold text-gray-700 mb-2">
                          Adresse de la pharmacie <span className="text-[#E57325]">*</span>
                        </label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-[#4D7C2C] transition-colors" />
                          </div>
                          <input
                            id="adresse"
                            name="adresse"
                            type="text"
                            required
                            value={formData.adresse}
                            onChange={handleChange}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700 placeholder-gray-400"
                            placeholder="Adresse complète de la pharmacie"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Mot de passe <span className="text-[#E57325]">*</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#4D7C2C] transition-colors" />
                            </div>
                            <input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              required
                              value={formData.password}
                              onChange={handleChange}
                              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700"
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#4D7C2C] transition-colors focus:outline-none"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {formData.password && (
                            <div className="mt-3">
                              <div className="flex space-x-1.5 mt-2">
                                {[0, 1, 2, 3].map((i) => {
                                  const strengthIndex = Math.max(0, passwordStrength.current - 1);
                                  const strengthClass = i < passwordStrength.current 
                                    ? passwordStrength.colors[strengthIndex] 
                                    : 'bg-gray-200';
                                  return (
                                    <div key={i} className={`h-1.5 flex-1 rounded-full ${strengthClass} transition-all duration-300`} />
                                  );
                                })}
                              </div>
                              <p className="mt-1.5 text-xs font-medium ${
                                passwordStrength.current < 2 ? 'text-red-500' : 
                                passwordStrength.current < 3 ? 'text-amber-500' : 'text-[#4D7C2C]'
                              }">
                                {passwordStrength.labels[Math.max(0, passwordStrength.current - 1)] || 'Faible'}
                              </p>
                            </div>
                          )}
                        </div>

                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                            Confirmer le mot de passe <span className="text-[#E57325]">*</span>
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#4D7C2C] transition-colors" />
                            </div>
                            <input
                              id="confirmPassword"
                              name="confirmPassword"
                              type={showConfirmPassword ? "text" : "password"}
                              required
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C]/30 focus:border-[#4D7C2C] transition-all duration-200 bg-white text-gray-700"
                              placeholder="••••••••"
                            />
                            <button
                              type="button"
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#4D7C2C] transition-colors focus:outline-none"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {formData.confirmPassword && (
                            <div className="mt-3">
                              {formData.password === formData.confirmPassword ? (
                                <p className="text-xs text-[#4D7C2C] font-medium flex items-center">
                                <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Les mots de passe correspondent
                              </p>
                              ) : (
                                <p className="text-xs text-[#E57325] font-medium flex items-center">
                                <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                                Les mots de passe ne correspondent pas
                              </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-start p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center h-5 mt-0.5">
                          <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="h-4 w-4 text-[#4D7C2C] focus:ring-2 focus:ring-[#4D7C2C]/30 focus:ring-offset-0 border-gray-300 rounded transition-colors"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="acceptTerms" className="text-gray-700">
                            J'accepte les{' '}
                            <button type="button" className="text-[#4D7C2C] hover:underline font-medium focus:outline-none focus:ring-2 focus:ring-[#4D7C2C]/30 rounded">
                              conditions d'utilisation
                            </button>{' '}
                            et la{' '}
                            <button type="button" className="text-[#4D7C2C] hover:underline font-semibold">
                              politique de confidentialité
                            </button>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-10 pt-6 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D7C2C]/30"
                      >
                        Retour
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-2.5 bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35] hover:from-[#5A8F35] hover:to-[#4D7C2C] text-white rounded-xl flex items-center transition-all duration-200 shadow-md hover:shadow-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D7C2C]/50"
                      >
                        Suivant
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-8">
                    <div className="text-center mb-10">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Choisissez votre abonnement</h3>
                      <p className="text-gray-500 text-sm">Sélectionnez l'offre qui correspond à vos besoins</p>
                    </div>

                    {/* Sélection des plans */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {Object.entries(plans).map(([key, plan]) => {
                        const PlanIcon = plan.icon;
                        const isSelected = selectedPlan === key;
                        return (
                          <div
                            key={key}
                            className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-200 ${
                              isSelected 
                                ? 'border-[#4D7C2C] bg-gradient-to-b from-[#F8FAF5] to-white shadow-md ring-2 ring-[#4D7C2C]/20' 
                                : 'border-gray-200 bg-white hover:border-[#4D7C2C]/50 hover:shadow-sm'
                            }`}
                            onClick={() => setSelectedPlan(key as PlanType)}
                          >
                            {plan.popular && (
                              <div className="absolute -top-2.5 left-1/2 transform -translate-x-1/2">
                                <span className="bg-gradient-to-r from-[#E57325] to-[#F57C00] text-white text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                                  Plus populaire
                                </span>
                              </div>
                            )}
                            
                            <div className="text-center">
                              <div className={`inline-flex p-2.5 rounded-xl mb-4 ${
                                isSelected ? 'bg-[#4D7C2C]' : 'bg-gray-100'
                              }`}>
                                <PlanIcon className={`w-7 h-7 ${
                                  isSelected ? 'text-white' : 'text-gray-600'
                                }`} />
                              </div>
                              
                              <h4 className="text-lg font-bold text-gray-900 mb-1.5">{plan.name}</h4>
                              <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                              
                              <div className="mb-4">
                                {plan.custom ? (
                                  <p className="text-2xl font-bold text-gray-900">Sur devis</p>
                                ) : (
                                  <>
                                    <p className="text-sm text-gray-500 line-through">
                                      {plan.monthlyPrice.toLocaleString()} FCFA/mois
                                    </p>
                                    <p className="text-2xl font-bold text-[#4D7C2C] mb-1">
                                      {plan.annualPrice ? (plan.annualPrice / 12).toLocaleString() : plan.monthlyPrice.toLocaleString()} FCFA
                                      <span className="text-sm font-normal text-gray-500">/mois</span>
                                    </p>
                                    {plan.annualPrice && (
                                      <p className="text-xs text-green-600 font-medium">
                                        -15% avec l'abonnement annuel
                                      </p>
                                    )}
                                  </>
                                )}
                              </div>

                              <ul className="text-left space-y-2.5 mt-6">
                                {plan.features.map((feature, index) => (
                                  <li key={index} className="flex items-start text-sm text-gray-600">
                                    <svg className="w-4 h-4 text-[#4D7C2C] mt-0.5 mr-2.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <span className="leading-relaxed">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Type de facturation et durée */}
                    <div className="bg-gray-50/70 rounded-3xl p-6 space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Période de facturation</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setBillingType('mensuel')}
                            className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 ${
                              billingType === 'mensuel' 
                                ? 'border-[#4D7C2C] bg-white shadow-md' 
                                : 'border-gray-200 bg-white/50 hover:border-[#4D7C2C]/50'
                            }`}
                          >
                            <CalendarDays className="w-6 h-6 mx-auto mb-2 text-[#4D7C2C]" />
                            <span className="font-semibold">Mensuel</span>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setBillingType('annuel')}
                            className={`p-4 rounded-2xl border-2 text-center transition-all duration-300 relative ${
                              billingType === 'annuel' 
                                ? 'border-[#4D7C2C] bg-white shadow-md' 
                                : 'border-gray-200 bg-white/50 hover:border-[#4D7C2C]/50'
                            }`}
                          >
                            <div className="absolute -top-2 -right-2 bg-[#E57325] text-white text-xs font-bold px-2 py-1 rounded-full">
                              -15%
                            </div>
                            <CalendarDays className="w-6 h-6 mx-auto mb-2 text-[#4D7C2C]" />
                            <span className="font-semibold">Annuel</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          Durée ({billingType === 'mensuel' ? 'mois' : 'année'}{duration > 1 ? 's' : ''})
                        </h4>
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            onClick={() => setDuration(Math.max(1, duration - 1))}
                            className="w-10 h-10 rounded-full border-2 border-[#4D7C2C] text-[#4D7C2C] hover:bg-[#4D7C2C] hover:text-white transition-all duration-300 flex items-center justify-center font-bold"
                          >
                            -
                          </button>
                          
                          <div className="flex-1 text-center">
                            <input
                              type="number"
                              min="1"
                              max="60"
                              value={duration}
                              onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-20 text-center text-xl font-bold border-2 border-gray-200 rounded-xl py-2 focus:border-[#4D7C2C] focus:ring-0"
                            />
                            <p className="text-sm text-gray-600 mt-1">
                              {billingType === 'mensuel' ? 'Mois' : 'Années'}
                            </p>
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => setDuration(duration + 1)}
                            className="w-10 h-10 rounded-full border-2 border-[#4D7C2C] text-[#4D7C2C] hover:bg-[#4D7C2C] hover:text-white transition-all duration-300 flex items-center justify-center font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Résumé du prix */}
                      <div className="bg-white rounded-2xl p-4 border border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">Total à payer</span>
                          <span className="text-2xl font-bold text-[#4D7C2C]">
                            {calculatePrice(selectedPlan)}
                          </span>
                        </div>
                        {selectedPlan !== 'entreprise' && (
                          <p className="text-sm text-gray-600 mt-2">
                            {duration} {billingType === 'mensuel' ? 'mois' : 'année'}{duration > 1 ? 's' : ''} • 
                            Facturation {billingType === 'mensuel' ? 'mensuelle' : 'annuelle'}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Paiement KkiaPay */}
                    {selectedPlan !== 'entreprise' && (
                      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-3xl p-6">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                          <CreditCard className="w-6 h-6 mr-3 text-[#4D7C2C]" />
                          Paiement sécurisé
                        </h4>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">
                              Paiement sécurisé via KkiaPay
                            </p>
                            <p className="text-xs text-gray-500">
                              Mobile Money • Cartes bancaires • Paiement instantané
                            </p>
                          </div>
                          <div className="w-16 h-16 bg-[#4D7C2C] rounded-2xl flex items-center justify-center">
                            <span className="text-white font-bold text-lg">K</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border-2 border-gray-200 rounded-2xl text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                      >
                        Retour
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-8 py-4 bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35] hover:from-[#5A8F35] hover:to-[#4D7C2C] text-white rounded-2xl flex items-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        {selectedPlan === 'entreprise' ? 'Demander un devis' : 'Procéder au paiement'}
                        <ArrowRight className="ml-3 w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35] rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                      <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">Bienvenue dans PharmacieEfficace !</h3>
                    <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                      Votre compte a été créé avec succès. Vous pouvez maintenant accéder à votre tableau de bord et commencer à optimiser la gestion de votre pharmacie.
                    </p>
                    
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35] hover:from-[#5A8F35] hover:to-[#4D7C2C] text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Accéder à mon tableau de bord
                        <ArrowRight className="ml-3 w-5 h-5" />
                      </button>
                      
                      <p className="text-sm text-gray-500">
                        Un email de confirmation vous a été envoyé à <strong>{formData.email}</strong>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Vous avez déjà un compte ?{' '}
              <button 
                onClick={() => navigate('/login')} 
                className="font-semibold text-[#4D7C2C] hover:text-[#3A6322] hover:underline transition-colors"
              >
                Connectez-vous ici
              </button>
            </p>
            
            <div className="max-w-md mx-auto p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
              <p className="text-xs text-gray-500 leading-relaxed">
                En vous inscrivant, vous acceptez nos{' '}
                <button
                  onClick={() => navigate('/terms')}
                  className="text-[#4D7C2C] hover:underline font-semibold"
                >
                  conditions d'utilisation
                </button>{' '}
                et notre{' '}
                <button
                  onClick={() => navigate('/privacy')}
                  className="text-[#4D7C2C] hover:underline font-semibold"
                >
                  politique de confidentialité
                </button>
              </p>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-600">
                Besoin d'aide ?{' '}
                <button
                  onClick={() => navigate('/contact')}
                  className="font-semibold text-[#4D7C2C] hover:text-[#3A6322] hover:underline transition-colors"
                >
                  Contactez-nous
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;