import MessageModal from "./MensagemModal";
import React, { useState } from 'react';

const ProfessionalModal = ({
  professional,
  me,
  isOpen,
  onClose,
  onRecommend,
  onSendMessage,
  darkMode,
  recomendations,
}) => {
  function funcaoPrivada() {
    const result = recomendations.filter((r) => (
      r.to == professional.id
    ))
    console.log(result)
  }

  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleSendMessageClick = () => {
    setShowMessageModal(true);
  };

  const handleMessageSent = () => {
    setShowMessageModal(false);
    if (onSendMessage) {
      onSendMessage(professional.id);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>

        {/* Header */}
        <div className="sticky top-0 z-10 p-6 border-b flex justify-between items-start backdrop-blur-sm bg-opacity-90">
          <div className="flex items-center space-x-4">
            <img
              src={professional.avatar}
              alt={professional.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-500"
            />
            <div>
              <h2 className="text-2xl font-bold">{professional.name}</h2>
              <p className="text-blue-500 font-semibold text-lg">{professional.position}</p>
              <p className="opacity-70">{professional.company} • {professional.city}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
          >
            ✕
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Informações Pessoais e Acadêmicas */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Informações Pessoais</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Email:</strong> {professional.email}</p>
                <p><strong>Telefone:</strong> {professional.phone}</p>
                <p><strong>Idade:</strong> {professional.age} anos</p>
              </div>
              <div>
                <p><strong>Formação:</strong> {professional.education}</p>
                <p><strong>Universidade:</strong> {professional.university}</p>
                <p><strong>Experiência:</strong> {professional.experience} anos</p>
              </div>
            </div>
          </section>

          {/* Sobre */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Sobre</h3>
            <p className="opacity-80 leading-relaxed">{professional.bio}</p>
          </section>

          {/* Habilidades Técnicas */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Habilidades Técnicas</h3>
            <div className="flex flex-wrap gap-2">
              {professional.technologies.map((tech, index) => (
                <span
                  key={index}
                  className={`px-3 py-2 rounded-lg ${darkMode
                    ? 'bg-blue-900 text-blue-200'
                    : 'bg-blue-100 text-blue-800'
                    } font-medium`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Soft Skills */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {professional.softSkills.map((skill, index) => (
                <span
                  key={index}
                  className={`px-3 py-2 rounded-lg ${darkMode
                    ? 'bg-green-900 text-green-200'
                    : 'bg-green-100 text-green-800'
                    } font-medium`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Hobbies */}
          <section>
            <h3 className="text-xl font-semibold mb-4">Hobbies & Interesses</h3>
            <div className="flex flex-wrap gap-2">
              {professional.hobbies.map((hobby, index) => (
                <span
                  key={index}
                  className={`px-3 py-2 rounded-lg ${darkMode
                    ? 'bg-purple-900 text-purple-200'
                    : 'bg-purple-100 text-purple-800'
                    } font-medium`}
                >
                  {hobby}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-4">Quantidade de recomendações</h3>
            <div className="flex flex-wrap gap-2" onClick={() => funcaoPrivada()}>
              {
                recomendations.filter((r) => (
                  r.to == professional.id
                )).length
              } recomendações
            </div>
          </section>

          {/* Botões de Ação */}
          <div className="flex space-x-4 pt-6 border-t">
            <button
              disabled={!me.id}
              onClick={() => onRecommend(me.id, professional.id)}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${darkMode
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
            >
              👍 Recomendar Profissional
            </button>
            <button
              disabled={!me.id}
              // onClick={() => onSendMessage(professional.id)}
              onClick={handleSendMessageClick}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
            >
              💬 Enviar Mensagem
            </button>
          </div>
        </div>
      </div>
      {showMessageModal && (
        <MessageModal
          professional={professional} me={me} darkMode={darkMode} isOpen={showMessageModal}
          onClose={() => setShowMessageModal(false)}
        />
      )}
    </div>
  );
};

export default ProfessionalModal;