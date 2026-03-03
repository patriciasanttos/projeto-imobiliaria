import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../../context/LanguageContext";
import "./LanguageSwitcher.scss";

// Flag SVG components
const flags = {
  es: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 14"
      className="flag-icon"
    >
      <rect width="20" height="14" fill="#AA151B" />
      <rect y="3.5" width="20" height="7" fill="#F1BF00" />
    </svg>
  ),
  en: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 14"
      className="flag-icon"
    >
      <rect width="20" height="14" fill="#B22234" />
      <rect y="2" width="20" height="2" fill="#fff" />
      <rect y="6" width="20" height="2" fill="#fff" />
      <rect y="10" width="20" height="2" fill="#fff" />
      <rect width="8" height="7.6" fill="#3C3B6E" />
    </svg>
  ),
  pt: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 14"
      className="flag-icon"
    >
      <rect width="20" height="14" fill="#009C3B" />
      <polygon points="10,1.2 18.5,7 10,12.8 1.5,7" fill="#FEDF00" />
      <circle cx="10" cy="7" r="2.8" fill="#002776" />
      <path
        d="M7.4,5.8 Q10,4.6 12.6,5.8"
        stroke="#fff"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  ),
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
