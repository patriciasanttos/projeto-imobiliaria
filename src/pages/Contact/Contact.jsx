import "./Contact.scss";
import useContacts from "../../hooks/useContacts";
import { useLanguage } from "../../context/LanguageContext.jsx";

//Images
import ContactImage from "../../assets/Images/contact-hero.svg";

//Icons
import ArrowLink from "../../assets/Icons/Contact/arrow-contact-link.svg";

function Contact() {
  const { contacts, loading, error } = useContacts();
  const { t } = useLanguage();

  return (
    <section className="contact-section">
      <section className="contact-description-container">
        <div className="contact-description">
          <h1>{t("contact.title")}</h1>
          <p>{t("contact.text")}</p>
        </div>
        <div className="contact-image">
          <img src={ContactImage} alt="" />
        </div>
      </section>
      <section className="contact-cards-container">
        {loading && <p>{t("contact.loading")}</p>}
        {error && (
          <p>
            {t("contact.error")} {error}
          </p>
        )}
        {contacts.map((contact, index) => (
          <a
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
            key={index}
          >
            <div className="contact-arrow">
              <img src={ArrowLink} alt="" />
            </div>
            <div className="contact-info">
              {contact.icon && <img src={contact.icon} alt="" />}
              <p>{contact.text}</p>
            </div>
          </a>
        ))}
      </section>
      <section className="contact-map-container">
        <h1>{t("contact.location")}</h1>
        <div className="contact-map-placeholder">
          {t("contact.mapPlaceholder")}
        </div>
      </section>
    </section>
  );
}

export default Contact;
