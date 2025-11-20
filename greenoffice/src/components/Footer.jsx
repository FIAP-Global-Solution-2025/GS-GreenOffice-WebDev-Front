import React from 'react';

const Footer = ({darkMode}) => {
  return (
    <>
      <footer className={`${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } text-white py-8`}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold text-green-600">GreenOffice</p>
            </div>

            <div className="flex space-x-6">
              <a
                href=""
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src="/public/github.png"
                  alt="Ícone GitHub"
                  className="w-6 h-6 opacity-80 hover:opacity-100 transition"
                />
              </a>
            </div>

          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center text-green-700">
          <p>&copy; 2025 GreenOffice. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
