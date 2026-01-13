import "./Contact.scss";

//Images
import ContactImage from "../../assets/Images/contact-hero.svg";

//Icons
import WhatsAppContact from "../../assets/Icons/Contact/whatsapp-contact-icon.svg";
import EmailContact from "../../assets/Icons/Contact/email-contact-icon.svg";
import FacebookContact from "../../assets/Icons/Contact/facebook-contact-icon.svg";
import InstagramContact from "../../assets/Icons/Contact/instagram-contact-icon.svg";
import ArrowLink from "../../assets/Icons/Contact/arrow-contact-link.svg";

function Contact() {
  const contactListCard = [
    {
      icon: WhatsAppContact,
      text: "+595971-507-508",
      link: "https://wa.me/595971507508",
    },
    {
      icon: WhatsAppContact,
      text: "+595991-464-114",
      link: "https://wa.me/595991464114",
    },
    {
      icon: EmailContact,
      text: "habbitainmobiliarios@gmail.com",
      link: "mailto:habbitainmobiliarios@gmail.com",
    },
    {
      icon: FacebookContact,
      text: "habbitainmobiliarios",
      link: "https://www.facebook.com/romeogabriel.cardozo",
    },
    {
      icon: InstagramContact,
      text: "habbitainmobiliarios",
      link: "https://www.instagram.com/habbitainmobiliarios",
    },
  ];

  return (
    <section className="contact-section">
      <section className="contact-description-container">
        <div className="contact-description">
          <h1>Ponte en contacto con Habbita</h1>
          <p>
            Bienvenido a la página de contacto de Habbita. Estamos aquí para
            ayudarte con cualquier consulta, solicitud o comentario que tengas.
            Si buscas comprar o alquiler una propiedad, explorar oportunidades
            de inversión o simplemente quieres conectar, estamos a solo un
            mensaje de distancia. Contáctanos y conversemos.
          </p>
        </div>
        <div className="contact-image">
          <img src={ContactImage} alt="" />
        </div>
      </section>
      <section className="contact-cards-container">
        {contactListCard.map((contact, index) => (
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
              <img src={contact.icon} alt="" />
              <p>{contact.text}</p>
            </div>
          </a>
        ))}
      </section>
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
  );
}

export default Contact;
