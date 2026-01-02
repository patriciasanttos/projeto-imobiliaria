import "./Card.scss";

//Images

//Icons
import Location from "../../assets/Icons/Propiedades/location-icon.svg";


function Card({tagList, title, nameLocation, image, price }) {
 
  return (
    <section className="card-container">
      <img src={image} alt="" className="card-img" />
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
            <p className="price-value">{price}</p>
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
