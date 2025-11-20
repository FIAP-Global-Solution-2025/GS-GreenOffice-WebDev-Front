import React, { useEffect, useState } from "react";
import ProfessionalGrid from "../components/ProfessionalGrid";
import ProfessionalModal from "../components/ProfessionalModal";
import SearchFilters from "../components/SearchFilters";
import { professionalsData } from "../data/professionalsData";

const Contribuidores = ({ darkMode, user, onRecommendation }) => {
  const [professionals, setProfessionals] = useState(professionalsData);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    area: "",
    city: "",
    technology: "",
  });

  const [recomendation, setRecomendation] = useState([{
    from: '0',
    to: '0'
  }])

  useEffect(() => {
    const recomends = localStorage.getItem('greenoffice_recommendations')
    if (recomends) {
      setRecomendation(JSON.parse(recomends))
    } else if (recomends == null) {
      const init = [{ from: '', to: '' }]
      localStorage.setItem("greenoffice_recommendations", JSON.stringify(init))
    }
    if (user) {
      const withoutMe = professionals.filter((p) => p.id !== user.id)
      setProfessionals(withoutMe)
    }
  }, [1])

  useEffect(() => {
    if (recomendation[0].from !== '0' && recomendation[0].to !== '0')
      localStorage.setItem("greenoffice_recommendations", JSON.stringify(recomendation))
  }, [recomendation])

  const filteredProfessionals = professionals.filter((professional) => {
    const matchesSearch =
      !searchTerm ||
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.skills.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesArea = !filters.area || professional.area === filters.area;
    const matchesCity = !filters.city || professional.city === filters.city;
    const matchesTech =
      !filters.technology ||
      professional.technologies.includes(filters.technology);

    return matchesSearch && matchesArea && matchesCity && matchesTech;
  });

  const handlerRecommendation = (from, to) => {
    if (user) {
      const result = recomendation.filter((r) => {
        return r.from == from && r.to == to
      })
      if (result.length == 0) {
        setRecomendation([...recomendation, { from: from, to: to }])
      }
    }
  };
  return (
    <>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Futuro do Trabalho</h1>
        <p className="text-xl opacity-80">
          Conecte-se com os melhores talentos do mercado
        </p>
      </div>

      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        setFilters={setFilters}
        professionals={professionals}
        darkMode={darkMode}
      />

      <ProfessionalGrid
        professionals={filteredProfessionals}
        onProfessionalClick={(p) => {
          setSelectedProfessional(p);
          setIsModalOpen(true);
        }}
        darkMode={darkMode}
      />

      {isModalOpen && selectedProfessional && (
        <ProfessionalModal
          professional={selectedProfessional}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          darkMode={darkMode}
          onRecommend={handlerRecommendation}
          me={user}
          recomendations={recomendation}
        />
      )}
    </>
  );
};

export default Contribuidores;
