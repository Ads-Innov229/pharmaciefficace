import { Outlet, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';

interface AuthLayoutProps {
  children?: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white p-6 sm:p-8 shadow-lg rounded-lg">
          {children || <Outlet />}
        </div>
        
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
      
      <Toaster position="top-right" />
    </div>
  );
}