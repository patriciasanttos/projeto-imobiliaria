import "./Footer.scss";
import { useLanguage } from "../../context/LanguageContext.jsx";

function Footer() {
  const { t } = useLanguage();

  return (
    <footer>
      <p className="text-footer">{t("footer.text")}</p>
    </footer>
  );
}

export default Footer;
