import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

//Images
import House1 from "../assets/Images/house-1.svg";

//Icons
import Room from "../assets/Icons/Propiedades/room-icon.svg";
import Bathroom from "../assets/Icons/Propiedades/bathroom-icon.svg";
import Car from "../assets/Icons/Propiedades/car-icon.svg";

// Local JSON data (extracted from Google Sheets)
import propertiesBase from "../data/properties_base.json";
import propertiesEs from "../data/properties_es.json";
import propertiesPt from "../data/properties_pt.json";
import propertiesEn from "../data/properties_en.json";

const LANG_TRANSLATIONS = {
  es: propertiesEs,
  pt: propertiesPt,
  en: propertiesEn,
};

// Status display priority — lower index = shown first
const STATUS_PRIORITY = {
  disponible: 0,
  reservado: 1,
  alquilado: 2,
  vendido: 3,
  agotado: 4,
};

function mapSheetRowToCard(row) {
  // Build tagList only for fields that have a value > 0
  // Store type + count so Card can translate the label at render time
  const tagList = [];
  const habitaciones = parseInt(row.Habitaciones || row["Habitaciones "], 10);
  const bano = parseInt(row.Bano, 10);
  const cochera = parseInt(row.Cochera, 10);

  if (habitaciones > 0) {
    tagList.push({ icon: Room, type: "rooms", count: habitaciones });
  }
  if (bano > 0) {
    tagList.push({ icon: Bathroom, type: "bathrooms", count: bano });
  }
  if (cochera > 0) {
    tagList.push({ icon: Car, type: "parking", count: cochera });
  }

  return {
    id: row.ID,
    title: row.Titulo,
    districto: row.Districto || "",
    barrio: row.Barrio || "",
    agentId: row.ID_Agente || row["ID Agente"] || "",
    status: row.Status || "",
    image: House1,
    imagenes: row.Imagenes || null, // Google Drive folder URL
    price: row.Precio,
    currency: row.Moneda || "",
    bathrooms: row.Bano,
    bedrooms: row.Habitaciones || row["Habitaciones "],
    parkingSlots: row.Cochera,
    home: row.Home,
    operationType: row.Operacion,
    propertyType: row.Tipo,
    descripcion: row["Descripción"] || "",
    detalles: row.Detalles || "",
    maps: row.Maps || "",
    lat: row.Lat ? parseFloat(row.Lat) : null,
    lng: row.Lng ? parseFloat(row.Lng) : null,
    tagList,
  };
}

const useProperties = () => {
  const { lang } = useLanguage();
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    try {
      // Deep-clone base rows to avoid mutating the imported JSON
      const baseRows = JSON.parse(JSON.stringify(propertiesBase));
      const localizedRows = LANG_TRANSLATIONS[lang] || LANG_TRANSLATIONS.es || [];

      // Build a lookup map from the localized tab by ID
      const localizedMap = {};
      localizedRows.forEach((row) => {
        if (row.ID) {
          localizedMap[row.ID] = row;
        }
      });

      // Map base rows and override translatable fields
      const cards = baseRows.map((row) => {
        const localized = localizedMap[row.ID];
        if (localized) {
          row.Titulo = localized.Titulo || row.Titulo;
          row.Districto = localized.Districto || row.Districto;
          row.Barrio = localized.Barrio || row.Barrio;
          row["Descripción"] = localized["Descripción"] || row["Descripción"];
          row.Detalles = localized.Detalles || row.Detalles;
        }
        return mapSheetRowToCard(row);
      });

      // Sort by status priority: Disponible first, Agotado last
      cards.sort((a, b) => {
        const pa = STATUS_PRIORITY[(a.status || "").toLowerCase()] ?? 99;
        const pb = STATUS_PRIORITY[(b.status || "").toLowerCase()] ?? 99;
        return pa - pb;
      });

      setCardList(cards);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  return {
    cardList, setCardList, loading, setLoading, error, setError
  }
};

export default useProperties
