import "./AboutUs.scss";

//Images
import AboutUsImage from "../../assets/Images/logo-aboutus.svg";

//Icons
import Mission from "../../assets/Icons/About Us/mission-icon.svg";
import Values from "../../assets/Icons/About Us/values-icon.svg";
import Vision from "../../assets/Icons/About Us/vision-icon.svg";

function AboutUs() {
  const aboutUsCard = [
    {
      icon: Mission,
      title: "Misión",
      description:
        "Brindar soluciones inmobiliarias confiables, eficientes y personalizadas, orientadas a satisfacer las necesidades de nuestros clientes en la compra, venta y alquiler de propiedades. Nos enfocamos en generar relaciones basadas en la confianza, el compromiso y la transparencia, contribuyendo al desarrollo del mercado inmobiliario local.",
    },
    {
      icon: Vision,
      title: "Visión",
      description:
        "Ser una empresa inmobiliaria de referencia en la región, reconocida por su profesionalismo, innovación y calidad de servicio. Aspiramos a seguir creciendo junto a nuestros clientes, consolidando una marca sólida que inspire seguridad y acompañe cada proyecto inmobiliario con responsabilidad y excelencia.",
    },
    {
      icon: Values,
      title: "Valores",
      description:
        "<b>Compromiso</b>: Nos dedicamos con responsabilidad y pasión a cada gestión, cumpliendo con lo que prometemos.<br><br><b>Transparencia</b>: Actuamos con honestidad y claridad en todas nuestras operaciones.<br><br><b>Confianza</b>: Construimos relaciones sólidas y duraderas con nuestros clientes y aliados.",
    },
  ];

  return (
    <section className="aboutus-section">
      <section className="aboutus-description-container">
        <div className="aboutus-description">
          <h1 className="aboutus-title">¿Quiénes somos?</h1>
          <p className="aboutus-text">
            En <span>Habbita Negocios Inmobiliarios</span>, somos una empresa
            comprometida con brindar soluciones confiables, ágiles y
            personalizadas en el sector inmobiliario. Nos especializamos en la
            compra, venta y alquiler de propiedades urbanas y rurales,
            ofreciendo un acompañamiento integral a nuestros clientes en cada
            etapa del proceso. <br />
            <br />
            Nuestra misión es facilitar el camino hacia el hogar ideal o la
            inversión inmobiliaria perfecta, con un enfoque basado en la
            confianza, la transparencia y la profesionalidad. Contamos con un
            equipo capacitado y con conocimiento del mercado local, que trabaja
            con dedicación para garantizar resultados efectivos y experiencias
            satisfactorias. <br />
            <br />
            Elegirnos es optar por una atención cercana, un asesoramiento claro
            y un servicio que se adapta a tus necesidades. En
            <span> Habbita</span>, no solo encontramos propiedades: construimos
            vínculos duraderos y oportunidades reales.
          </p>
        </div>
        <div className="aboutus-img">
          <img src={AboutUsImage} alt="" className="aboutus-logo" />
        </div>
      </section>
      <div className="div-aboutus"></div>
      <section className="aboutus-cards-container">
        {aboutUsCard.map((card, index) => (
          <div className="aboutus-card" key={index}>
            <div className="aboutus-card-name">
              <img
                src={card.icon}
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
