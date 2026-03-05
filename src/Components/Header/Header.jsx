import "./Header.scss";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { Tooltip } from "react-tooltip";
import MobileMenu from "../../Components/MobileMenu/MobileMenu.jsx";
import useHeaderContacts from "../../hooks/useHeaderContacts";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

//Images
import Logo from "../../assets/Images/logo.svg";

function Header() {
  const isMobile = useMediaQuery({ maxWidth: 848 });
  const { socialMedia } = useHeaderContacts();
  const { t } = useLanguage();

  const menuItems = [
    { name: t("header.nav.home"), link: "/" },
    { name: t("header.nav.aboutUs"), link: "/quienes-somos" },
    { name: t("header.nav.properties"), link: "/propiedades" },
    { name: t("header.nav.contact"), link: "/contacto" },
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
                <Link key={index} to={item.link}>
                  {item.name}
                </Link>
              ))}
            </section>
            <div className="header-right">
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
              <LanguageSwitcher />
            </div>
          </>
        )}
      </section>
    </header>
  );
}

export default Header;
