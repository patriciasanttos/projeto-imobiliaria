import { useState, useMemo } from "react";
import "./PropertiesFilter.scss";
import { formatPYG, unformatPYG } from "../../utils/currency";
import { useLanguage } from "../../context/LanguageContext.jsx";
import useProperties from "../../hooks/useProperties.js";

function PropertiesFilter({ filters, setFilters, viewMode, setViewMode }) {
  const { t } = useLanguage();
  const { cardList } = useProperties();

  // Extract unique districtos from the data
  const districtoOptions = useMemo(() => {
    const set = new Set();
    cardList.forEach((card) => {
      if (card.districto) set.add(card.districto);
    });
    return [...set].sort();
  }, [cardList]);

  // Extract barrios filtered by selected districto
  const barrioOptions = useMemo(() => {
    const set = new Set();
    cardList.forEach((card) => {
      if (card.barrio) {
        if (!filters.districto || card.districto === filters.districto) {
          set.add(card.barrio);
        }
      }
    });
    return [...set].sort();
  }, [cardList, filters.districto]);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "minPrice" || name === "maxPrice") {
      value = unformatPYG(value);
    }

    // When districto changes, reset barrio
    if (name === "districto") {
      setFilters((prev) => ({
        ...prev,
        districto: value,
        barrio: "",
      }));
      return;
    }

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onClickClear = () => {
    setFilters({
      operationType: "",
      bedrooms: "",
      propertyType: "",
      districto: "",
      barrio: "",
      minPrice: "",
      maxPrice: "",
      sortOrder: "",
    });
  };

  return (
    <div className="property-filter">
      

      {/* Filter fields */}
      <div className="property-filter__fields">
        <div className="property-filter__group">
          <label className="property-filter__label">{t("filter.modality")}</label>
          <select
            className="property-filter__select"
            name="operationType"
            value={filters.operationType}
            onChange={handleChange}
          >
            <option value="">{t("filter.select")}</option>
            <option value="venta">{t("filter.options.sale")}</option>
            <option value="alquiler">{t("filter.options.rent")}</option>
          </select>
        </div>

        <div className="property-filter__group">
          <label className="property-filter__label">
            {t("filter.propertyType")}
          </label>
          <select
            className="property-filter__select"
            name="propertyType"
            value={filters.propertyType}
            onChange={handleChange}
          >
            <option value="">{t("filter.select")}</option>
            <option value="casa">{t("filter.options.house")}</option>
            <option value="duplex">{t("filter.options.duplex")}</option>
            <option value="departamento">{t("filter.options.apartment")}</option>
            <option value="terreno">{t("filter.options.land")}</option>
          </select>
        </div>

        <div className="property-filter__group">
          <label className="property-filter__label">{t("filter.districto")}</label>
          <select
            className="property-filter__select"
            name="districto"
            value={filters.districto}
            onChange={handleChange}
          >
            <option value="">{t("filter.select")}</option>
            {districtoOptions.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="property-filter__group">
          <label className="property-filter__label">{t("filter.barrio")}</label>
          <select
            className="property-filter__select"
            name="barrio"
            value={filters.barrio}
            onChange={handleChange}
          >
            <option value="">{t("filter.select")}</option>
            {barrioOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="property-filter__group">
          <label className="property-filter__label">{t("filter.bedrooms")}</label>
          <select
            className="property-filter__select"
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleChange}
          >
            <option value="">{t("filter.select")}</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">{t("filter.options.bed4plus")}</option>
          </select>
        </div>

        <div className="property-filter__group property-filter__group--price">
          <label className="property-filter__label">{t("filter.minPrice")}</label>
          <div className="property-filter__price-row">
            <input
              type="text"
              className="property-filter__input"
              placeholder={t("filter.placeholderMin")}
              name="minPrice"
              value={formatPYG(filters.minPrice)}
              onChange={handleChange}
            />
            <span className="property-filter__price-separator"> </span>
            <input
              type="text"
              className="property-filter__input"
              placeholder={t("filter.placeholderMax")}
              name="maxPrice"
              value={formatPYG(filters.maxPrice)}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="property-filter__group">
          <label className="property-filter__label">
            {t("filter.sortPrice")}
          </label>
          <select
            className="property-filter__select"
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleChange}
          >
            <option value="">{t("filter.select")}</option>
            <option value="desc">{t("filter.options.highToLow")}</option>
            <option value="asc">{t("filter.options.lowToHigh")}</option>
          </select>
        </div>

        <div className="property-filter__group property-filter__group--actions">
          <button className="property-filter__btn" onClick={onClickClear}>
            {t("filter.clearBtn")}
          </button>
          <div className="property-filter__toggle">
            <button
              className={`view-toggle-btn${viewMode === "list" ? " active" : ""}`}
              onClick={() => setViewMode("list")}
              aria-label={t("properties.listView")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
              {t("properties.listView")}
            </button>
            <button
              className={`view-toggle-btn${viewMode === "map" ? " active" : ""}`}
              onClick={() => setViewMode("map")}
              aria-label={t("properties.mapView")}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t("properties.mapView")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertiesFilter;
