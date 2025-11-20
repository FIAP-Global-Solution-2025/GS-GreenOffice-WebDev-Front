const Home = ({ darkMode }) => {
  return (
    <div
      className={`min-h-screen px-8 md:px-16 py-24 flex flex-col md:flex-row items-center justify-between transition-colors duration-300 ${darkMode ? "bg-gray-900 text-gray-200" : "bg-gray-100 text-gray-800"
        }`}
    >
      <div className="max-w-xl space-y-6">
        <h3
          className={`text-xl font-semibold ${darkMode ? "text-green-300" : "text-green-700"
            }`}
        >
          Bem-vindo ao GreenOffice
        </h3>

        <h1
          className={`font-extrabold leading-tight ${darkMode ? "text-white" : "text-gray-900"
            } text-5xl md:text-6xl`}
        >
          Sustentabilidade,
          <br />
          Tecnologia
          <br />
          <span
            className={`${darkMode ? "text-green-400" : "text-green-600"
              } drop-shadow-sm`}
          >
            e Inovação
          </span>
        </h1>

        <p className="text-lg opacity-90 leading-relaxed">
          O GreenOffice transforma escritórios em ambientes inteligentes e ecológicos.
          Através de sensores IoT, automação e análise de dados, ajudamos empresas
          a reduzir desperdícios, economizar recursos e promover práticas sustentáveis.
          <br /><br />
          Nosso sistema incentiva colaboradores a adotarem atitudes conscientes,
          criando uma cultura verde moderna e alinhada ao futuro do trabalho.
        </p>
      </div>

      <div className="relative mt-16 md:mt-0">
        <img src="/public/logo.png" alt="GreenOffice" className="w-[300px] h-[300px] relative object-contain drop-shadow-xl" />
      </div>
    </div>

  )
}

export default Home;