import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import "./ScrollTop.scss";
import { useLanguage } from "../../context/LanguageContext.jsx";

import ScrollTopIcon from "../../assets/Icons/scroll-top.svg";

function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <div className={`scroll-container ${isVisible ? "visible" : ""}`}>
      <img
        src={ScrollTopIcon}
        alt={t("scrollTop")}
        onClick={scrollToTop}
        data-tooltip-id="scroll-top-tooltip"
        data-tooltip-content={t("scrollTop")}
      />
      <Tooltip id="scroll-top-tooltip" place="left" />
    </div>
  );
}

export default ScrollTop;
