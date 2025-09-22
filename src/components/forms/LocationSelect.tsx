import type React from 'react';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { locationService, Departement, Commune, Arrondissement, Village } from '../../api/locationService';
import { Loading } from '../common/Loading';

export interface LocationData {
  departement?: string;
  commune?: string;
  arrondissement?: string;
  village?: string;
}

interface LocationSelectProps {
  onLocationChange: (location: LocationData) => void;
  initialValues?: LocationData;
  requiredFields?: (keyof LocationData)[];
  disabledFields?: (keyof LocationData)[];
}

export const LocationSelect: React.FC<LocationSelectProps> = ({ 
  onLocationChange, 
  initialValues = {},
  requiredFields = ['departement', 'commune'],
  disabledFields = []
}) => {
  const [departements, setDepartements] = useState<Departement[]>([]);
  const [communes, setCommunes] = useState<Commune[]>([]);
  const [arrondissements, setArrondissements] = useState<Arrondissement[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);
  
  const [selectedDepartement, setSelectedDepartement] = useState(initialValues?.departement || '');
  const [selectedCommune, setSelectedCommune] = useState(initialValues?.commune || '');
  const [selectedArrondissement, setSelectedArrondissement] = useState(initialValues?.arrondissement || '');
  const [selectedVillage, setSelectedVillage] = useState(initialValues?.village || '');
  
  const [loading, setLoading] = useState({
    departements: false,
    communes: false,
    arrondissements: false,
    villages: false,
  });

  // Charger les départements au montage
  useEffect(() => {
    const loadDepartements = async () => {
      setLoading(prev => ({ ...prev, departements: true }));
      try {
        const data = await locationService.getDepartements();
        setDepartements(data);
      } catch (error) {
        console.error('Erreur lors du chargement des départements:', error);
      } finally {
        setLoading(prev => ({ ...prev, departements: false }));
      }
    };

    void loadDepartements();
  }, []);

  // Charger les communes quand le département change
  useEffect(() => {
    if (selectedDepartement) {
      const loadCommunes = async () => {
        setLoading(prev => ({ ...prev, communes: true }));
        try {
          const data = await locationService.getCommunes(selectedDepartement);
          setCommunes(data);
          // Reset les sélections suivantes
          setSelectedCommune('');
          setSelectedArrondissement('');
          setSelectedVillage('');
          setArrondissements([]);
          setVillages([]);
        } catch (error) {
          console.error('Erreur lors du chargement des communes:', error);
        } finally {
          setLoading(prev => ({ ...prev, communes: false }));
        }
      };

      void loadCommunes();
    } else {
      setCommunes([]);
      setArrondissements([]);
      setVillages([]);
    }
  }, [selectedDepartement]);

  // Charger les arrondissements quand la commune change
  useEffect(() => {
    if (selectedCommune) {
      const loadArrondissements = async () => {
        setLoading(prev => ({ ...prev, arrondissements: true }));
        try {
          const data = await locationService.getArrondissements(selectedCommune);
          setArrondissements(data);
          // Reset les sélections suivantes
          setSelectedArrondissement('');
          setSelectedVillage('');
          setVillages([]);
        } catch (error) {
          console.error('Erreur lors du chargement des arrondissements:', error);
        } finally {
          setLoading(prev => ({ ...prev, arrondissements: false }));
        }
      };

      void loadArrondissements();
    } else {
      setArrondissements([]);
      setVillages([]);
    }
  }, [selectedCommune]);

  // Charger les villages quand l'arrondissement change
  useEffect(() => {
    if (selectedArrondissement) {
      const loadVillages = async () => {
        setLoading(prev => ({ ...prev, villages: true }));
        try {
          const data = await locationService.getVillages(selectedArrondissement);
          setVillages(data);
          // Reset la sélection suivante
          setSelectedVillage('');
        } catch (error) {
          console.error('Erreur lors du chargement des villages:', error);
        } finally {
          setLoading(prev => ({ ...prev, villages: false }));
        }
      };

      void loadVillages();
    } else {
      setVillages([]);
    }
  }, [selectedArrondissement]);

  // Notifier les changements de localisation
  useEffect(() => {
    const locationData: LocationData = {};
    
    if (selectedDepartement) locationData.departement = selectedDepartement;
    if (selectedCommune) locationData.commune = selectedCommune;
    if (selectedArrondissement) locationData.arrondissement = selectedArrondissement;
    if (selectedVillage) locationData.village = selectedVillage;
    
    onLocationChange(locationData);
  }, [selectedDepartement, selectedCommune, selectedArrondissement, selectedVillage, onLocationChange]);

  const isFieldRequired = (field: keyof LocationData): boolean => {
    return requiredFields.includes(field);
  };

  const isFieldDisabled = (field: keyof LocationData): boolean => {
    if (disabledFields.includes(field)) return true;
    
    // Disable fields based on parent selection
    if (field === 'commune' && !selectedDepartement) return true;
    if (field === 'arrondissement' && !selectedCommune) return true;
    if (field === 'village' && !selectedArrondissement) return true;
    
    return false;
  };

  const handleLocationChange = (field: keyof LocationData, value: string) => {
    // Reset dependent fields when a parent field changes
    if (field === 'departement' && value !== selectedDepartement) {
      setSelectedCommune('');
      setSelectedArrondissement('');
      setSelectedVillage('');
      setCommunes([]);
      setArrondissements([]);
      setVillages([]);
      setSelectedDepartement(value);
    } else if (field === 'commune' && value !== selectedCommune) {
      setSelectedArrondissement('');
      setSelectedVillage('');
      setArrondissements([]);
      setVillages([]);
      setSelectedCommune(value);
    } else if (field === 'arrondissement' && value !== selectedArrondissement) {
      setSelectedVillage('');
      setVillages([]);
      setSelectedArrondissement(value);
    } else if (field === 'village') {
      setSelectedVillage(value);
    }
  };

  const SelectField: React.FC<{
    field: keyof LocationData;
    label: string;
    value: string;
    options: { id: string; nom: string }[];
    loading: boolean;
    placeholder: string;
  }> = ({ field, label, value, options, loading, placeholder }) => {
    const disabled = isFieldDisabled(field);
    const required = isFieldRequired(field);
    
    return (
      <div>
        <label className={`block text-sm font-medium text-gray-700 mb-2 ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}`}>
          {label}
        </label>
        <div className="relative">
          <select
            value={value}
            onChange={(e) => handleLocationChange(field, e.target.value)}
            disabled={disabled || loading}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
              disabled ? 'bg-gray-50 text-gray-500' : 'bg-white'
            }`}
            required={required}
          >
            <option value="">{loading ? 'Chargement...' : placeholder}</option>
            {options.map((option) => (
              <option key={option.id} value={option.id}>
                {option.nom}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          {loading && (
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
              <Loading size="sm" />
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <SelectField
        field="departement"
        label="Département"
        value={selectedDepartement}
        options={departements}
        loading={loading.departements}
        placeholder={`Sélectionner un département${isFieldRequired('departement') ? ' *' : ''}`}
      />

      <SelectField
        field="commune"
        label="Commune"
        value={selectedCommune}
        options={communes}
        loading={loading.communes}
        placeholder={`Sélectionner une commune${isFieldRequired('commune') ? ' *' : ''}`}
      />

      <SelectField
        field="arrondissement"
        label="Arrondissement"
        value={selectedArrondissement}
        options={arrondissements}
        loading={loading.arrondissements}
        placeholder={`Sélectionner un arrondissement${isFieldRequired('arrondissement') ? ' *' : ''}`}
      />

      <SelectField
        field="village"
        label="Village/Quartier"
        value={selectedVillage}
        options={villages}
        loading={loading.villages}
        placeholder={`Sélectionner un village ou quartier${isFieldRequired('village') ? ' *' : ''}`}
      />
    </div>
  );
};