import React from 'react';
import { Navbar } from '../components/layout/Navbar';

// Version avec Navbar ajoutée
const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-8">
      <h1 className="text-3xl font-bold text-center text-blue-600">
        Bienvenue sur PharmaciEfficace
      </h1>
      <p className="mt-4 text-center text-gray-700">
        Version minimale de la page d'accueil
      </p>
      </div>
    </div>
  );
};

export default Home;