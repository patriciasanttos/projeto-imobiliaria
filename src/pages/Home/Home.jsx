import { useEffect, useState } from "react";
import { fetchGoogleSheetCSV } from "../../utils/googleSheet";
import "./Home.scss";

//Components
import Button from "../../Components/Button/Button.jsx";

//Icons
import Room from "../../assets/Icons/Propiedades/room-icon.svg";
import Bathroom from "../../assets/Icons/Propiedades/bathroom-icon.svg";
import Car from "../../assets/Icons/Propiedades/car-icon.svg";
import CardList from "../../Components/CardList/CardList.jsx";
import ArrowWhiteButton from "../../assets/Icons/arrow-white-button-icon.svg";
import ArrowBlackButton from "../../assets/Icons/arrow-black-button-icon.svg";

//Images
import House1 from "../../assets/Images/house-1.svg";
import HeroImg from "../../assets/Images/hero-home.svg";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS9HwFXM91221YFd2SSXmNISzCmYPQB-4uvh-qWAkKf0ESpFZEGSXSkVBxh-MenIHqZ6RIqROo9CBot/pub?output=csv";

function mapSheetRowToCard(row) {
  return {
    id: row.ID,
    title: row.Titulo,
    nameLocation: row.Ubicacion,
    image: House1,
    price: row.Precio,
    tagList: [
      { icon: Room, name: `${row.Habitaciones}-Habitación` },
      { icon: Bathroom, name: `${row.Bano}-Baño` },
      { icon: Car, name: `${row.Cochera}-Auto` },
    ],
  };
}

function Home() {
  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGoogleSheetCSV(SHEET_URL)
      .then((rows) => setCardList(rows.map(mapSheetRowToCard)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Carregando propriedades...</div>;
  if (error) return <div>Erro ao carregar propriedades: {error}</div>;

  return (
    <section className="home-section">
      <section className="hero-section">
        <img src={HeroImg} alt="" className="hero-img" />
        <div className="description-section">
          <h1 className="hero-title">Hacemos realidad el lugar que soñás…</h1>
          <p className="hero-text">
            En <span>Habbita Negocios Inmobiliarios</span>, cada propiedad es
            una oportunidad, cada cliente, una historia, y cada historia, una
            misión cumplida. <br />
            Descubrí espacios con alma, viví donde querés estar.
          </p>
          <div className="home-buttons-container">
            <Button
              text={"Contactanos"}
              icon={ArrowBlackButton}
              className="btn-gold home-btn"
            />
          </div>
        </div>
      </section>
      <div className="div-home"></div>
      <section className="card-description-container">
        <div className="card-description-section">
          <div>
            <h1 className="card-description-title">Propiedades Destacadas</h1>
            <p className="card-description-text">
              Explore nuestra cuidada selección de propiedades destacadas. Cada
              anuncio ofrece un vistazo a las excepcionales casas e inversiones
              disponibles a través de Habbita. Haga clic en "Ver Detalles" para
              más información.
            </p>
          </div>
          <div className="card-button-container">
            <Button
              text={"Ver todas propiedades"}
              icon={ArrowWhiteButton}
              className="btn-green"
            />
          </div>
        </div>
      </section>
      <CardList cardList={cardList} />
    </section>
  );
}

export default Home;
