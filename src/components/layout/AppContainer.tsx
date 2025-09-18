import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

interface AppContainerProps {
  children?: ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  return (
    <div className="w-full flex-1 flex flex-col">
      {/* En-tête */}
      <header className="bg-white shadow-sm w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">PharmacEfficace</h1>
            <nav>
              <ul className="flex space-x-6">
                <li><a href="/" className="text-gray-600 hover:text-gray-900">Accueil</a></li>
                <li><a href="/pharmacies" className="text-gray-600 hover:text-gray-900">Pharmacies</a></li>
                <li><a href="/recherche" className="text-gray-600 hover:text-gray-900">Recherche</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="flex-1 w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children || <Outlet />}
        </div>
      </main>

      {/* Pied de page */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} PharmacEfficace. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AppContainer;
