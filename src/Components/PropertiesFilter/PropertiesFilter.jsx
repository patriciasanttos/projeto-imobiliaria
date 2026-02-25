import { useState } from "react";
import "./PropertiesFilter.scss";
import { formatPYG, unformatPYG } from "../../utils/currency";

function PropertiesFilter({ filters, setFilters }) {
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
        <label className="property-filter__label">Modalidad</label>
        <select
          className="property-filter__select"
          name="operationType"
          value={filters.operationType}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
      </div>

      <div className="property-filter__group">
        <label className="property-filter__label">Dormitorios</label>
        <select
          className="property-filter__select"
          name="bedrooms"
          value={filters.bedrooms}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div className="property-filter__group">
        <label className="property-filter__label">Tipo de propiedad</label>
        <select
          className="property-filter__select"
          name="propertyType"
          value={filters.propertyType}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="casa">Casa</option>
          <option value="duplex">Dúplex</option>
          <option value="departamento">Departamento</option>
          <option value="terreno">Terreno/Estancia</option>
        </select>
      </div>

      <div className="property-filter__group">
        <label className="property-filter__label">Precio de:</label>
        <input
          type="text"
          className="property-filter__input"
          placeholder="Min"
          name="minPrice"
          value={formatPYG(filters.minPrice)}
          onChange={handleChange}
        />
      </div>

      <div className="property-filter__group">
        <label className="property-filter__label">Precio hasta:</label>
        <input
          type="text"
          className="property-filter__input"
          placeholder="Max"
          name="maxPrice"
          value={formatPYG(filters.maxPrice)}
          onChange={handleChange}
        />
      </div>

      <div className="property-filter__group">
        <label className="property-filter__label">Ordenar precio</label>
        <select
          className="property-filter__select"
          name="sortOrder"
          value={filters.sortOrder}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="desc">Mayor a menor</option>
          <option value="asc">Menor a mayor</option>
        </select>
      </div>

      <button className="property-filter__btn" onClick={onClickClear}>
        Limpiar filtros
      </button>
    </div>
  );
}

export default PropertiesFilter;
