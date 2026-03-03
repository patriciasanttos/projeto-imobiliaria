import { useEffect, useState } from "react";
import { fetchGoogleSheetCSV } from "../utils/googleSheet";

//Images
import House1 from "../assets/Images/house-1.svg";


//Icons
import Room from "../assets/Icons/Propiedades/room-icon.svg";
import Bathroom from "../assets/Icons/Propiedades/bathroom-icon.svg";
import Car from "../assets/Icons/Propiedades/car-icon.svg";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9HwFXM91221YFd2SSXmNISzCmYPQB-4uvh-qWAkKf0ESpFZEGSXSkVBxh-MenIHqZ6RIqROo9CBot/pub?output=csv";

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
    nameLocation: row.Ubicacion,
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
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoogleSheetCSV(SHEET_URL)
      .then((rows) => setCardList(rows.map(mapSheetRowToCard)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return {
    cardList, setCardList, loading, setLoading, error, setError
  }
};

export default useProperties
