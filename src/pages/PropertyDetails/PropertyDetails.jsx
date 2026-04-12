import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "./PropertyDetails.scss";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Icons
import ArrowBack from "../../assets/Icons/arrow-back.svg";
import ArrowZoom from "../../assets/Icons/PropertyDetails/arrow-zoom.svg";
import LocationGreen from "../../assets/Icons/PropertyDetails/location-green.svg";
import WhatsApp from "../../assets/Icons/Social media/whatsapp-icon.svg";
import ShareIcon from "../../assets/Icons/Social media/share-icon.svg";

// Components
import Button from "../../Components/Button/Button.jsx";
import Modal from "../../Components/Modal/Modal.jsx";
import Card from "../../Components/Card/Card.jsx";
import useProperties from "../../hooks/useProperties";
import useVariables from "../../hooks/useVariables";

// Utils
import { extractFolderId } from "../../utils/googleDrive";
import { extractCoordinates } from "../../utils/mapCoordinates";

// Images
import HouseImg from "../../assets/Images/house-1.svg";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzSEn2OIiqn8ATsvdUknoK2v0SUvfTYNfiAzX9Mf0UJS2JWrgqr_TE0Rtur770b9JIf/exec";

const DEFAULT_MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d453777.9190199634!2d-55.884627!3d-27.308807!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9457955e5597cfeb%3A0x6ff7d247ff05c071!2sEncarnaci%C3%B3n%2C%20Paraguay!5e0!3m2!1ses!2sus!4v1767910786774!5m2!1ses!2sus";

