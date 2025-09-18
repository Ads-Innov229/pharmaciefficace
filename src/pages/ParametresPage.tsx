import React, { useState } from 'react';
import { 
  User, Lock, Bell, Save, X, 
  Shield, Eye, EyeOff, Edit
} from 'lucide-react';

// Note: Pencil icon is not available in lucide-react, using Edit as a fallback
const Pencil = Edit;

// Custom CreditCard component since it's not available in lucide-react
const CreditCard = ({ className = '' }: { className?: string }) => (
  <svg 
    className={className}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);
import { ProtectedLayout } from '@/components/layout/ProtectedLayout';

const ParametresPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profil');
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@pharma-benin.bj',
    telephone: '+229 12 34 56 78',
    adresse: '123 Rue des Pharmacies',
    ville: 'Cotonou',
    pays: 'Bénin',
    photo: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de sauvegarde ici
    setIsEditing(false);
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          photo: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <ProtectedLayout 
      title="Paramètres"
      subtitle="Gérez vos préférences et vos informations personnelles"
    >
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Paramètres du compte
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Gérez vos informations personnelles et vos préférences de compte.
            </p>
          </div>
          
          <div className="bg-gray-50 px-4 py-5 sm:p-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('profil')}
                  className={`${
                    activeTab === 'profil'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <User className="inline-block h-5 w-5 mr-2 -mt-1" />
                  Profil
                </button>
                <button
                  onClick={() => setActiveTab('securite')}
                  className={`${
                    activeTab === 'securite'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <Lock className="inline-block h-5 w-5 mr-2 -mt-1" />
                  Sécurité
                </button>
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`${
                    activeTab === 'notifications'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <Bell className="inline-block h-5 w-5 mr-2 -mt-1" />
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('abonnement')}
                  className={`${
                    activeTab === 'abonnement'
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  <CreditCard className="inline-block h-5 w-5 mr-2 -mt-1" />
                  Abonnement
                </button>
              </nav>
            </div>

            <div className="mt-6">
              {activeTab === 'profil' && (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900">Photo de profil</h4>
                      <button
                        type="button"
                        className="text-sm font-medium text-green-600 hover:text-green-500"
                        onClick={() => document.getElementById('photo-upload')?.click()}
                      >
                        Changer
                      </button>
                      <input
                        id="photo-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="mt-2 flex items-center">
                      <div className="h-16 w-16 rounded-full bg-gray-200 overflow-hidden">
                        {formData.photo ? (
                          <img
                            src={formData.photo}
                            alt="Profil"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                            <User className="h-8 w-8 text-gray-500" />
                          </div>
                        )}
                      </div>
                      <p className="ml-4 text-sm text-gray-500">
                        JPG, GIF ou PNG. 1MB max.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-3">
                        <label htmlFor="prenom" className="block text-sm font-medium text-gray-700">
                          Prénom
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="prenom"
                            id="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="nom" className="block text-sm font-medium text-gray-700">
                          Nom
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="nom"
                            id="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Adresse email
                        </label>
                        <div className="mt-1">
                          <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label htmlFor="telephone" className="block text-sm font-medium text-gray-700">
                          Téléphone
                        </label>
                        <div className="mt-1">
                          <input
                            type="tel"
                            name="telephone"
                            id="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-6">
                        <label htmlFor="adresse" className="block text-sm font-medium text-gray-700">
                          Adresse
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="adresse"
                            id="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="ville" className="block text-sm font-medium text-gray-700">
                          Ville
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="ville"
                            id="ville"
                            value={formData.ville}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="pays" className="block text-sm font-medium text-gray-700">
                          Pays
                        </label>
                        <div className="mt-1">
                          <input
                            type="text"
                            name="pays"
                            id="pays"
                            value={formData.pays}
                            onChange={handleChange}
                            disabled={!isEditing}
                            className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-5">
                      <div className="flex justify-end">
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => setIsEditing(false)}
                              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <X className="inline-block h-4 w-4 mr-1 -mt-1" />
                              Annuler
                            </button>
                            <button
                              type="submit"
                              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Save className="inline-block h-4 w-4 mr-1 -mt-1" />
                              Enregistrer
                            </button>
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setIsEditing(true)}
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                          >
                            <Pencil className="-ml-1 mr-2 h-5 w-5" />
                            Modifier le profil
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === 'securite' && (
                <div className="space-y-6">
                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Changer le mot de passe
                      </h3>
                      <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>Mettez à jour le mot de passe associé à votre compte.</p>
                      </div>
                      <form className="mt-5">
                        <div className="space-y-6">
                          <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                              Mot de passe actuel
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <input
                                id="current-password"
                                name="currentPassword"
                                type={showCurrentPassword ? 'text' : 'password'}
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                  type="button"
                                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                >
                                  {showCurrentPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                              Nouveau mot de passe
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <input
                                id="new-password"
                                name="newPassword"
                                type={showNewPassword ? 'text' : 'password'}
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                  type="button"
                                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                                  onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                  {showNewPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                              Confirmer le nouveau mot de passe
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <input
                                id="confirm-password"
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              />
                              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <button
                                  type="button"
                                  className="text-gray-500 hover:text-gray-600 focus:outline-none"
                                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                  ) : (
                                    <Eye className="h-5 w-5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              type="submit"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <Lock className="-ml-1 mr-2 h-5 w-5" />
                              Mettre à jour le mot de passe
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="bg-white shadow sm:rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Authentification à deux facteurs (2FA)
                      </h3>
                      <div className="mt-2 max-w-xl text-sm text-gray-500">
                        <p>Ajoutez une couche de sécurité supplémentaire à votre compte.</p>
                      </div>
                      <div className="mt-5">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Shield className="-ml-1 mr-2 h-5 w-5" />
                          Activer l'authentification à deux facteurs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Préférences de notification
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Contrôlez comment vous recevez les notifications.</p>
                    </div>
                    <div className="mt-5">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="email-notifications"
                              name="email-notifications"
                              type="checkbox"
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="email-notifications" className="font-medium text-gray-700">
                              Notifications par email
                            </label>
                            <p className="text-gray-500">Recevez des mises à jour par email.</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="push-notifications"
                              name="push-notifications"
                              type="checkbox"
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                              defaultChecked
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="push-notifications" className="font-medium text-gray-700">
                              Notifications push
                            </label>
                            <p className="text-gray-500">Recevez des notifications sur votre appareil.</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="sms-notifications"
                              name="sms-notifications"
                              type="checkbox"
                              className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="sms-notifications" className="font-medium text-gray-700">
                              Notifications SMS
                            </label>
                            <p className="text-gray-500">Recevez des notifications par SMS.</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-5">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Save className="-ml-1 mr-2 h-5 w-5" />
                          Enregistrer les préférences
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'abonnement' && (
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Votre abonnement
                    </h3>
                    <div className="mt-2 max-w-xl text-sm text-gray-500">
                      <p>Gérez votre abonnement et vos informations de paiement.</p>
                    </div>
                    {/* Le contenu de la section abonnement sera ajouté ici */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedLayout>
  );
};

export default ParametresPage;
