import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';
import { User, Lock, Upload, Check, X, ChevronRight, Mail, Phone, Building } from 'lucide-react';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  avatar: string | null;
  createdAt: string;
  lastLogin: string;
}

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'pharmacy'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  // Données simulées de l'utilisateur
  const [user, setUser] = useState<UserProfile>({
    id: 'usr_123456',
    fullName: 'Dr. Aissatou Diallo',
    email: 'aissatou.diallo@pharmacie.sn',
    phone: '+221 77 123 45 67',
    role: 'Propriétaire',
    avatar: null,
    createdAt: '2023-01-15T10:30:00Z',
    lastLogin: '2023-06-15T14:22:10Z',
  });

  // Charger les données du profil
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);
        // Simulation de chargement des données
        await new Promise(resolve => setTimeout(resolve, 800));
        // Ici, vous récupérerez les données réelles de l'API
        // const response = await userService.getProfile();
        // setUser(response.user);
      } catch (error) {
        showToast('Erreur lors du chargement du profil', 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [showToast]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Simulation de sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici, vous enverrez les données mises à jour à l'API
      // await userService.updateProfile({ user, avatar: avatarFile });
      
      showToast('Profil mis à jour avec succès', 'success');
      setIsEditing(false);
    } catch (error) {
      showToast('Erreur lors de la mise à jour du profil', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mon Profil</h1>
            <p className="mt-1 text-sm text-gray-500">
              Gérez vos informations personnelles et les paramètres de votre compte
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
              {user.role}
            </span>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profil
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'security'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Sécurité
              </button>
              <button
                onClick={() => setActiveTab('pharmacy')}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === 'pharmacy'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ma Pharmacie
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'profile' && (
              <form onSubmit={handleSubmit}>
                <div className="space-y-8">
                  <div className="flex flex-col items-center md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="h-32 w-32 rounded-full bg-gray-200 overflow-hidden">
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Preview"
                              className="h-full w-full object-cover"
                            />
                          ) : user.avatar ? (
                            <img
                              src={user.avatar}
                              alt={user.fullName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full bg-green-100 flex items-center justify-center">
                              <User className="h-16 w-16 text-green-600" />
                            </div>
                          )}
                        </div>
                        {isEditing && (
                          <label className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                            <Upload className="h-5 w-5 text-gray-600" />
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleAvatarChange}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">Photo de profil</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Formats supportés: JPG, PNG, GIF. Taille maximale: 5MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                        Nom complet
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          id="fullName"
                          value={user.fullName}
                          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-900">{user.fullName}</p>
                      )}
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Adresse email
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          <Mail className="h-4 w-4" />
                        </span>
                        {isEditing ? (
                          <input
                            type="email"
                            id="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-l-0 border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          />
                        ) : (
                          <span className="flex-1 bg-white py-2 px-3 rounded-r-md border border-l-0 border-gray-300 text-sm text-gray-900">
                            {user.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Téléphone
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                          <Phone className="h-4 w-4" />
                        </span>
                        {isEditing ? (
                          <input
                            type="tel"
                            id="phone"
                            value={user.phone}
                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-l-0 border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                          />
                        ) : (
                          <span className="flex-1 bg-white py-2 px-3 rounded-r-md border border-l-0 border-gray-300 text-sm text-gray-900">
                            {user.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Membre depuis
                      </label>
                      <p className="mt-1 text-sm text-gray-900">
                        {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5">
                    <div className="flex justify-end space-x-3">
                      {!isEditing ? (
                        <button
                          type="button"
                          onClick={() => setIsEditing(true)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Modifier le profil
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              setIsEditing(false);
                              // Réinitialiser les modifications non sauvegardées
                              // Vous pourriez vouloir ajouter une confirmation ici
                            }}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                          >
                            <X className="-ml-1 mr-2 h-4 w-4" />
                            Annuler
                          </button>
                          <button
                            type="submit"
                            disabled={isSaving}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSaving ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Enregistrement...
                              </>
                            ) : (
                              <>
                                <Check className="-ml-1 mr-2 h-4 w-4" />
                                Enregistrer les modifications
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'security' && (
              <div className="text-center py-12">
                <Lock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Section Sécurité</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Cette section sera disponible dans une prochaine mise à jour.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Retour à l'accueil
                    <ChevronRight className="ml-2 -mr-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'pharmacy' && (
              <div className="text-center py-12">
                <Building className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Section Ma Pharmacie</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Cette section sera disponible dans une prochaine mise à jour.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Retour à l'accueil
                    <ChevronRight className="ml-2 -mr-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
