import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Filter, 
  Star, 
  Building2, 
  Clock, 
  Phone,
  Navigation,
  Heart,
  MessageSquare,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Loading } from '../components/common/Loading';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

interface Pharmacy {
  id: string;
  name: string;
  address: string;
  city: string;
  region: string;
  phone: string;
  image: string;
  isActive: boolean;
  openHours: string;
}

const PharmacyListPage: React.FC = () => {
  const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState<Pharmacy[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Données optimisées des pharmacies
  const demoPharmacies: Pharmacy[] = [
    {
      id: '1',
      name: 'Pharmacie du Progrès',
      address: '123 Avenue de l\'Indépendance',
      city: 'Cotonou',
      region: 'Littoral',
      phone: '+229 21 30 40 50',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isActive: true,
      openHours: '07h00 - 22h00',
    },
    {
      id: '2',
      name: 'Pharmacie Centrale',
      address: '45 Rue des Martyrs',
      city: 'Porto-Novo',
      region: 'Ouémé',
      phone: '+229 20 21 30 41',
      image: 'https://images.unsplash.com/photo-1512069772995-ec65c2a9d7fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isActive: true,
      openHours: '08h00 - 20h00',
    },
    {
      id: '3',
      name: 'Pharmacie Atlas',
      address: '78 Boulevard Saint-Michel',
      city: 'Parakou',
      region: 'Borgou',
      phone: '+229 23 61 20 30',
      image: 'https://images.unsplash.com/photo-1585435557343-3b092031d4ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isActive: true,
      openHours: '06h30 - 21h30',
    },
    {
      id: '4',
      name: 'Pharmacie Santé Plus',
      address: '12 Carrefour Godomey',
      city: 'Abomey-Calavi',
      region: 'Atlantique',
      phone: '+229 21 30 50 60',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isActive: true,
      openHours: '07h30 - 21h00',
    },
    {
      id: '5',
      name: 'Pharmacie de l\'Espoir',
      address: '33 Route de Bohicon',
      city: 'Abomey',
      region: 'Zou',
      phone: '+229 22 50 40 30',
      image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      isActive: true,
      openHours: '08h00 - 19h00',
    }
  ];

  const regions = ['Atlantique', 'Littoral', 'Ouémé', 'Borgou', 'Zou'];
  const cities = ['Cotonou', 'Porto-Novo', 'Parakou', 'Abomey-Calavi', 'Abomey'];

  useEffect(() => {
    const loadPharmacies = async () => {
      setIsLoading(true);
      // Simulation de chargement
      await new Promise(resolve => setTimeout(resolve, 1200));
      setPharmacies(demoPharmacies);
      setFilteredPharmacies(demoPharmacies);
      setIsLoading(false);
    };

    loadPharmacies();
    
    // Récupérer les favoris depuis le stockage local
    const savedFavorites = localStorage.getItem('pharmacy_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    let filtered = [...pharmacies];

    // Filtrer par terme de recherche
    if (searchTerm) {
      filtered = filtered.filter(pharmacy =>
        pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrer par région
    if (selectedRegion) {
      filtered = filtered.filter(pharmacy => pharmacy.region === selectedRegion);
    }

    // Filtrer par ville
    if (selectedCity) {
      filtered = filtered.filter(pharmacy => pharmacy.city === selectedCity);
    }

    // Filtrer uniquement les pharmacies actives
    filtered = filtered.filter(pharmacy => pharmacy.isActive);

    // Trier
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortBy === 'city') {
        return a.city.localeCompare(b.city);
      }
      return 0;
    });

    setFilteredPharmacies(filtered);
  }, [pharmacies, searchTerm, selectedRegion, selectedCity, sortBy]);

  const toggleFavorite = (pharmacyId: string) => {
    const newFavorites = favorites.includes(pharmacyId)
      ? favorites.filter(id => id !== pharmacyId)
      : [...favorites, pharmacyId];
    
    setFavorites(newFavorites);
    localStorage.setItem('pharmacy_favorites', JSON.stringify(newFavorites));
  };

  const handleGiveFeedback = (pharmacyId: string) => {
    // Rediriger vers le sondage client avec la pharmacie pré-sélectionnée
    alert(`Redirection vers le sondage pour la pharmacie ${pharmacyId}`);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('');
    setSelectedCity('');
    setSortBy('rating');
  };

  const PharmacyCard: React.FC<{ pharmacy: Pharmacy }> = ({ pharmacy }) => {
    const isFavorite = favorites.includes(pharmacy.id);

    return (
      <Card hoverable className="group overflow-hidden h-full">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={pharmacy.image} 
            alt={pharmacy.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          <div className="absolute top-4 right-4">
            <button
              onClick={() => toggleFavorite(pharmacy.id)}
              className={`p-2 rounded-full transition-all duration-200 shadow-md ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          <div className="absolute bottom-4 left-4">
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-green-500 text-white shadow-md">
              <span className="mr-1">✔️</span>
              Active
            </span>
          </div>
        </div>

        {/* Contenu */}
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors mb-4">
            {pharmacy.name}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-green-600" />
              <span>{pharmacy.address}, {pharmacy.city}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0 text-blue-600" />
              <span>{pharmacy.openHours}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0 text-orange-600" />
              <a href={`tel:${pharmacy.phone}`} className="hover:text-green-700 hover:underline">
                {pharmacy.phone}
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => handleGiveFeedback(pharmacy.id)}
              variant="primary"
              className="flex-1"
              leftIcon={<MessageSquare className="w-4 h-4" />}
            >
              Donnez votre avis
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0"
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <Loading variant="medical" size="xl" text="Chargement des pharmacies..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-gray-50 flex flex-col">
      <Navbar />
      {/* Header optimisé */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-20 relative overflow-hidden">
        {/* Éléments décoratifs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-orange-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Pharmacies référencées
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Trouvez la pharmacie la plus proche de chez vous et partagez votre expérience pour améliorer les services de santé
            </p>
          </div>

          {/* Statistiques rapides avec design amélioré */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: filteredPharmacies.length, label: 'Pharmacies actives', icon: Building2 },
              { value: regions.length, label: 'Régions couvertes', icon: MapPin },
              { value: '653', label: 'Avis collectés', icon: MessageSquare }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 text-center">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <p className="text-white text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Filtres et recherche optimisés */}
      <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Barre de recherche améliorée */}
            <div className="flex-1 max-w-md">
              <Input
                leftIcon={<Search className="h-5 w-5" />}
                placeholder="Rechercher une pharmacie, ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Filtres en dropdown */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="h-12 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Toutes les régions</option>
                {regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="h-12 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="">Toutes les villes</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="h-12 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
              >
                <option value="name">Nom A-Z</option>
                <option value="city">Ville</option>
              </select>

              <Button
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                leftIcon={<Filter className="w-4 h-4" />}
                className="h-12"
              >
                Filtres avancés
              </Button>
            </div>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <Card className="mt-6" variant="elevated">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Filtres avancés</h3>
                  <Button
                    onClick={() => setShowFilters(false)}
                    variant="ghost"
                    size="icon"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Statut
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" defaultChecked />
                        <span className="text-sm">Pharmacies actives uniquement</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Horaires d'ouverture
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded mr-2" />
                        <span className="text-sm">Ouvert maintenant</span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="primary">
                    Appliquer les filtres
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Résultats */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {filteredPharmacies.length} pharmacie{filteredPharmacies.length > 1 ? 's' : ''} trouvée{filteredPharmacies.length > 1 ? 's' : ''}
            </h2>
            {(searchTerm || selectedRegion || selectedCity) && (
              <Button variant="ghost" onClick={resetFilters} className="text-sm">
                Réinitialiser les filtres
              </Button>
            )}
          </div>
          {favorites.length > 0 && (
            <div className="flex items-center text-sm text-gray-600 bg-red-50 px-3 py-2 rounded-lg">
              <Heart className="w-4 h-4 text-red-500 mr-2 fill-current" />
              <span>{favorites.length} favori{favorites.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        {/* Grille des pharmacies */}
        {filteredPharmacies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPharmacies.map(pharmacy => (
              <PharmacyCard key={pharmacy.id} pharmacy={pharmacy} />
            ))}
          </div>
        ) : (
          <Card className="text-center py-16">
            <CardContent>
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Aucune pharmacie trouvée
              </h3>
              <p className="text-gray-600 mb-6">
                Essayez de modifier vos critères de recherche ou vos filtres.
              </p>
              <Button onClick={resetFilters} variant="primary">
                Réinitialiser les filtres
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Call to action optimisé */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-green-200/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="text-2xl">💊</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">
              Votre pharmacie n'est pas encore référencée ?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Rejoignez notre réseau de pharmacies et bénéficiez des retours de vos clients pour améliorer vos services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg">
                Inscrire ma pharmacie
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10">
                En savoir plus
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer rapide optimisé */}
          <Footer />
    </div>
  );
};

export default PharmacyListPage;