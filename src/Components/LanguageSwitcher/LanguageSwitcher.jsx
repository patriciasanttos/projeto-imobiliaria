import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./LanguageSwitcher.scss";

import spainFlag from "../../assets/Icons/Flags/spain-flag-icon.png";
import usaFlag from "../../assets/Icons/Flags/usa-flag-icon.png";
import brazilFlag from "../../assets/Icons/Flags/brazil-flag-icon.png";

const flags = {
  es: <img src={spainFlag} alt="Español" className="flag-icon" />,
  en: <img src={usaFlag} alt="English" className="flag-icon" />,
  pt: <img src={brazilFlag} alt="Português" className="flag-icon" />,
};

const languages = [
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
  { code: "en", label: "EN" },
];

function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleSelect = (code) => {
    setLang(code);
    setOpen(false);
  };

  const otherLanguages = languages.filter((l) => l.code !== lang);

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-switcher__toggle"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change language"
      >
        <div className="lang-switcher__flag-circle">{flags[lang]}</div>
        <span className="lang-switcher__label">
          {languages.find((l) => l.code === lang).label}
        </span>
        <svg
          className="lang-switcher__chevron"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 12 12"
          width="10"
          height="10"
        >
          <polyline
            points="2,4 6,8 10,4"
            fill="none"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="lang-switcher__dropdown">
          {otherLanguages.map(({ code, label }) => (
            <button
              key={code}
              className="lang-switcher__option"
              onClick={() => handleSelect(code)}
              title={label}
            >
              {flags[code]}
              <span>{label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
