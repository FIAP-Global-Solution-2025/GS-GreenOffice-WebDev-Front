import React from 'react';
import ProfessionalCard from './ProfessionalCard';

const ProfessionalGrid = ({ professionals, onProfessionalClick, darkMode }) => {
  if (professionals.length === 0) {
    return (
      <div className={`text-center py-12 rounded-lg ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold mb-2">Nenhum profissional encontrado</h3>
        <p className="opacity-70">
          Tente ajustar seus filtros de busca
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
      darkMode ? 'text-white' : 'text-gray-900'
    }`}>
      {professionals.map(professional => (
        <ProfessionalCard
          key={professional.id}
          professional={professional}
          onClick={onProfessionalClick}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default ProfessionalGrid;