function buildEmbedFromQuery(query) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed&iwloc=near`;
}

function getEmbedMapUrl(url, locationFallback) {
  if (!url) return DEFAULT_MAP_URL;
  // Already an embed URL
  if (url.includes("/maps/embed")) return url;
  // Extract coordinates from Google Maps URL
  const coords = extractCoordinates(url);
  if (coords) return buildEmbedFromQuery(`${coords.lat},${coords.lng}`);
  // Extract place name from full Google Maps URLs
  // e.g. https://www.google.com/maps/place/Some+Place/...
  const placeMatch = url.match(/\/maps\/place\/([^/@]+)/);
  if (placeMatch)
    return buildEmbedFromQuery(
      decodeURIComponent(placeMatch[1].replace(/\+/g, " ")),
    );
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
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { cardList, loading } = useProperties();
  const { variables } = useVariables();
  const property = cardList.find((p) => p.id === id);
  const detallesList = parseDetalles(property?.detalles);

  const otherProperties = useMemo(() => {
    const STATUS_PRIORITY = {
      disponible: 0,
      reservado: 1,
      alquilado: 2,
      vendido: 3,
      agotado: 4,
    };
    // Only same districto
    const sameDistricto = cardList.filter(
      (p) => p.id !== id && p.districto === property?.districto
    );
    // Shuffle
    const shuffled = [...sameDistricto].sort(() => Math.random() - 0.5);
    // Sort by status priority
    shuffled.sort((a, b) => {
      const pa = STATUS_PRIORITY[(a.status || "").toLowerCase()] ?? 99;
      const pb = STATUS_PRIORITY[(b.status || "").toLowerCase()] ?? 99;
      return pa - pb;
    });
    return shuffled.slice(0, 3);
  }, [cardList, id, property]);

  // Scroll to top when navigating to a property
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

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

  const pageTitle = property
    ? `${property.title} – ${property.currency} ${property.price}`
    : "Negocios Inmobiliarios";
  const pageDescription = property?.descripcion || property?.title || "";
  const pageImage = images.length > 0 ? images[0] : "";
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="property-page">
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        {pageImage && <meta property="og:image" content={pageImage} />}
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        {pageImage && <meta name="twitter:image" content={pageImage} />}
      </Helmet>
      <section className="property-container">
        <div className="back-page" onClick={() => navigate("/propiedades")}>
          <img src={ArrowBack} alt={t("propertyDetails.back")} />
          <p>{t("propertyDetails.back")}</p>
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
                text={t("propertyDetails.enlargePhoto")}
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
              <h1>
                {loading ? (
                  <span className="text-skeleton" style={{ width: "16rem" }}>
                    &nbsp;
                  </span>
                ) : (
                  property?.title
                )}
              </h1>
              <h1 className="property-price">
                {property?.currency} {property?.price}
              </h1>
            </div>

            <div className="property-adress-container">
              <div className="property-adress-left">
                <div className="property-location">
                  <img src={LocationGreen} alt="Localização" />
                  <p>
                    {loading ? (
                      <span
                        className="text-skeleton"
                        style={{ width: "12rem" }}
                      >
                        &nbsp;
                      </span>
                    ) : (
                      [property?.barrio, property?.districto].filter(Boolean).join(", ")
                    )}
                  </p>
                </div>

                <div className="property-tags">
                  {property?.tagList?.map((tag, index) => {
                    const label = tag.type
                      ? `${tag.count} ${t(`card.tags.${tag.type}.${tag.count === 1 ? "one" : "many"}`)}`
                      : tag.name;
                    return (
                      <span className="tag" key={index}>
                        <img src={tag.icon} alt="" />
                        {label}
                      </span>
                    );
                  })}
                </div>
                {property?.agentId && (
                  <p className="property-agent-id">ID: {property.agentId}</p>
                )}
              </div>

              <div className="property-btn-container">
                <Button
                  text={t("propertyDetails.inquire")}
                  icon={WhatsApp}
                  className="property-btn-contact"
                  onClick={() => {
                    const template = variables.PropertyLink || "";
                    if (template) {
                      const url = template.replace(
                        "[LINK]",
                        window.location.href,
                      );
                      window.open(url, "_blank");
                    }
                  }}
                />
                <Button
                  text={t("propertyDetails.share")}
                  icon={ShareIcon}
                  className="property-btn-share"
                  onClick={async () => {
                    const shareUrl = window.location.href;

                    if (navigator.share) {
                      try {
                        await navigator.share({
                          title: property?.title || "",
                          url: shareUrl,
                        });
                      } catch (err) {
                        if (err.name !== "AbortError") {
                          console.error("Share failed:", err);
                        }
                      }
                    } else {
                      try {
                        await navigator.clipboard.writeText(shareUrl);
                        alert(
                          t("propertyDetails.linkCopied") || "Link copied!",
                        );
                      } catch (err) {
                        console.error("Copy failed:", err);
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="property-description">
              <h2>{t("propertyDetails.description")}</h2>
              {loading ? (
                <div className="description-columns">
                  <ul className="check-list">
                    {[1, 2, 3].map((i) => (
                      <li key={i}>
                        <span
                          className="text-skeleton"
                          style={{ width: `${8 + i * 2}rem` }}
                        >
                          &nbsp;
                        </span>
                      </li>
                    ))}
                  </ul>
                  <ul className="check-list">
                    {[1, 2, 3].map((i) => (
                      <li key={i}>
                        <span
                          className="text-skeleton"
                          style={{ width: `${10 - i}rem` }}
                        >
                          &nbsp;
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <>
                  <div className="description-columns">
                    <ul className="check-list">
                      {detallesList
                        .slice(0, Math.ceil(detallesList.length / 2))
                        .map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                    </ul>
                    <ul className="check-list">
                      {detallesList
                        .slice(Math.ceil(detallesList.length / 2))
                        .map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                    </ul>
                  </div>
                  {property?.descripcion && (
                    <p className="property-description-text">
                      {property.descripcion}
                    </p>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
        <section className="contact-map-container">
          <h1>{t("propertyDetails.location")}</h1>
          <iframe
            src={getEmbedMapUrl(property?.maps, [property?.barrio, property?.districto].filter(Boolean).join(", "))}
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
        <h1>{t("propertyDetails.otherProperties")}</h1>
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
