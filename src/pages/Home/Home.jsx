import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

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
  const { t } = useLanguage();

  const onClickProperties = () => {
    navigate(`/propiedades`);
  };

  return (
    <section className="home-section">
      <section className="hero-section">
        <img src={HeroImg} alt="" className="hero-img" />
        <div className="description-section">
          <h1 className="hero-title">{t("home.hero.title")}</h1>
          <p className="hero-text">{t("home.hero.text")}</p>
          <div className="home-button-container">
            <Button
              text={t("home.hero.contactBtn")}
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
            <h1 className="card-description-title">
              {t("home.featured.title")}
            </h1>
            <p className="card-description-text">{t("home.featured.text")}</p>
          </div>
          <div className="card-button-container">
            <Button
              text={t("home.featured.viewAllBtn")}
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
