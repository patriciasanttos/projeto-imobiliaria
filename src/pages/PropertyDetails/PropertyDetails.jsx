import { useParams } from "react-router-dom";
import "./PropertyDetails.scss";

// Icons
import ArrowBack from "../../assets/Icons/arrow-back.svg";
import ArrowZoom from "../../assets/Icons/PropertyDetails/arrow-zoom.svg";
import LocationGreen from "../../assets/Icons/PropertyDetails/location-green.svg";
import WhatsApp from "../../assets/Icons/Social media/whatsapp-icon.svg";
import ShareIcon from "../../assets/Icons/Social media/share-icon.svg";
import RoomIcon from "../../assets/Icons/Propiedades/room-icon.svg";
import BathroomIcon from "../../assets/Icons/Propiedades/bathroom-icon.svg";
import CarIcon from "../../assets/Icons/Propiedades/car-icon.svg";

// Components
import Button from "../../Components/Button/Button.jsx";

// Images
import HouseImg from "../../assets/Images/house-1.svg";

const features = [
  "2 habitaciones con balcones",
  "2 baños",
  "Quincho frontal",
  "Aire acondicionado instalado",
  "Buena iluminación interna",
  "Cochera para 2 vehículos",
  "Sobre calle asfaltada",
];

const featuresRight = [
  "A estrenar | Estilo rústico moderno",
  "Financiación propia\nCon una pequeña entrega\nCuotas corridas a sola firma",
  "A minutos del centro de Encarnación",
];

function PropertyDetails() {
  const { id } = useParams();

  return (
    <div className="property-page">
      <section className="property-container">
        <div className="back-page">
          <img src={ArrowBack} alt="Volver" />
          <p>Volver</p>
        </div>

        <div className="property-description-container">
          <div className="property-photos">
            <div className="property-main-photo" />

            <div className="zoom-photo-btn-container">
              <Button
                text="Ampliar foto"
                icon={ArrowZoom}
                className="zoom-photo-btn"
              />
            </div>

            <div className="property-mini-photos">
              {[HouseImg, HouseImg, HouseImg, HouseImg].map((src, i) => (
                <div
                  key={i}
                  className={`mini-photo${i === 0 ? " active" : ""}`}
                  style={{ backgroundImage: `url(${src})` }}
                />
              ))}
            </div>
          </div>

          <section className="property-info">
            <div className="property-title">
              <h1>Dúplex en Venta</h1>
              <h1 className="property-price">Gs. 4.500.000</h1>
            </div>

            <div className="property-adress-container">
              <div className="property-location">
                <img src={LocationGreen} alt="Localização" />
                <p>Barrio San Miguel, Cambyretá</p>
              </div>

              <div className="property-btn-container">
                <Button
                  text="Consultar"
                  icon={WhatsApp}
                  className="property-btn-contact"
                />
                <Button
                  text="Compartir"
                  icon={ShareIcon}
                  className="property-btn-share"
                />
              </div>
            </div>

            <div className="property-tags">
              <span className="tag">
                <img src={RoomIcon} alt="" />
                2-Habitación
              </span>
              <span className="tag">
                <img src={BathroomIcon} alt="" />
                2-Baño
              </span>
              <span className="tag">
                <img src={CarIcon} alt="" />
                2-Auto
              </span>
            </div>

            <div className="property-description">
              <h2>Descripción</h2>
              <div className="description-columns">
                <ul className="check-list">
                  {features.map((f, i) => (
                    <li key={i}>
                      <span className="checkmark">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <ul className="check-list">
                  {featuresRight.map((f, i) => (
                    <li key={i}>
                      <span className="checkmark">✓</span>
                      <span style={{ whiteSpace: "pre-line" }}>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <section className="contact-map-container">
          <h1>Ubicación</h1>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d453777.9190199634!2d-55.884627!3d-27.308807!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457955e5597cfeb%3A0x6ff7d247ff05c071!2sEncarnaci%C3%B3n%2C%20Paraguay!5e0!3m2!1ses!2sus!4v1767910786774!5m2!1ses!2sus"
            width="1200"
            height="376"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </section>
      <div className="div-property-details"></div>
      <section className="similar-properties-container">
        <h1>Ver opciones similares</h1>
      </section>
    </div>
  );
}

export default PropertyDetails;
