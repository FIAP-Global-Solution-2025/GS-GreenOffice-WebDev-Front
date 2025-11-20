import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Contribuidores from "./pages/Contribuidores";
import Login from "./pages/Login";
import Mensagens from "./pages/Mensagens";

function App() {
  const [user, setUser] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handlerLogout = () => setUser(null);

  const handlerLogin = (userData) => {
    setUser(userData);
  };

  return (
    <BrowserRouter>
      <div
        className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
          }`}
      >
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} user={user} onLogout={handlerLogout} />

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home darkMode={darkMode} />} />
            <Route
              path="/contribuidores"
              element={<Contribuidores darkMode={darkMode} user={user}/>}
            />
            <Route
              path="/login"
              element={<Login darkMode={darkMode} onLogin={handlerLogin} />}
            />
            <Route
              path="/mensagens"
              element={<Mensagens darkMode={darkMode} onLogin={handlerLogin} />}
            />
          </Routes>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </BrowserRouter>
  );
}

export default App;
