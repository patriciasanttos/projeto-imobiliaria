import { useLanguage } from "../../context/LanguageContext";
import "./LanguageSwitcher.scss";

// Flag SVG data URIs (hand-crafted simple flags)
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
      {/* Green background */}
      <rect width="20" height="14" fill="#009C3B" />
      {/* Yellow diamond */}
      <polygon points="10,1.2 18.5,7 10,12.8 1.5,7" fill="#FEDF00" />
      {/* Blue circle */}
      <circle cx="10" cy="7" r="2.8" fill="#002776" />
      {/* White arc band across the circle */}
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

  return (
    <div className="lang-switcher">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          className={`lang-btn ${lang === code ? "lang-btn--active" : ""}`}
          onClick={() => setLang(code)}
          title={label}
          aria-label={`Switch to ${label}`}
        >
          {flags[code]}
          <span className="lang-btn__label">{label}</span>
        </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;
