import React, { useMemo } from 'react';

const SearchFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  filters, 
  setFilters, 
  professionals,
  darkMode 
}) => {
  
  const uniqueAreas = useMemo(() => {
    const areas = new Set(professionals.map(p => p.area));
    return Array.from(areas).sort();
  }, [professionals]);

  const uniqueCities = useMemo(() => {
    const cities = new Set(professionals.map(p => p.city));
    return Array.from(cities).sort();
  }, [professionals]);

  const uniqueTechnologies = useMemo(() => {
    const techs = new Set();
    professionals.forEach(p => {
      p.technologies.forEach(tech => techs.add(tech));
    });
    return Array.from(techs).sort();
  }, [professionals]);

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ area: '', city: '', technology: '' });
  };

  const inputClasses = `w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    darkMode 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`;

  return (
    <div className={`mb-8 p-6 rounded-xl ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    } shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      
      {/* Barra de Busca */}
      <div className="relative mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por nome, cargo ou habilidades..."
          className={inputClasses}
        />
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          🔍
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <select
          value={filters.area}
          onChange={(e) => setFilters({...filters, area: e.target.value})}
          className={inputClasses}
        >
          <option value="">Todas as áreas</option>
          {uniqueAreas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>

        <select
          value={filters.city}
          onChange={(e) => setFilters({...filters, city: e.target.value})}
          className={inputClasses}
        >
          <option value="">Todas as cidades</option>
          {uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <select
          value={filters.technology}
          onChange={(e) => setFilters({...filters, technology: e.target.value})}
          className={inputClasses}
        >
          <option value="">Todas as tecnologias</option>
          {uniqueTechnologies.map(tech => (
            <option key={tech} value={tech}>{tech}</option>
          ))}
        </select>
      </div>

      {/* Botão Limpar Filtros */}
      {(searchTerm || filters.area || filters.city || filters.technology) && (
        <div className="flex justify-end">
          <button
            onClick={clearFilters}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Limpar Filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;