import { useState } from "react";
import "./Properties.scss";
import { useLanguage } from "../../context/LanguageContext.jsx";

import PropertiesFilter from "../../Components/PropertiesFilter/PropertiesFilter";
import CardList from "../../Components/CardList/CardList.jsx";

function Properties() {
  const { t } = useLanguage();
  const [filters, setFilters] = useState({
    modality: "",
    bedrooms: "",
    propertyType: "",
    districto: "",
    barrio: "",
    minPrice: "",
    maxPrice: "",
    sortOrder: "",
  });

  return (
    <section className="properties-container">
      <section className="properties-description">
        <h1>{t("properties.title")}</h1>
        <p>{t("properties.text")}</p>
      </section>
      <PropertiesFilter filters={filters} setFilters={setFilters} />
      <CardList isShowAll filters={filters} />
    </section>
  );
}

export default Properties;
