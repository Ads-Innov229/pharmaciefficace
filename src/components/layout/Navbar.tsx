import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  ChevronDown, 
  Home,
  MapPin,
  Phone,
  BarChart3,
  FileText,
  Settings,
  Bell
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

// Assets
import logo from '../../assets/logo1.png';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const userMenuRef = useRef<HTMLDivElement>(null);
  
  // Gérer le scroll pour l'effet de navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fermer le menu utilisateur en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setShowUserMenu(false);
    setIsOpen(false);
  };

  const publicLinks = [
    { 
      label: 'Accueil', 
      path: '/', 
      icon: Home,
      highlight: false
    },
    { 
      label: 'Pharmacies', 
      path: '/pharmacies', 
      icon: MapPin,
      highlight: false
    },
    { 
      label: 'Contact', 
      path: '/contact', 
      icon: Phone,
      highlight: false
    },
  ];

  const authLinks = user?.role === 'responsable' 
    ? [
        { label: 'Tableau de bord', path: '/dashboard', icon: BarChart3 },
        { label: 'Rapports', path: '/rapports', icon: FileText },
        { label: 'Sondages', path: '/sondages', icon: Settings },
      ]
    : [];

  const userMenuItems = [
    { label: 'Votre profil', path: '/profile', icon: User },
    { label: 'Paramètres', path: '/settings', icon: Settings },
    { label: 'Notifications', path: '/notifications', icon: Bell },
  ];

  return (
    <nav className={`
      bg-white shadow-sm sticky top-0 z-50 w-full border-b border-gray-100 
      transition-all duration-300 ease-out
      ${scrolled ? 'shadow-md backdrop-blur-sm bg-white/95' : 'shadow-sm'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex-shrink-0 flex items-center group"
              onClick={() => setIsOpen(false)}
            >
              <img 
                src={logo} 
                alt="Logo PharmaciEfficace" 
                className="h-14 w-auto transition-transform duration-200 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Navigation desktop */}
          <div className="hidden md:flex items-center space-x-2">
            {publicLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center gap-2 font-medium px-4 py-2.5 rounded-lg 
                    transition-all duration-200 relative group
                    ${
                      isActive(link.path)
                        ? 'bg-green-50 text-green-700 font-semibold shadow-sm'
                        : link.highlight
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                        : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                    }
                  `}
                >
                  <IconComponent className="h-4 w-4" />
                  {link.label}
                  {isActive(link.path) && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-600 rounded-full" />
                  )}
                </Link>
              );
            })}
            
            {/* Menu authentifié */}
            {isAuthenticated ? (
              <>
                {/* Liens du rôle */}
                {authLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      className={`
                        flex items-center gap-2 font-medium px-4 py-2.5 rounded-lg 
                        transition-all duration-200 relative
                        ${
                          isActive(link.path)
                            ? 'bg-orange-50 text-orange-700 font-semibold shadow-sm'
                            : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50'
                        }
                      `}
                    >
                      <IconComponent className="h-4 w-4" />
                      {link.label}
                    </Link>
                  );
                })}

                {/* Menu utilisateur */}
                <div className="ml-4 relative" ref={userMenuRef}>
                  <button
                    type="button"
                    className="flex items-center gap-2 text-sm rounded-lg px-3 py-2
                             focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                             transition-all duration-200 hover:bg-gray-50 group"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    aria-expanded={showUserMenu}
                    aria-haspopup="true"
                  >
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-400 to-green-600 
                                   flex items-center justify-center text-white shadow-md 
                                   group-hover:shadow-lg transition-shadow">
                      <User className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-gray-700 group-hover:text-green-700">
                      {user?.prenom || 'Mon compte'}
                    </span>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 
                                          ${showUserMenu ? 'rotate-180' : 'rotate-0'}`} />
                  </button>

                  {/* Dropdown menu */}
                  {showUserMenu && (
                    <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-xl 
                                   shadow-lg bg-white ring-1 ring-black ring-opacity-5 
                                   focus:outline-none z-50 py-2 animate-in slide-in-from-top-2 
                                   fade-in-0 duration-200">
                      
                      {/* Header utilisateur */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 
                                         flex items-center justify-center text-white shadow-md">
                            <User className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {user?.prenom} {user?.nom}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {user?.email}
                            </p>
                            {user?.role && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs 
                                             font-medium bg-green-100 text-green-800 mt-1">
                                {user.role}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-2">
                        {userMenuItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={item.path}
                              to={item.path}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 
                                       hover:bg-green-50 hover:text-green-700 transition-colors duration-150"
                              onClick={() => setShowUserMenu(false)}
                            >
                              <IconComponent className="h-4 w-4" />
                              {item.label}
                            </Link>
                          );
                        })}
                        
                        <hr className="my-2 border-gray-100" />
                        
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 w-full px-4 py-2.5 text-left text-sm 
                                   text-red-600 hover:bg-red-50 hover:text-red-700 
                                   transition-colors duration-150 group"
                        >
                          <LogOut className="h-4 w-4" />
                          Se déconnecter
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Boutons de connexion */
              <div className="flex items-center gap-3 ml-4">
                <Link
                  to="/login"
                  className="inline-flex items-center px-4 py-2.5 border-2 border-green-600 
                           text-sm font-semibold rounded-lg text-green-700 bg-transparent 
                           hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 
                           focus:ring-offset-2 transition-all duration-200"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center px-4 py-2.5 border-2 border-transparent 
                           text-sm font-semibold rounded-lg text-white bg-gradient-to-r 
                           from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 
                           transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-green-700 focus:outline-none focus:ring-2 
                       focus:ring-green-500 focus:ring-offset-2 rounded-lg p-2 
                       transition-colors duration-200"
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          id="mobile-menu"
          className={`
            md:hidden transition-all duration-300 ease-in-out overflow-hidden
            ${isOpen 
              ? 'max-h-screen opacity-100 border-t border-gray-200' 
              : 'max-h-0 opacity-0'
            }
          `}
        >
          <div className="px-2 pt-4 pb-6 space-y-2 bg-white">
            
            {/* Liens publics */}
            {publicLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl
                    transition-all duration-200
                    ${
                      isActive(link.path)
                        ? 'bg-green-50 text-green-700 font-semibold shadow-sm'
                        : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}

            {/* Liens authentifiés */}
            {isAuthenticated && authLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl
                    transition-all duration-200
                    ${
                      isActive(link.path)
                        ? 'bg-orange-50 text-orange-700 font-semibold shadow-sm'
                        : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                    }
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="h-5 w-5" />
                  {link.label}
                </Link>
              );
            })}

            {/* Section utilisateur mobile */}
            {isAuthenticated ? (
              <div className="pt-6 border-t border-gray-200 mt-6">
                {/* Info utilisateur */}
                <div className="flex items-center gap-3 px-4 py-3 mb-4 bg-gray-50 rounded-xl">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 
                                 flex items-center justify-center text-white shadow-md">
                    <User className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-base font-semibold text-gray-800 truncate">
                      {user?.prenom} {user?.nom}
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </div>
                    {user?.role && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs 
                                     font-medium bg-green-100 text-green-800 mt-1">
                        {user.role}
                      </span>
                    )}
                  </div>
                </div>

                {/* Menu utilisateur */}
                <div className="space-y-1">
                  {userMenuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium 
                                 text-gray-600 hover:bg-green-50 hover:text-green-700 
                                 rounded-xl transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                      >
                        <IconComponent className="h-5 w-5" />
                        {item.label}
                      </Link>
                    );
                  })}
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-base 
                             font-medium text-red-600 hover:bg-red-50 hover:text-red-700 
                             rounded-xl transition-colors duration-200"
                  >
                    <LogOut className="h-5 w-5" />
                    Se déconnecter
                  </button>
                </div>
              </div>
            ) : (
              /* Boutons de connexion mobile */
              <div className="pt-6 border-t border-gray-200 mt-6 space-y-3">
                <Link
                  to="/login"
                  className="block w-full text-center bg-transparent text-green-700 border-2 
                           border-green-600 px-4 py-3 rounded-xl font-semibold 
                           hover:bg-green-50 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="block w-full text-center bg-gradient-to-r from-green-600 to-green-700 
                           text-white px-4 py-3 rounded-xl font-semibold hover:from-green-700 
                           hover:to-green-800 transition-all duration-200 shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  S'inscrire
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};