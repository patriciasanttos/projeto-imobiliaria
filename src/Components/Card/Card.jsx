import "./Card.scss";

//Images
import House1 from "../../assets/Images/house-1.svg";

//Icons
import Location from "../../assets/Icons/Propiedades/location-icon.svg";


function Card({tagList, title, nameLocation }) {
 
  return (
    <section className="card-container">
      <img src={House1} alt="" className="card-img" />
      <section className="card-information">
        <h3>{title}</h3>

        <div className="card-location">
          <img src={Location} alt="" />
          <p>{nameLocation} </p>
        </div>

        <div className="card-tag-list">
          {tagList.map((tag, index) => (
            <div key={index} className="card-tags">
              <img src={tag.icon} alt="" />
              <p>{tag.name}</p>
            </div>
          ))}
        </div>

        <div className="card-footer">
          <div className="card-price">
            <p className="price-title">Precio</p>
            <p className="price-value">Gs. 4.500.000</p>
          </div>
          <div className="card-button-container">
            <button className="card-button">Ver Detalles</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Card;
