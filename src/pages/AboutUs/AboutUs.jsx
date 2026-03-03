import "./AboutUs.scss";
import { useLanguage } from "../../context/LanguageContext.jsx";

//Images
import AboutUsImage from "../../assets/Images/logo-aboutus.svg";

//Icons
import Mission from "../../assets/Icons/About Us/mission-icon.svg";
import Values from "../../assets/Icons/About Us/values-icon.svg";
import Vision from "../../assets/Icons/About Us/vision-icon.svg";

const cardIcons = [Mission, Vision, Values];

function AboutUs() {
  const { t } = useLanguage();
  const cards = t("aboutUs.cards");

  return (
    <section className="aboutus-section">
      <section className="aboutus-description-container">
        <div className="aboutus-description">
          <h1 className="aboutus-title">{t("aboutUs.title")}</h1>
          <p className="aboutus-text">
            {t("aboutUs.text")
              .split("\n")
              .map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                  <br />
                </span>
              ))}
          </p>
        </div>
        <div className="aboutus-img">
          <img src={AboutUsImage} alt="" className="aboutus-logo" />
        </div>
      </section>
      <div className="div-aboutus"></div>
      <section className="aboutus-cards-container">
        {Array.isArray(cards) &&
          cards.map((card, index) => (
            <div className="aboutus-card" key={index}>
              <div className="aboutus-card-name">
                <img
                  src={cardIcons[index]}
                  alt={card.title}
                  className="aboutus-card-icon"
                />
                <h1 className="aboutus-card-title">{card.title}</h1>
              </div>

              <p
                className="aboutus-card-description"
                dangerouslySetInnerHTML={{ __html: card.description }}
              ></p>
            </div>
          ))}
      </section>
    </section>
  );
}

export default AboutUs;
