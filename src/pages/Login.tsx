import React, { useState, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, Eye, EyeOff, UserCheck, ArrowRight, Mail } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { AuthContext } from '@/context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext doit être utilisé à l\'intérieur d\'un AuthProvider');
  }

  const { login } = authContext;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      showToast('Veuillez remplir tous les champs', 'error');
      return;
    }
    
    setLoading(true);
    
    try {
      await login(email, password);
      
      // Récupérer l'URL de redirection depuis l'état de la localisation ou utiliser le tableau de bord par défaut
      const from = location.state?.from?.pathname || '/dashboard';
      
      showToast('Connexion réussie !', 'success');
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue lors de la connexion';
      console.error('Erreur de connexion:', error);
      showToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-1/4 w-3/4 h-3/4 bg-[#4D7C2C]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-[#E57325]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-md w-full mx-auto relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-2xl">
          <div className="p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 rounded-2xl bg-gradient-to-br from-[#4D7C2C] to-[#5A8F35] flex items-center justify-center shadow-lg mb-6 transform transition-transform duration-300 hover:scale-105">
                <UserCheck className="w-9 h-9 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 font-['Poppins']">
                Connexion
              </h1>
              <p className="text-gray-600 text-base font-['Roboto']">
                Accédez à votre espace personnel
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-5">
                {/* Champ Email */}
                <div>
                  <label htmlFor="email-address" className="block text-sm font-semibold text-gray-700 mb-2 font-['Roboto']">
                    Adresse email
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-[#4D7C2C] transition-colors" />
                    </div>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#4D7C2C] transition-all duration-300 font-['Roboto'] text-gray-900 bg-gray-50/50 focus:bg-white"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Champ Mot de passe */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2 font-['Roboto']">
                    Mot de passe
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-[#4D7C2C] transition-colors" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-2xl placeholder-gray-400 focus:outline-none focus:ring-0 focus:border-[#4D7C2C] transition-all duration-300 font-['Roboto'] text-gray-900 bg-gray-50/50 focus:bg-white"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-[#4D7C2C] transition-colors focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center">
                  <div className="flex items-center h-5">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#4D7C2C] focus:ring-[#4D7C2C] border-gray-300 rounded transition duration-150"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                  </div>
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 font-['Roboto'] cursor-pointer">
                    Se souvenir de moi
                  </label>
                </div>

                <div className="text-sm w-full sm:w-auto text-right">
                  <a href="/forgot-password" className="font-medium text-[#4D7C2C] hover:text-[#3A6322] transition-colors hover:underline">
                    Mot de passe oublié ?
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-3.5 px-6 border border-transparent text-base font-medium rounded-xl text-white ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#4D7C2C] to-[#5A8F35] hover:from-[#5A8F35] hover:to-[#4D7C2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4D7C2C] shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.98]'
                  } font-['Roboto']`}
                >
                  <span className="flex items-center">
                    {loading ? 'Connexion en cours...' : 'Se connecter'}
                    {!loading && <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                  </span>
                </button>
              </div>
            </form>

            {/* Lien d'inscription */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-center text-sm text-gray-600 mb-4 font-['Roboto']">
                Nouveau sur la plateforme ?
              </p>
              <a
                href="/register"
                className="w-full inline-flex items-center justify-center px-4 py-3.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-[#4D7C2C] hover:text-[#4D7C2C] transition-all duration-200 font-['Roboto'] hover:shadow-sm group"
              >
                Créer un compte
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Footer Note */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-xs text-center text-gray-500 font-['Roboto']">
                En vous connectant, vous acceptez nos{' '}
                <a href="/terms" className="text-[#4D7C2C] hover:underline font-medium">
                  conditions d'utilisation
                </a>{' '}
                et notre{' '}
                <a href="/privacy" className="text-[#4D7C2C] hover:underline font-medium">
                  politique de confidentialité
                </a>
              </p>
            </div>
            
            {/* Section d'aide */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 font-['Roboto']">
                Besoin d'aide ?{' '}
                <button
                  onClick={() => navigate('/contact')}
                  className="text-[#4D7C2C] hover:underline font-semibold focus:outline-none transition-colors"
                >
                  Contactez-nous
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;