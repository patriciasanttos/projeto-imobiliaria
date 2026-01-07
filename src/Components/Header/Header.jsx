
import "./Header.scss";

//Images
import Logo from '../../assets/Images/logo.svg';

//Icons
import WhatsApp from '../../assets/Icons/Social media/whatsapp-icon.svg';
import Facebook from '../../assets/Icons/Social media/facebook-icon.svg';
import Instagram from '../../assets/Icons/Social media/instagram-icon.svg';
import Email from '../../assets/Icons/Social media/email-icon.svg';

function Header() {

    const menuItems = [
      { name: "Inicio", link: "/" },
      { name: "Quienes Somos", link: "quienes-somos" },
      { name: "Servicios", link: "propiedades"},
      { name: "Contactos", link: "contacto" },
    ];

    const socialMedia = [
        {icon: {WhatsApp}, link: '#'},
        {icon: {Facebook}, link: '#'},
        {icon: {Instagram}, link: '#'},
        {icon: {Email}, link: '#'}
    ]

    const onClickLogo = () => {
        window.location.href = '/';
    }

    return (
      <header className="header-section">
        <section className="header-content">
          <img src={Logo} alt="" className="logo-header" onClick={onClickLogo}/>
          <section className="menu-items-header">
            {menuItems.map((item, index) => (
                <a key={index} href={item.link}>{item.name}</a>
            ))}
          </section>
          <section className="social-media-icons-container">
            {socialMedia.map((item, index) => (
                <a key={index} href={item.link}>
                    <img src={Object.values(item.icon)[0]} alt="" />
                </a>
            ))}
          </section>
        </section>
      </header>
    );
}

export default Header;