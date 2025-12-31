import "./Footer.scss";

//Images
import FooterComponent from '../../assets/Images/footer.svg';

function Footer() {
    return (
      <footer>
        <img src={FooterComponent} alt="" className="footer-image" />
        <p className="text-footer">
          Explore nuestra selección destacada de inmuebles premium. Cada listing
          ofrece propiedades excepcionales con oportunidades de inversión
          unicas.
        </p>
      </footer>
    );
}

export default Footer;