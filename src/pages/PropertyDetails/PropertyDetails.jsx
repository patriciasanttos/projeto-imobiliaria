import { useParams } from "react-router-dom";
import "./PropertyDetails.scss";

//Icons
import ArrowBack from "../../assets/Icons/arrow-back.svg";
import ArrowZoom from "../../assets/Icons/PropertyDetails/arrow-zoom.svg";
import LocationGreen from "../../assets/Icons/PropertyDetails/location-green.svg";
import WhatsApp from "../../assets/Icons/Social media/whatsapp-icon.svg";

//Components
import Button from "../../Components/Button/Button.jsx";

function PropertyDetails() {
  const { id } = useParams();
  return (
    <div>
      Property Details Page for ID: {id}
      <section className="property-container">
        <div className="back-page">
          <img src={ArrowBack} alt="" />
          <p>Volver</p>
        </div>
        <div className="property-description-container">
          <div className="property-photos">
            <div className="property-main-photo"></div>
            <Button text="Ampliar foto" icon={ArrowZoom} />
            <div className="property-mini-photos"></div>
          </div>
          <section className="property-info">
            <div className="property-title">
              <h1>Dúplex en Venta </h1>
              <h1>Gs. 4.500.000</h1>
            </div>
            <div className="property-adress-container">
              <div className="property-location">
                <img src={LocationGreen} alt="" />
                <p>Barrio San Miguel, Cambyretá </p>
              </div>
              <div className="property-btn-container">
                <Button
                  text="Consultar"
                  icon={WhatsApp}
                  className="property-btn-contact"
                />
              </div>
            </div>
            <div></div>
            <div className="property-description"></div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default PropertyDetails;
