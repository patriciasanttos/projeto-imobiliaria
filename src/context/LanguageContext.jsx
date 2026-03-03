import { createContext, useContext, useState } from "react";
import es from "../locales/es.json";
import en from "../locales/en.json";
import pt from "../locales/pt.json";

const translations = { es, en, pt };

const LanguageContext = createContext();

// Helper: resolve dot-notation key, e.g. "home.hero.title"
function resolve(obj, key) {
  return key.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(
    () => localStorage.getItem("lang") || "es",
  );

  const setLang = (newLang) => {
    localStorage.setItem("lang", newLang);
    setLangState(newLang);
  };

  const t = (key) => resolve(translations[lang], key) ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
