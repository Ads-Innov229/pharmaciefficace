import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import mockAuthService from '../api/mockAuthService';
import { User, AuthContextType } from './auth.types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on mount and route changes
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('Vérification de l\'authentification...');
        const isAuth = await mockAuthService.isAuthenticated();
        console.log('isAuthenticated:', isAuth);
        
        if (isAuth) {
          console.log('Utilisateur authentifié, récupération des données utilisateur...');
          const userData = await mockAuthService.getCurrentUser();
          console.log('Données utilisateur récupérées:', userData);
          setUser(userData);
          
          // Redirect to dashboard if already authenticated and on auth pages
          if (['/login', '/register', '/reset-password'].includes(location.pathname)) {
            console.log('Redirection vers /dashboard');
            navigate('/dashboard', { replace: true });
          }
        } else {
          console.log('Utilisateur non authentifié');
          if (!['/', '/login', '/register', '/reset-password', '/pharmacies', '/recherche', '/sondages', '/sondage', '/contact', '/survey/customer', '/survey/staff'].includes(location.pathname)) {
            console.log('Accès non autorisé, redirection vers /login');
            navigate('/login', { replace: true });
          }
        }
      } catch (error) {
        console.error('Authentication check failed:', error);
        // TODO: Add toast notification system
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [location.pathname, navigate]);

  const login = useCallback(async (email: string, password: string): Promise<void> => {
    try {
      console.log('Tentative de connexion avec:', email);
      setIsLoading(true);
      setError(null);
      
      console.log('Appel à mockAuthService.login...');
      const result = await mockAuthService.login(email, password);
      console.log('Résultat de mockAuthService.login:', result);
      
      setUser(result.user);
      console.log('Utilisateur défini dans le contexte');
      
      // Show success message
      // TODO: Add toast notification system
      
      // Redirect to dashboard or previous location
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Échec de la connexion';
      console.error('Login failed:', error);
      setError(message);
      // TODO: Add toast notification system
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location.state]);

  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      await mockAuthService.logout();
      setUser(null);
      setError(null);
      
      // TODO: Add toast notification system
      
      // Redirect to login page with current location for redirect back after login
      navigate('/login', { 
        state: { from: location },
        replace: true 
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erreur lors de la déconnexion';
      console.error('Logout failed:', error);
      setError(message);
      // TODO: Add toast notification system
    } finally {
      setIsLoading(false);
    }
  }, [navigate, location]);

  const contextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Export AuthContext as a named export
export { AuthContext };

export default AuthContext;
