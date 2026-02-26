import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.scss";

// Icons
import ArrowBack from "../../assets/Icons/arrow-back.svg";
import ArrowZoom from "../../assets/Icons/PropertyDetails/arrow-zoom.svg";
import LocationGreen from "../../assets/Icons/PropertyDetails/location-green.svg";
import WhatsApp from "../../assets/Icons/Social media/whatsapp-icon.svg";
import ShareIcon from "../../assets/Icons/Social media/share-icon.svg";

// Components
import Button from "../../Components/Button/Button.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import Card from "../../components/Card/Card.jsx";
import useProperties from "../../hooks/useProperties";

// Utils
import { extractFolderId } from "../../utils/googleDrive";

// Images
import HouseImg from "../../assets/Images/house-1.svg";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzSEn2OIiqn8ATsvdUknoK2v0SUvfTYNfiAzX9Mf0UJS2JWrgqr_TE0Rtur770b9JIf/exec";

const DEFAULT_MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d453777.9190199634!2d-55.884627!3d-27.308807!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457955e5597cfeb%3A0x6ff7d247ff05c071!2sEncarnaci%C3%B3n%2C%20Paraguay!5e0!3m2!1ses!2sus!4v1767910786774!5m2!1ses!2sus";

function buildEmbedFromQuery(query) {
  return `https://www.google.com/maps?output=embed&q=${encodeURIComponent(query)}`;
}

function getEmbedMapUrl(url, locationFallback) {
  if (!url) return DEFAULT_MAP_URL;
  // Already an embed URL
  if (url.includes("/maps/embed")) return url;
  // Extract place/search query from full Google Maps URLs
  // e.g. https://www.google.com/maps/place/Some+Place/@-27.3,...
  const placeMatch = url.match(/\/maps\/place\/([^/@]+)/);
  if (placeMatch)
    return buildEmbedFromQuery(
      decodeURIComponent(placeMatch[1].replace(/\+/g, " ")),
    );
  // Extract @lat,lng from URL
  const coordMatch = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (coordMatch)
    return buildEmbedFromQuery(`${coordMatch[1]},${coordMatch[2]}`);
  // Extract query param ?q=...
  try {
    const parsed = new URL(url);
    const q = parsed.searchParams.get("q");
    if (q) return buildEmbedFromQuery(q);
  } catch (e) {
    /* not a URL */
  }
  // Short URLs (goo.gl, maps.app.goo.gl) — use location name as query
  if (url.includes("goo.gl") || url.includes("maps.app")) {
    return buildEmbedFromQuery(locationFallback || "Encarnación, Paraguay");
  }
  // Fallback: use the URL as a search query
  return buildEmbedFromQuery(url);
}

function parseDetalles(detalles) {
  if (!detalles) return [];
  return detalles
    .split("\n")
    .map((line) => line.replace(/^✓\s*/, "").trim())
    .filter((line) => line.length > 0);
}

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cardList } = useProperties();
  const property = cardList.find((p) => p.id === id);
  const detallesList = parseDetalles(property?.detalles);

  const otherProperties = useMemo(() => {
    const others = cardList.filter((p) => p.id !== id);
    // Shuffle and pick up to 3
    const shuffled = [...others].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [cardList, id]);

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Fetch images from Google Drive folder
  useEffect(() => {
    if (!property?.imagenes || !APPS_SCRIPT_URL) {
      setImageLoading(false);
      return;
    }
    const folderId = extractFolderId(property.imagenes);
    if (!folderId) {
      setImageLoading(false);
      return;
    }

    setImageLoading(true);
    fetch(`${APPS_SCRIPT_URL}?folderId=${folderId}`, {
      method: "GET",
      redirect: "follow",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.images && data.images.length > 0) {
          setImages(data.images.map((img) => img.url));
          setCurrentImageIndex(0);
        }
      })
      .catch((err) => console.error("Error fetching Drive images:", err))
      .finally(() => setImageLoading(false));
  }, [property?.imagenes]);

  const selectImage = (index) => setCurrentImageIndex(index);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div className="property-page">
      <section className="property-container">
        <div className="back-page" onClick={() => navigate(-1)}>
          <img src={ArrowBack} alt="Volver" />
          <p>Volver</p>
        </div>

        <div className="property-description-container">
          <div className="property-photos">
            <div
              className="property-main-photo"
              onClick={!imageLoading ? openModal : undefined}
              style={{ cursor: imageLoading ? "default" : "pointer" }}
            >
              {imageLoading ? (
                <div className="photo-skeleton" />
              ) : (
                <img
                  src={images[currentImageIndex]}
                  alt="Foto principal"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            <div className="zoom-photo-btn-container">
              <Button
                text="Ampliar foto"
                icon={ArrowZoom}
                className="zoom-photo-btn"
                onClick={openModal}
              />
            </div>

            <div className="property-mini-photos">
              {imageLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="mini-photo">
                      <div className="photo-skeleton" />
                    </div>
                  ))
                : images.map((src, i) => (
                    <div
                      key={i}
                      className={`mini-photo${i === currentImageIndex ? " active" : ""}`}
                      onClick={() => selectImage(i)}
                    >
                      <img
                        src={src}
                        alt={`Foto ${i + 1}`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
            </div>
          </div>

          <section className="property-info">
            <div className="property-title">
              <h1>Dúplex en Venta</h1>
              <h1 className="property-price">Gs. 4.500.000</h1>
            </div>

            <div className="property-adress-container">
              <div className="property-location">
                <img src={LocationGreen} alt="Localização" />
                <p>Barrio San Miguel, Cambyretá</p>
              </div>

              <div className="property-btn-container">
                <Button
                  text="Consultar"
                  icon={WhatsApp}
                  className="property-btn-contact"
                />
                <Button
                  text="Compartir"
                  icon={ShareIcon}
                  className="property-btn-share"
                />
              </div>
            </div>

            <div className="property-tags">
              {property?.tagList?.map((tag, index) => (
                <span className="tag" key={index}>
                  <img src={tag.icon} alt="" />
                  {tag.name}
                </span>
              ))}
            </div>

            <div className="property-description">
              <h2>Descripción</h2>
              <div className="description-columns">
                <ul className="check-list">
                  {detallesList
                    .slice(0, Math.ceil(detallesList.length / 2))
                    .map((item, i) => (
                      <li key={i}>
                        <span className="checkmark">✓</span>
                        {item}
                      </li>
                    ))}
                </ul>
                <ul className="check-list">
                  {detallesList
                    .slice(Math.ceil(detallesList.length / 2))
                    .map((item, i) => (
                      <li key={i}>
                        <span className="checkmark">✓</span>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
              {property?.descripcion && (
                <p className="property-description-text">
                  {property.descripcion}
                </p>
              )}
            </div>
          </section>
        </div>
        <section className="contact-map-container">
          <h1>Ubicación</h1>
          <iframe
            src={getEmbedMapUrl(property?.maps, property?.nameLocation)}
            width="1200"
            height="376"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </section>
      <div className="div-property-details"></div>
      <section className="similar-properties-container">
        <h1>Ver otras propiedades</h1>
        <div className="similar-properties-grid">
          {otherProperties.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>
      </section>

      {/* Photo Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={images}
        currentIndex={currentImageIndex}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </div>
  );
}

export default PropertyDetails;
