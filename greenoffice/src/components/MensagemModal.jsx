// components/MessageModal.jsx
import React, { useEffect, useState } from 'react';

const MessageModal = ({
  professional,
  me,
  isOpen,
  onClose,
  darkMode
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [msgs, setMsgs] = useState()
  useEffect(() => {
    const local = localStorage.getItem('greenoffice_messages')
    if (local) {
      setMsgs(JSON.parse(local))
    } else if (local == null) {
      const init = [
        {
          from: '0',
          to: '0',
          message: '',
          timestamp: new Date().toISOString(),
          visto: false
        }
      ]
      setMsgs(init)
      localStorage.setItem("greenoffice_messages", JSON.stringify(init))
    }
  }, [1])

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsSending(true);

    // Simulação de envio
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // console.log('Mensagem enviada:', {
      //   from: me.id,
      //   to: professional.id,
      //   message: message,
      //   timestamp: new Date().toISOString()
      // });

      const array = [...msgs,
      {
        from: me.id,
        to: professional.id,
        message: message,
        timestamp: new Date().toISOString(),
        visto: false
      }]
      localStorage.setItem('greenoffice_messages', JSON.stringify(array))


      setIsSent(true);
      setTimeout(() => {
        onClose();
        setIsSent(false);
        setMessage('');
      }, 2000);
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className={`relative max-w-md w-full rounded-xl ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>

        {!isSent ? (
          <>
            {/* Header */}
            <div className="p-6 border-b flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">Enviar Mensagem</h2>
                <p className="text-sm opacity-70 mt-1">
                  Para: {professional.name}
                </p>
              </div>
              <button
                onClick={onClose}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                  }`}
              >
                ✕
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              <div className="mb-6">
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  Sua mensagem
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Olá ${professional.name.split(' ')[0]}, gostaria de conversar sobre...`}
                  rows="6"
                  className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={onClose}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isSending}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${darkMode
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                    } ${(!message.trim() || isSending) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    'Enviar Mensagem'
                  )}
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Confirmação de envio */
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Mensagem Enviada!</h3>
            <p className="opacity-70 mb-6">
              Sua mensagem foi enviada para {professional.name}
            </p>
            <button
              onClick={onClose}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
            >
              Fechar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageModal;