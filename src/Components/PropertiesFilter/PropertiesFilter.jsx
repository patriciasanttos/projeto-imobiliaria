import { useState } from "react";
import "./PropertiesFilter.scss";
import { formatPYG, unformatPYG } from "../../utils/currency";
import { useLanguage } from "../../context/LanguageContext.jsx";

function PropertiesFilter({ filters, setFilters }) {
  const { t } = useLanguage();

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "minPrice" || name === "maxPrice") {
      value = unformatPYG(value);
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
      minPrice: "",
      maxPrice: "",
      sortOrder: "",
    });
  };

  return (
    <div className="property-filter">
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
        <label className="property-filter__label">{t("filter.minPrice")}</label>
        <input
          type="text"
          className="property-filter__input"
          placeholder={t("filter.placeholderMin")}
          name="minPrice"
          value={formatPYG(filters.minPrice)}
          onChange={handleChange}
        />
      </div>

      <div className="property-filter__group">
        <label className="property-filter__label">{t("filter.maxPrice")}</label>
        <input
          type="text"
          className="property-filter__input"
          placeholder={t("filter.placeholderMax")}
          name="maxPrice"
          value={formatPYG(filters.maxPrice)}
          onChange={handleChange}
        />
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

      <button className="property-filter__btn" onClick={onClickClear}>
        {t("filter.clearBtn")}
      </button>
    </div>
  );
}

export default PropertiesFilter;
