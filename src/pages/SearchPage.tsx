import React, { useState } from 'react';

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{id: number, name: string, type: string}>>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulation de résultats de recherche
    if (searchTerm.trim()) {
      setSearchResults([
        { id: 1, name: 'Paracétamol 500mg', type: 'Médicament' },
        { id: 2, name: 'Ibuprofène 400mg', type: 'Médicament' },
        { id: 3, name: 'Pharmacie du Centre', type: 'Pharmacie' },
      ]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Recherche</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un médicament, une pharmacie..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-r-md hover:bg-green-700 transition-colors"
          >
            Rechercher
          </button>
        </div>
      </form>

      {searchResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {searchResults.map((result) => (
              <li key={result.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">{result.name}</h3>
                    <p className="text-sm text-gray-500">{result.type}</p>
                  </div>
                  <button className="text-green-600 hover:text-green-800">
                    Voir détails
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {searchTerm && searchResults.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun résultat trouvé pour "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
