import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ darkMode, toggleDarkMode, user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);
  
  const closeMobileMenu = () => setMobileOpen(false);

  const handleLogout = () => {
    onLogout();
    closeMobileMenu();
    window.location.reload();
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b shadow-sm transition-colors duration-300 ${
        darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img src="/logo.png" className="w-10 h-10 md:w-12 md:h-12" alt="Logo" />
            <Link to="/" className="text-2xl font-bold">
              GreenOffice
            </Link>
          </div>

          {/* Menu Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`transition-colors ${
                darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-600 hover:text-green-600"
              }`}
            >
              Home
            </Link>
            <Link
              to="/contribuidores"
              className={`transition-colors ${
                darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-600 hover:text-green-600"
              }`}
            >
              Contribuidores
            </Link>
            {user && (
              <Link
                to="/mensagens"
                className={`transition-colors ${
                  darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-600 hover:text-green-600"
                }`}
              >
                Mensagens
              </Link>
            )}
          </nav>

          {/* Botões do Header */}
          <div className="flex items-center space-x-4">
            {/* Botão Dark Mode */}
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* Botão Menu Mobile */}
            <button 
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
            >
              {
                mobileOpen ?
                <FaTimes className="text-xl"/>
                :
                <FaBars className="text-xl"/>
              }
            </button>

            {/* Avatar do Usuário (Desktop) */}
            {user && (
              <div className="hidden md:flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{user.name}</span>
              </div>
            )}

            {/* Botão Login/Logout (Desktop) */}
            <div className="hidden md:block">
              {user ? (
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors"
                >
                  Sair
                </button>
              ) : (
                <Link to="/login">
                  <button className="px-4 py-2 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors">
                    Entrar
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileOpen && (
        <div 
          className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
            darkMode ? "bg-gray-900" : "bg-white"
          }`}
        >
          {/* Header do Menu Mobile */}
          <div className={`flex justify-between items-center p-6 border-b ${
            darkMode ? "border-gray-700" : "border-gray-200"
          }`}>
            <span className={`text-xl font-bold ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}>
              Menu
            </span>
            <button 
              className="p-2"
              onClick={closeMobileMenu}
            >
              <i className={`fas fa-times text-xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}></i>
            </button>
          </div>

          {/* Conteúdo do Menu Mobile */}
          <nav className="flex flex-col p-6 space-y-6">
            <Link
              to="/"
              className={`text-lg transition-colors ${
                darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-600 hover:text-green-600"
              }`}
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/contribuidores"
              className={`text-lg transition-colors ${
                darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-600 hover:text-green-600"
              }`}
              onClick={closeMobileMenu}
            >
              Contribuidores
            </Link>
            
            {user && (
              <>
                <Link
                  to="/mensagens"
                  className={`text-lg transition-colors ${
                    darkMode ? "text-gray-300 hover:text-green-400" : "text-gray-600 hover:text-green-600"
                  }`}
                  onClick={closeMobileMenu}
                >
                  Mensagens
                </Link>
                
                {/* Info do usuário no mobile */}
                <div className={`pt-4 border-t ${
                  darkMode ? "border-gray-700" : "border-gray-200"
                }`}>
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className={`text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                      }`}>
                        {user.email}
                      </p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-colors"
                  >
                    Sair da Conta
                  </button>
                </div>
              </>
            )}

            {!user && (
              <div className="pt-4 border-t">
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                >
                  <button className="w-full py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors">
                    Fazer Login
                  </button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;