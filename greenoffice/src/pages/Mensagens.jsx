import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { professionalsData } from "../data/professionalsData";

const Mensagens = ({ darkMode, user }) => {
  const [msg, setMsg] = useState([]);
  function getUserById(id) {
    const sender = professionalsData.filter((p) => p.id == id);
    return sender[0].name;
  }

  useEffect(() => {
    const mensagens = JSON.parse(
      localStorage.getItem("greenoffice_messages") || "[]"
    );
    const MessagesForMe = mensagens.filter((m) => m.to == user.id);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMsg(MessagesForMe);
  }, [user.id]);
  return (
    <div
      className={`min-h-screen py-8 px-4 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}

        {/* Lista de Mensagens */}
        {msg.length === 0 ? (
          <div
            className={`text-center py-16 rounded-xl ${
              darkMode ? "bg-gray-800" : "bg-white"
            }`}
          >
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">
              Nenhuma mensagem enviada
            </h3>
            <p className="opacity-70 mb-6">
              Envie sua primeira mensagem para um profissional
            </p>
            <Link
              to="/contribuidores"
              className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
                darkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Explorar Profissionais
            </Link>
          </div>
        ) : (
          // parte cortada
          <div className="space-y-4">
            {msg.map((m) => (
              <div
                className={`rounded-xl border p-6 ${
                  darkMode
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{m.message}</h3>
                    <p className="opacity-70"></p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      darkMode
                        ? "bg-blue-900 text-blue-300"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {getUserById(m.from)}
                  </span>
                </div>

                {/* <div className="space-y-3">
                  {conversa.messages.slice(-3).map((mensagem, index) => ( // Mostrar apenas as 3 últimas
                    <div
                      key={mensagem.id || index}
                      className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'
                        }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                        </span>
                        <span className="text-sm opacity-70">
                          {new Date(mensagem.timestamp).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="whitespace-pre-wrap">{mensagem.message}</p>
                    </div>
                  ))}
                </div> */}

                {/* {conversa.messages.length > 3 && (
                  <p className="text-center mt-4 opacity-70 text-sm">
                    + {conversa.messages.length - 3} mensagens anteriores
                  </p>
                )} */}
              </div>
            ))}
          </div>
          // parte cortada
        )}
      </div>
    </div>
  );
};

export default Mensagens;
