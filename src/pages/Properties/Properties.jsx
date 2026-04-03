import { useState, useMemo } from "react";
import "./Properties.scss";
import { useLanguage } from "../../context/LanguageContext.jsx";

import PropertiesFilter from "../../Components/PropertiesFilter/PropertiesFilter";
import CardList from "../../Components/CardList/CardList.jsx";
import MapView from "../MapView/MapView.jsx";
import useProperties from "../../hooks/useProperties";
import { filterProperties } from "../../utils/filterProperties";

function Properties() {
  const { t } = useLanguage();
  const { cardList, loading } = useProperties();
  const [viewMode, setViewMode] = useState("list"); // "list" | "map"
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

  const filteredCards = useMemo(
    () => filterProperties(cardList, filters),
    [cardList, filters],
  );

  return (
    <section className="properties-container">
      <section className="properties-description">
        <h1>{t("properties.title")}</h1>
        <p>{t("properties.text")}</p>
      </section>
      <PropertiesFilter
        filters={filters}
        setFilters={setFilters}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {viewMode === "list" ? (
        <CardList isShowAll filters={filters} />
      ) : (
        <div className="properties-map-wrapper">
          <MapView cardList={filteredCards} loading={loading} />
        </div>
      )}
    </section>
  );
}

export default Properties;
