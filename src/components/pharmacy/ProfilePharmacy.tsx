import React, { useState, useCallback } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useToast } from '../../hooks/useToast';
import { Building2, Edit, Save, Upload, X } from 'lucide-react';

// Types
type PharmacyProfile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  logo: string | null;
  description: string;
  openingHours: string;
};

const defaultValues: PharmacyProfile = {
  id: '1',
  name: 'Pharmacie du Plateau',
  email: 'contact@pharma-plateau.bj',
  phone: '+229 12 34 56 78',
  address: '123 Rue des Pharmacies',
  city: 'Cotonou',
  postalCode: '01 BP 1234',
  country: 'Bénin',
  logo: null,
  description: 'Votre pharmacie de confiance depuis 2010, offrant des services de qualité et des conseils personnalisés.',
  openingHours: 'Lundi - Vendredi: 8h - 20h\nSamedi: 9h - 18h\nDimanche: 9h - 13h',
};

const ProfilePharmacy: React.FC = () => {
  // États
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(defaultValues.logo);

  // Hooks
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PharmacyProfile>({ defaultValues });
  const { showToast } = useToast();

  // Gestion de la soumission du formulaire
  const onSubmit: SubmitHandler<PharmacyProfile> = async (data) => {
    try {
      setIsLoading(true);
      // Simuler un appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      // TODO: Remplacer par un appel API réel
      // await pharmacyService.updateProfile(data);
      console.log('Données du formulaire:', data);
      showToast('Profil mis à jour avec succès', 'success');
      setIsEditing(false);
    } catch (error) {
      showToast('Erreur lors de la mise à jour du profil', 'error');
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion du changement de logo
  const handleLogoChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille du fichier (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('La taille du fichier ne doit pas dépasser 5MB', 'error');
      e.target.value = ''; // Réinitialiser l'input
      return;
    }

    // Vérifier le type MIME
    if (!file.type.startsWith('image/')) {
      showToast('Veuillez sélectionner un fichier image valide', 'error');
      e.target.value = ''; // Réinitialiser l'input
      return;
    }

    const reader = new FileReader();
    // Gestion de la lecture réussie
    reader.onload = (event) => {
      if (event.target?.result) {
        setLogoPreview(event.target.result as string);
      }
    };
    // Gestion des erreurs
    reader.onerror = () => {
      console.error('Erreur lors de la lecture du fichier');
      showToast('Erreur lors de la lecture du fichier', 'error');
      // Réinitialiser l'input en cas d'erreur
      if (e.target) e.target.value = '';
    };
    // Lire le fichier
    reader.readAsDataURL(file);
  }, [showToast]);

  // Gestion de l'annulation des modifications
  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setLogoPreview(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Profil de la pharmacie</h2>
        <p className="text-sm text-gray-500 mb-4">
          Ces informations seront visibles par les utilisateurs de l'application.
        </p>
      </div>
      <div className="flex">
        <div className="flex-shrink-0 mr-4">
          <div className="h-32 w-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {logoPreview || defaultValues.logo ? (
              <img 
                src={logoPreview || defaultValues.logo || ''} 
                alt="Logo de la pharmacie" 
                className="h-full w-full object-cover"
              />
            ) : (
              <Building2 className="h-16 w-16 text-gray-400" />
            )}
          </div>
          {isEditing && (
            <label className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md cursor-pointer">
              <Upload className="h-5 w-5 text-gray-600" />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleLogoChange}
              />
            </label>
          )}
        </div>
        <div>
          <form onSubmit={(e) => {
            e.preventDefault();
            void handleSubmit(onSubmit)(e);
          }}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom de la pharmacie
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    id="name"
                    {...register('name', { required: 'Le nom est requis' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{defaultValues.name}</p>
                )}
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
              {/* Other fields... */}
            </div>
            <div className="mt-4 flex justify-end">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center px-3 py-1.5 border border-green-500 shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </button>
              ) : (
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                  >
                    {isLoading ? (
                      'Enregistrement...'
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Enregistrer
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePharmacy;
