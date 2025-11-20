import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ darkMode, toggleDarkMode, user, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobileMenu = () => setMobileOpen(!mobileOpen);

  return (
    <header
      className={`sticky top-0 z-50 border-b shadow-sm transition-colors duration-300 ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src="/logo.png" className="w-10 h-10 md:w-12 md:h-12" />
            <h1 className="text-2xl font-bold">GreenOffice</h1>
          </div>

          <nav className="hidden md:flex space-x-8 ml-auto mr-8">
            <Link
              to="/"
              className="text-gray-600 hover:text-green-600"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/contribuidores"
              className="text-gray-600 hover:text-green-600"
              onClick={toggleMobileMenu}
            >
              Contribuidores
            </Link>
            {
              user ? (
                <>
                  <Link
                    to="/mensagens"
                    className="text-gray-600 hover:text-green-600"
                    onClick={toggleMobileMenu}
                  >
                    Mensagens
                  </Link>
                </>
              )
                :
                <>
                </>
            }
          </nav>

          <div className="flex items-center space-x-4">
            <button className="md:hidden" onClick={toggleMobileMenu}>
              <i className="fas fa-bars text-2xl"></i>
            </button>

            <button onClick={toggleDarkMode}>{darkMode ? "☀️" : "🌙"}</button>
            {
              user ? (
                <div className="text-gray-600 hover:text-green-600">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
              )
                :
                <>
                </>
            }
            {
              user ?
                <Link
                  className="text-gray-600 hover:text-green-600"
                  onClick={onLogout}
                >
                  <button onClick={()=> window.location.reload()} className="px-4 py-2 rounded-lg font-semibold bg-red-600 text-white">
                    Sair
                  </button>
                </Link> :
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-green-600"
                  onClick={toggleMobileMenu}
                >
                  <button className="px-4 py-2 rounded-lg font-semibold bg-green-600 text-white">
                    Entrar
                  </button>
                </Link>
            }

          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-menu fixed inset-0 bg-white z-30 md:hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <span className="text-xl font-bold text-indigo-600">Menu</span>
            <button className="text-gray-600" onClick={toggleMobileMenu}>
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <nav className="flex flex-col p-6 space-y-6">
            <Link
              to="/"
              className="text-gray-600 hover:text-indigo-600"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/contribuidores"
              className="text-gray-600 hover:text-indigo-600"
              onClick={toggleMobileMenu}
            >
              Contribuidores
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
