import React from 'react';

const ProfessionalCard = ({ professional, onClick, darkMode }) => {
  return (
    <div
      onClick={() => onClick(professional)}
      className={`cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-xl overflow-hidden ${
        darkMode 
          ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' 
          : 'bg-white border-gray-200 hover:bg-gray-50'
      } border shadow-sm`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={professional.avatar}
            alt={professional.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{professional.name}</h3>
            <p className="text-blue-500 font-medium truncate">{professional.position}</p>
            <p className="text-sm opacity-70 truncate">{professional.company}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-sm opacity-80 line-clamp-2">{professional.bio}</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {professional.skills.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${
                darkMode 
                  ? 'bg-blue-900 text-blue-200' 
                  : 'bg-blue-100 text-blue-800'
              }`}
            >
              {skill}
            </span>
          ))}
          {professional.skills.length > 3 && (
            <span className={`px-2 py-1 text-xs rounded-full ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'
            }`}>
              +{professional.skills.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <span className={`px-2 py-1 rounded ${
            darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'
          }`}>
            {professional.experience} anos
          </span>
          <span className="opacity-70">{professional.city}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;