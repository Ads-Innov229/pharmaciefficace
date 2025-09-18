import React, { useState, useEffect } from 'react';
import { User, Users, ArrowRight, Play, Star, Shield, Heart } from 'lucide-react';
import styles from './HeroSection.module.css';

// Données locales pour la section Hero
const heroData = {
  title: 'Bienvenue sur PharmaciEfficace',
  subtitle: 'La référence des pharmacies au Bénin pour une gestion optimale',
  backgroundImages: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    // Images intégrées pour le carrousel
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCABgAJYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUWEHInGBEzKRobHBFCNCUtHwFWJygsETMuHxFNLxJDc5OEo6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6err8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD/2Q=='
  ]
};

interface HeroSectionProps {
  onUserTypeSelect?: (type: 'client' | 'personnel') => void;
  onInscriptionOption?: (option: 'self' | 'help') => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onUserTypeSelect = () => {},
  onInscriptionOption = () => {}
}) => {
  const [showUserChoice, setShowUserChoice] = useState(false);
  const [showInscriptionOptions, setShowInscriptionOptions] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Carrousel d'images de fond
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroData.backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDonnezAvis = () => {
    setShowUserChoice(true);
  };

  const handleUserTypeSelect = (type: 'client' | 'personnel') => {
    onUserTypeSelect(type);
  };

  const handleInscriptionPharmacieClick = () => {
    setShowInscriptionOptions(true);
  };

  const handleInscriptionOption = (option: 'self' | 'help') => {
    onInscriptionOption(option);
  };

  // Témoignages en arrière-plan
  const testimonialImages = [
    {
      src: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      alt: 'Médecin professionnel satisfait',
      position: 'top-20 left-10'
    },
    {
      src: 'https://images.unsplash.com/photo-1594824154520-4c7e7ec5f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      alt: 'Pharmacienne souriante',
      position: 'top-32 right-16'
    },
    {
      src: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      alt: 'Équipe pharmaceutique',
      position: 'bottom-24 left-20'
    }
  ];

  return (
    <section 
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ 
        backgroundImage: `linear-gradient(135deg, rgba(77, 124, 44, 0.9), rgba(90, 143, 53, 0.95)), url(${heroData.backgroundImages[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out'
      }}
    >
      {/* Overlay animé avec dégradé vert-orange */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600/80 via-green-700/70 to-orange-500/60"></div>
      
      {/* Formes décoratives */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-green-400/20 rounded-full blur-2xl"></div>
      </div>

      {/* Images de témoignages flottantes */}
      <div className="absolute inset-0 hidden lg:block">
        {testimonialImages.map((img, index) => (
          <div 
            key={index} 
            className={`absolute ${img.position} opacity-20 hover:opacity-40 transition-all duration-500`}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl transform hover:scale-110 transition-transform duration-300">
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 sm:px-8 lg:px-10 py-24 text-center">
        {/* Badge avec animation */}
        <div className={`inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8 border border-white/30 shadow-lg ${styles['animateFadeIn']}`}>
          <div className="w-3 h-3 bg-green-400 rounded-full mr-3 animate-pulse"></div>
          <Star className="w-4 h-4 mr-2 text-orange-300" />
          Plateforme certifiée et sécurisée
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          Bienvenue sur
          <br />
          <span className="bg-gradient-to-r from-orange-300 to-orange-500 bg-clip-text text-transparent">
            PharmaciEfficace
          </span>
        </h1>

        <p className="text-xl text-gray-50 font-medium mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
          La référence des pharmacies au Bénin pour une gestion optimale et une amélioration continue des services
        </p>

        {!showUserChoice && !showInscriptionOptions ? (
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {/* Bouton principal avec effet spécial */}
            <button 
              onClick={handleDonnezAvis}
              className="group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-lg px-12 py-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-orange-500/25"
            >
              <span className="flex items-center relative z-10">
                <Heart className="mr-3 w-5 h-5" />
                Donnez votre avis
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
            </button>

            {/* Bouton secondaire */}
            <button 
              onClick={handleInscriptionPharmacieClick}
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-lg px-10 py-5 rounded-xl transition-all duration-300 border-2 border-white/30 hover:border-white/50 flex items-center justify-center shadow-xl"
            >
              <Shield className="mr-3 w-5 h-5" />
              Inscrire ma pharmacie
            </button>
          </div>
        ) : showUserChoice ? (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 max-w-lg mx-auto border-2 border-white/20 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-8">Qui êtes-vous ?</h3>
            <div className="space-y-4">
              <button 
                onClick={() => handleUserTypeSelect('client')}
                className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-5 px-8 rounded-xl transition-all duration-200 flex items-center justify-between group shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center">
                  <User className="w-6 h-6 mr-4 text-green-600" />
                  <span className="text-lg">Je suis client</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-green-600" />
              </button>
              
              <button 
                onClick={() => handleUserTypeSelect('personnel')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-5 px-8 rounded-xl transition-all duration-200 flex items-center justify-between group shadow-lg hover:shadow-xl"
              >
                <div className="flex items-center">
                  <Users className="w-6 h-6 mr-4" />
                  <span className="text-lg">Je suis du personnel</span>
                </div>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setShowUserChoice(false)}
                className="text-white/70 hover:text-white text-sm underline mt-6 transition-colors"
              >
                ← Retour
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 max-w-lg mx-auto border-2 border-white/20 shadow-2xl">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl font-semibold text-white mb-8">Comment souhaitez-vous procéder ?</h3>
            <div className="space-y-4">
              <button 
                onClick={() => handleInscriptionOption('self')}
                className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-5 px-8 rounded-xl transition-all duration-200 flex items-center justify-between group shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">Je m'inscris moi-même</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-green-600" />
              </button>
              
              <button 
                onClick={() => handleInscriptionOption('help')}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-5 px-8 rounded-xl transition-all duration-200 flex items-center justify-between group shadow-lg hover:shadow-xl"
              >
                <span className="text-lg">Me faire aider</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => setShowInscriptionOptions(false)}
                className="text-white/70 hover:text-white text-sm underline mt-6 transition-colors"
              >
                ← Retour
              </button>
            </div>
          </div>
        )}

        {/* Section d'informations - Objectifs de la plateforme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <User className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Avis anonymes</h4>
            <p className="text-white/90 leading-relaxed">Exprimez-vous librement pour améliorer les services pharmaceutiques</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Gestion optimisée</h4>
            <p className="text-white/90 leading-relaxed">Optimisez la collaboration et l'efficacité de votre équipe</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play className="w-8 h-8 text-white" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Amélioration continue</h4>
            <p className="text-white/90 leading-relaxed">Renforcez la qualité de vos services grâce aux retours</p>
          </div>
        </div>

        {/* Avantages de participer */}
        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/20 max-w-5xl mx-auto shadow-2xl">
          <h3 className="text-3xl font-semibold text-white mb-8">Pourquoi rejoindre PharmaciEfficace ?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white/95 text-lg leading-relaxed">Amélioration de la satisfaction client grâce aux retours constructifs</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white/95 text-lg leading-relaxed">Optimisation des processus internes et de la gestion d'équipe</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white/95 text-lg leading-relaxed">Anonymat garanti pour des avis sincères et constructifs</p>
            </div>
            <div className="flex items-start space-x-4">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-white/95 text-lg leading-relaxed">Tableaux de bord intuitifs pour un suivi en temps réel</p>
            </div>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300 mb-2">150+</div>
              <p className="text-white/80 text-sm">Pharmacies satisfaites</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">98%</div>
              <p className="text-white/80 text-sm">Taux de satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-300 mb-2">3</div>
              <p className="text-white/80 text-sm">Pays couverts</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">24/7</div>
              <p className="text-white/80 text-sm">Support disponible</p>
            </div>
          </div>
        </div>
      </div>

      {/* Indicateur de scroll animé */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-green-400 to-orange-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Animation styles are now in HeroSection.module.css */}
    </section>
  );
};