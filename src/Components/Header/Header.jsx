import "./Header.scss";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "react-tooltip";
import MobileMenu from "../../Components/MobileMenu/MobileMenu.jsx";
import useHeaderContacts from "../../hooks/useHeaderContacts";

//Images
import Logo from "../../assets/Images/logo.svg";

function Header() {
  const isMobile = useMediaQuery({ maxWidth: 848 });
  const { socialMedia } = useHeaderContacts();

  const menuItems = [
    { name: "Inicio", link: "/" },
    { name: "Quienes Somos", link: "quienes-somos" },
    { name: "Propiedades", link: "propiedades" },
    { name: "Contactos", link: "contacto" },
  ];

  const onClickLogo = () => {
    window.location.href = "/";
  };

  return (
    <header className="header-section">
      <section className="header-content">
        <img
          src={Logo}
          alt="Habbita Logo"
          className="logo-header"
          onClick={onClickLogo}
        />

        {isMobile ? (
          <MobileMenu menuItems={menuItems} socialMedia={socialMedia} />
        ) : (
          <>
            <section className="menu-items-header">
              {menuItems.map((item, index) => (
                <a key={index} href={item.link}>
                  {item.name}
                </a>
              ))}
            </section>
            <section className="social-media-icons-container">
              {socialMedia.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-tooltip-id="header-tooltip"
                  data-tooltip-content={item.tooltip}
                >
                  <img src={Object.values(item.icon)[0]} alt={item.tooltip} />
                </a>
              ))}
              <Tooltip id="header-tooltip" place="bottom" />
            </section>
          </>
        )}
      </section>
    </header>
  );
}

export default Header;
