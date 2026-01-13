import "./Home.scss";
import { useNavigate } from 'react-router-dom';

//Components
import Button from "../../Components/Button/Button.jsx";

//Icons
import CardList from "../../Components/CardList/CardList.jsx";
import ArrowWhiteButton from "../../assets/Icons/arrow-white-button-icon.svg";
import ArrowBlackButton from "../../assets/Icons/arrow-black-button-icon.svg";

//Images
import HeroImg from "../../assets/Images/hero-home.svg";


function Home() {
  const navigate = useNavigate();
  const onClickProperties = () => {
    navigate(`/propiedades`);
  };

  return (
    <section className="home-section">
      <section className="hero-section">
        <img src={HeroImg} alt="" className="hero-img" />
        <div className="description-section">
          <h1 className="hero-title">Hacemos realidad el lugar que soñás…</h1>
          <p className="hero-text">
            En <span>Habbita Negocios Inmobiliarios</span>, cada propiedad es
            una oportunidad, cada cliente, una historia, y cada historia, una
            misión cumplida. <br />
            Descubrí espacios con alma, viví donde querés estar.
          </p>
          <div className="home-button-container">
            <Button
              text={"Contactanos"}
              icon={ArrowBlackButton}
              className="btn-gold home-btn"
            />
          </div>
        </div>
      </section>
      <div className="div-home"></div>
      <section className="card-description-container">
        <div className="card-description-section">
          <div className="card-text-description">
            <h1 className="card-description-title">Propiedades Destacadas</h1>
            <p className="card-description-text">
              Explore nuestra cuidada selección de propiedades destacadas. Cada
              anuncio ofrece un vistazo a las excepcionales casas e inversiones
              disponibles a través de Habbita. Haga clic en "Ver Detalles" para
              más información.
            </p>
          </div>
          <div className="card-button-container">
            <Button
              text={"Ver todas propiedades"}
              icon={ArrowWhiteButton}
              className="btn-green"
              onClick={onClickProperties}
            />
          </div>
        </div>
      </section>
      <CardList isFilterByHome />
    </section>
  );
}

export default Home;
