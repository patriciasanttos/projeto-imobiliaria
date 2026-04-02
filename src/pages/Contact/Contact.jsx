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
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3544.178668667629!2d-55.87135232417776!3d-27.338882176395686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457955e1c6401f5%3A0x31758f3ef50b32ba!2sGral.%20Artigas%20878%2C%20Encarnaci%C3%B3n%20070116%2C%20Paraguay!5e0!3m2!1sen!2sbr!4v1775159965117!5m2!1sen!2sbr"
          width="1200"
          height="376"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </section>
  );
}

export default Contact;
