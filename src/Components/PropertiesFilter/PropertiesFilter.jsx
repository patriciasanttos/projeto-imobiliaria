import "./PropertiesFilter.scss";

function PropertiesFilter() {
  return (
    <div className="property-filter">
      <div className="property-filter__group">
        <label className="property-filter__label">Modalidad</label>
        <select className="property-filter__select">
          <option value="">Seleccionar</option>
          <option value="venta">Venta</option>
          <option value="alquiler">Alquiler</option>
        </select>
      </div>

      <div className="property-filter__group">
        <label className="property-filter__label">Dormitorios</label>
        <select className="property-filter__select">
          <option value="">Seleccionar</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4+</option>
        </select>
      </div>

      <div className="property-filter__group">
        <label className="property-filter__label">Tipo de propiedad</label>
        <select className="property-filter__select">
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
          type="number"
          className="property-filter__input"
          placeholder="Min"
        />
      </div>

      <div className="property-filter__group">
        <label className="property-filter__label">Precio hasta:</label>
        <input
          type="number"
          className="property-filter__input"
          placeholder="Max"
        />
      </div>

      <button className="property-filter__btn">Buscar</button>
    </div>
  );
}

export default PropertiesFilter;
