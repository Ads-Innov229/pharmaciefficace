import { useState } from 'react';
import { User, Mail, Lock, Building2, Phone, MapPin, ArrowRight, Eye, EyeOff } from 'lucide-react';

type FormData = {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  nomPharmacie: string;
  adresse: string;
  password: string;
  confirmPassword: string;
};

type ToastType = 'success' | 'error' | 'warning' | 'info';

const useToast = () => ({
  showToast: (message: string, type: ToastType) => {
    if (type === 'error') {
      alert('❌ ' + message);
    } else {
      alert('✅ ' + message);
    }
  }
});

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    nomPharmacie: '',
    adresse: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });
  const { showToast } = useToast();

  const navigate = (path: string) => {
    console.log(`Navigation vers: ${path}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.prenom || !formData.nom || !formData.email) {
        showToast('Veuillez remplir tous les champs requis', 'error');
        return;
      }
    } else if (step === 2) {
      if (!formData.nomPharmacie || !formData.adresse || !formData.password) {
        showToast('Veuillez remplir tous les champs de la pharmacie', 'error');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        showToast('Les mots de passe ne correspondent pas', 'error');
        return;
      }
    } else if (step === 3) {
      if (!paymentMethod) {
        showToast('Veuillez sélectionner un mode de paiement', 'error');
        return;
      }
      if (paymentMethod === 'card' && (
        !paymentDetails.cardNumber || 
        !paymentDetails.expiryDate || 
        !paymentDetails.cvv
      )) {
        showToast('Veuillez remplir tous les détails de paiement', 'error');
        return;
      }
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => setStep(prev => prev - 1);

  const getPasswordStrength = () => {
    const p = formData.password;
    let strength = 0;
    if (p.length >= 8) strength++;
    if (/\d/.test(p)) strength++;
    if (/[A-Z]/.test(p)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(p)) strength++;
    return Math.min(strength, 4);
  };

  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const strengthLabels = ['Faible', 'Moyen', 'Bon', 'Excellent'];
  const currentStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="flex items-center justify-center p-4">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#4D7C2C]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#E57325]/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4D7C2C] to-[#5A8F35] flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <h2 className="text-3xl font-semibold text-gray-900 mb-2 font-['Poppins']">
                Créer un compte
              </h2>
              <p className="text-gray-600 mb-6 font-['Roboto']">
                Rejoignez notre réseau de pharmacies
              </p>
            </div>

            <div className="px-8 pb-8">
              {/* Progress steps */}
              <div className="mb-8">
                <div className="flex items-center justify-between max-w-3xl mx-auto relative">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div key={stepNumber} className="flex flex-col items-center relative z-10">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300
                          ${step >= stepNumber ? 'bg-[#4D7C2C] text-white' : 'bg-gray-200 text-gray-500'}`}
                      >
                        {stepNumber}
                      </div>
                      <span className="text-xs mt-2 text-center">
                        {stepNumber === 1 && 'Informations'}
                        {stepNumber === 2 && 'Pharmacie'}
                        {stepNumber === 3 && 'Paiement'}
                        {stepNumber === 4 && 'Validation'}
                      </span>
                      {stepNumber < 4 && (
                        <div className="absolute top-5 left-10 w-24 h-1 -ml-2">
                          <div className={`h-full ${step > stepNumber ? 'bg-[#4D7C2C]' : 'bg-gray-200'} transition-colors duration-300`}></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6">
                {step === 1 && (
                  <div className="space-y-6">
                    {/* Step 1 content */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Vos informations personnelles</h3>
                      <p className="text-gray-600">Commençons par vous connaître</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="prenom"
                          name="prenom"
                          type="text"
                          required
                          value={formData.prenom}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C] focus:border-transparent"
                          placeholder="Votre prénom"
                        />
                      </div>
                      <div>
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="nom"
                          name="nom"
                          type="text"
                          required
                          value={formData.nom}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C] focus:border-transparent"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">
                          Téléphone <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="telephone"
                            name="telephone"
                            type="tel"
                            required
                            value={formData.telephone}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="+229 XX XX XX XX"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="flex items-center px-6 py-3 rounded-xl text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        Suivant
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Votre pharmacie & sécurité</h3>
                      <p className="text-gray-600">Finalisez votre inscription</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label htmlFor="nomPharmacie" className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de la pharmacie <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Building2 className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="nomPharmacie"
                            name="nomPharmacie"
                            type="text"
                            required
                            value={formData.nomPharmacie}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Pharmacie du Centre"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="adresse" className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse de la pharmacie <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MapPin className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="adresse"
                            name="adresse"
                            type="text"
                            required
                            value={formData.adresse}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Adresse complète de la pharmacie"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de passe <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                            )}
                          </button>
                        </div>
                        {formData.password && (
                          <div className="mt-2">
                            <div className="flex space-x-1">
                              {[0, 1, 2, 3].map((i) => {
                                const strengthIndex = Math.max(0, currentStrength - 1);
                                const strengthClass = i < currentStrength 
                                  ? strengthColors[strengthIndex] 
                                  : 'bg-gray-200';
                                return (
                                  <div
                                    key={i}
                                    className={`h-1 flex-1 rounded-full ${strengthClass}`}
                                  />
                                );
                              })}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              Force du mot de passe: {strengthLabels[Math.max(0, currentStrength - 1)] || 'Faible'}
                            </p>
                          </div>
                        )}
                      </div>

                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le mot de passe <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            required
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                            ) : (
                              <Eye className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            checked={acceptTerms}
                            onChange={(e) => setAcceptTerms(e.target.checked)}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="acceptTerms" className="font-medium text-gray-700">
                            J'accepte les <a href="/terms" className="text-[#4D7C2C] hover:underline">conditions d'utilisation</a> et la <a href="/privacy" className="text-[#4D7C2C] hover:underline">politique de confidentialité</a>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Retour
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!acceptTerms}
                        className={`px-6 py-3 rounded-xl text-white flex items-center transition-colors ${acceptTerms ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'}`}
                      >
                        Continuer
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Méthode de paiement</h3>
                      <p className="text-gray-600">Choisissez comment vous souhaitez payer</p>
                    </div>

                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full p-4 rounded-xl border-2 text-left ${
                          paymentMethod === 'card' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>Carte bancaire</span>
                          {paymentMethod === 'card' && (
                            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('paypal')}
                        className={`w-full p-4 rounded-xl border-2 text-left ${
                          paymentMethod === 'paypal' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>PayPal</span>
                          {paymentMethod === 'paypal' && (
                            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('kkiapay')}
                        className={`w-full p-4 rounded-xl border-2 text-left ${
                          paymentMethod === 'kkiapay' ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>KkiaPay</span>
                          {paymentMethod === 'kkiapay' && (
                            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </button>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 mt-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de carte</label>
                          <input
                            type="text"
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C] focus:border-transparent"
                            value={paymentDetails.cardNumber}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date d'expiration</label>
                            <input
                              type="text"
                              placeholder="MM/AA"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C] focus:border-transparent"
                              value={paymentDetails.expiryDate}
                              onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                            <input
                              type="text"
                              placeholder="123"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C] focus:border-transparent"
                              value={paymentDetails.cvv}
                              onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Nom sur la carte</label>
                          <input
                            type="text"
                            placeholder="Nom Prénom"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#4D7C2C] focus:border-transparent"
                            value={paymentDetails.cardName}
                            onChange={(e) => setPaymentDetails({...paymentDetails, cardName: e.target.value})}
                          />
                        </div>
                      </div>
                    )}

                    {paymentMethod === 'paypal' && (
                      <div className="p-6 bg-gray-50 rounded-xl text-center mt-6">
                        <p className="text-gray-600 mb-4">Vous serez redirigé vers PayPal pour finaliser votre paiement</p>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-xl transition-colors"
                        >
                          Payer avec PayPal
                        </button>
                      </div>
                    )}

                    {paymentMethod === 'kkiapay' && (
                      <div className="p-6 bg-gray-50 rounded-xl text-center mt-6">
                        <p className="text-gray-600 mb-4">Paiement sécurisé via KkiaPay</p>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors"
                        >
                          Payer avec KkiaPay
                        </button>
                      </div>
                    )}

                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Retour
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl flex items-center transition-colors"
                      >
                        Continuer
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {step === 4 && (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Inscription validée !</h3>
                    <p className="text-gray-600 mb-8">Votre compte a été créé avec succès. Un email de confirmation vous a été envoyé.</p>
                    <button
                      type="button"
                      onClick={() => navigate('/login')}
                      className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35] hover:from-[#5A8F35] hover:to-[#4D7C2C] text-white font-medium rounded-xl transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      Se connecter
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-100 px-8 pb-8">
        <p className="text-sm text-gray-600 mb-4 font-['Roboto']">
          Vous avez déjà un compte ?{' '}
          <button 
            onClick={() => navigate('/login')} 
            className="font-medium text-[#4D7C2C] hover:underline"
          >
            Connectez-vous ici
          </button>
        </p>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-xl">
          <p className="text-xs text-center text-gray-500 font-['Roboto']">
            En vous inscrivant, vous acceptez nos{' '}
            <a href="/terms" className="text-[#4D7C2C] hover:underline">
              conditions d'utilisation
            </a>{' '}
            et notre{' '}
            <a href="/privacy" className="text-[#4D7C2C] hover:underline">
              politique de confidentialité
            </a>
          </p>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Besoin d'aide ?{' '}
            <button
              onClick={() => navigate('/contact')}
              className="font-medium text-[#4D7C2C] hover:underline"
            >
              Contactez-nous
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
