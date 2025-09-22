import { Mail, Phone, MapPin, Clock, Facebook, Twitter, Linkedin, Instagram, Shield, Heart, Star as Award, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Pharmacies', path: '/pharmacies' },
    { name: 'À propos', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Support', path: '/support' },
  ];

  const legalLinks = [
    { name: 'Mentions légales', path: '/legal' },
    { name: 'Politique de confidentialité', path: '/privacy' },
    { name: 'Conditions d\'utilisation', path: '/terms' },
    { name: 'Politique de cookies', path: '/cookies' },
  ];

  const contactInfo = [
    { 
      icon: <Mail className="w-4 h-4" />, 
      text: 'contact@pharmaciefficace.bj',
      url: 'mailto:contact@pharmaciefficace.bj'
    },
    { 
      icon: <Phone className="w-4 h-4" />, 
      text: '+229 21 30 40 50',
      url: 'tel:+22921304050'
    },
    { 
      icon: <MapPin className="w-4 h-4" />, 
      text: 'Cotonou, Littoral, Bénin'
    },
    { 
      icon: <Clock className="w-4 h-4" />, 
      text: 'Lun - Ven: 8h00 - 18h00'
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-400 hover:bg-blue-50' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'hover:text-sky-400 hover:bg-sky-50' },
    { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-600 hover:bg-blue-50' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'hover:text-pink-500 hover:bg-pink-50' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-green-50 text-gray-700 relative overflow-hidden border-t border-gray-200">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-orange-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-20"></div>
      </div>
      <div className="relative w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center shadow-md">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-gray-800">
                    Pharmaci<span className="text-orange-500">E</span>fficace
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  La plateforme de référence pour l'amélioration continue des services pharmaceutiques au Bénin et en Afrique.
                </p>
              </div>

              {/* Badges de confiance avec nouvelles couleurs */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                  <Shield className="w-3 h-3 mr-1.5" />
                  Sécurisé
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-orange-100 text-orange-700 border border-orange-200">
                  <Heart className="w-3 h-3 mr-1.5" />
                  150+ pharmacies
                </span>
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                  <Award className="w-3 h-3 mr-1.5" />
                  Certifié
                </span>
              </div>

              {/* Réseaux sociaux optimisés */}
              <div className="flex space-x-3">
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url} 
                    className={`w-11 h-11 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-500 transition-all duration-300 hover:border-transparent hover:shadow-lg hover:scale-110 ${social.color}`}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Colonne 2: Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800">Navigation</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-600 hover:text-green-700 transition-all duration-200 text-sm flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-green-600" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3: Légal */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800">Informations légales</h3>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-600 hover:text-orange-600 transition-all duration-200 text-sm flex items-center group"
                    >
                      <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-orange-500" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 4: Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-gray-800">Nous contacter</h3>
              <ul className="space-y-4">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      {item.url ? (
                        <a 
                          href={item.url}
                          className="text-gray-600 hover:text-green-700 transition-colors duration-200 text-sm hover:underline"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span className="text-gray-600 text-sm">
                          {item.text}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Bouton de contact email */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-800 mb-3">Contactez-nous</h4>
                <p className="text-xs text-gray-600 mb-4">Une question ? Envoyez-nous un email</p>
                <a 
                  href="mailto:contact@pharmaciefficace.bj" 
                  className="inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Envoyer un email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;