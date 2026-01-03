//Icons
import Room from "../../assets/Icons/Propiedades/room-icon.svg";
import Bathroom from "../../assets/Icons/Propiedades/bathroom-icon.svg";
import Car from "../../assets/Icons/Propiedades/car-icon.svg";
import CardList from "../../Components/CardList/CardList.jsx";
import { useEffect, useState } from "react";
import { fetchGoogleSheetCSV } from "../../utils/googleSheet";

//Images
import House1 from "../../assets/Images/house-1.svg";


const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9HwFXM91221YFd2SSXmNISzCmYPQB-4uvh-qWAkKf0ESpFZEGSXSkVBxh-MenIHqZ6RIqROo9CBot/pub?output=csv";

function mapSheetRowToCard(row) {

  return {
    id: row.ID,
    title: row.Titulo,
    nameLocation: row.Ubicacion,
    image: House1,
    price: row.Precio,
    tagList: [
      { icon: Room, name: `${row.Habitaciones}-Habitación`},
      { icon: Bathroom, name: `${row.Bano}-Baño`},
      { icon: Car, name: `${row.Cochera}-Auto`},
    ]
  };
}

function Home() {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoogleSheetCSV(SHEET_URL)
      .then(rows => setCardList(rows.map(mapSheetRowToCard)))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando propriedades...</div>;
  if (error) return <div>Erro ao carregar propriedades: {error}</div>;

  return (
    <div>
      <CardList cardList={cardList} />
    </div>
  );
}

export default Home;
