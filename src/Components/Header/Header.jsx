import "./Header.scss";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import MobileMenu from "../../Components/MobileMenu/MobileMenu.jsx";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher.jsx";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Social media icons
import WhatsAppIcon from "../../assets/Icons/Social media/whatsapp-icon.svg";
import FacebookIcon from "../../assets/Icons/Social media/facebook-icon.svg";
import InstagramIcon from "../../assets/Icons/Social media/instagram-icon.svg";
import EmailIcon from "../../assets/Icons/Social media/email-icon.svg";

const socialIcons = [
  { icon: WhatsAppIcon, label: "WhatsApp" },
  { icon: FacebookIcon, label: "Facebook" },
  { icon: InstagramIcon, label: "Instagram" },
  { icon: EmailIcon, label: "Email" },
];

// Format compatible with MobileMenu component
const mobileSocialIcons = socialIcons.map((item) => ({
  icon: { [item.label.toLowerCase()]: item.icon },
  link: "#",
}));

function Header() {
  const isMobile = useMediaQuery({ maxWidth: 848 });
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
        <span
          className="logo-header"
          onClick={onClickLogo}
        >Logo</span>

        {isMobile ? (
          <MobileMenu menuItems={menuItems} socialMedia={mobileSocialIcons} />
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
                {socialIcons.map((item, index) => (
                  <span key={index} className="social-icon-placeholder">
                    <img src={item.icon} alt={item.label} />
                  </span>
                ))}
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

