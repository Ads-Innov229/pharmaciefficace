import React, { useContext, Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthContext, AuthProvider } from '@/context/AuthContext';
import { QueryClientProvider, QueryErrorResetBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { Toaster } from 'react-hot-toast';
import { queryClient } from '@/lib/queryClient';

// Types
import type { PropsWithChildren } from 'react';

// Interface pour les routes protégées
interface PrivateRouteProps extends PropsWithChildren {
  allowedRoles?: string[];  // Pour la gestion des rôles
}

// Pages - Chargement paresseux pour le code splitting
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register.fixed'));
const ResetPassword = lazy(() => import('@/pages/ResetPassword'));
const ChangePassword = lazy(() => import('@/pages/ChangePassword'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Profile = lazy(() => import('@/pages/Profile'));
// Page d'accueil principale
const Home = lazy(() => import('@/pages/Home'));
const Pharmacies = lazy(() => import('@/pages/PharmaciesPage') as unknown as Promise<{ default: React.ComponentType }>);
const SondagesPage = lazy(() => import('@/pages/SondagesPage'));
const SurveyPage = lazy(() => import('@/pages/SurveyPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
import ClientSurveyForm from '@/components/surveys/CustomerSurveyForm';
const StaffSurveyForm = lazy(() => import('@/components/surveys/StaffSurveyForm'));

// Composants de chargement et d'erreur
const LoadingFallback = () => (
  <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)]">
    <div className="w-16 h-16 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Quelque chose s'est mal passé</h2>
      <pre className="text-red-500 mb-4">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-700 transition-colors"
      >
        Réessayer
      </button>
    </div>
  );
};

// Composant pour les routes protégées
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const context = useContext(AuthContext);
  const location = useLocation();
  
  if (!context) {
    throw new Error("PrivateRoute doit être utilisé à l'intérieur d'un AuthProvider");
  }
  
  const { isAuthenticated, user } = context;
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Vérification des rôles si spécifiés
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />
              )}
            >
              <Suspense fallback={<LoadingFallback />}>
                <div className="min-h-screen w-full flex flex-col">
                  <Routes>
                    {/* Routes publiques */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                    <Route path="/pharmacies" element={<Pharmacies />} />
                    <Route path="/sondages" element={<SondagesPage />} />
                    <Route path="/sondage" element={<SurveyPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route 
                      path="/survey/customer" 
                      element={
                        <ClientSurveyForm 
                          onSubmit={(data) => {
                            console.log('Données du sondage client:', data);
                            // Ici, vous pourriez envoyer les données à votre API
                            alert('Merci pour votre avis !');
                            window.location.href = '/';
                          }} 
                          onBack={() => window.history.back()} 
                        />
                      } 
                    />
                    <Route 
                      path="/survey/staff" 
                      element={
                        <StaffSurveyForm 
                          onSubmit={(data) => {
                            console.log('Données du sondage personnel:', data);
                            // Ici, vous pourriez envoyer les données à votre API
                            alert('Merci pour votre retour !');
                            window.location.href = '/';
                          }} 
                          onBack={() => window.history.back()}
                        />
                      } 
                    />

                    {/* Routes protégées */}
                    <Route
                      path="/dashboard"
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      }
                    />
                    
                    {/* Redirection pour les routes inconnues */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
        <Toaster position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;