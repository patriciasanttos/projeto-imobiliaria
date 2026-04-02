import { useEffect, useState } from "react";
import { fetchGoogleSheetCSV } from "../utils/googleSheet";
import { useLanguage } from "../context/LanguageContext";

//Images
import House1 from "../assets/Images/house-1.svg";

//Icons
import Room from "../assets/Icons/Propiedades/room-icon.svg";
import Bathroom from "../assets/Icons/Propiedades/bathroom-icon.svg";
import Car from "../assets/Icons/Propiedades/car-icon.svg";

const SHEET_BASE_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9HwFXM91221YFd2SSXmNISzCmYPQB-4uvh-qWAkKf0ESpFZEGSXSkVBxh-MenIHqZ6RIqROo9CBot/pub?output=csv";

// Map app language codes to spreadsheet tab GIDs
const LANG_TO_GID = {
  es: "139553777",
  pt: "104221366",
  en: "371251503",
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

    const gid = LANG_TO_GID[lang] || LANG_TO_GID.es;
    const localizedUrl = `${SHEET_BASE_URL}&gid=${gid}`;

    // Fetch base data and localized tab in parallel
    Promise.all([
      fetchGoogleSheetCSV(SHEET_BASE_URL),
      fetchGoogleSheetCSV(localizedUrl).catch(() => []),
    ])
      .then(([baseRows, localizedRows]) => {
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

        setCardList(cards);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lang]);

  return {
    cardList, setCardList, loading, setLoading, error, setError
  }
};

export default useProperties
