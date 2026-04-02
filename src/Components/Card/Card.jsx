import "./Card.scss";
import { useState, useEffect } from "react";

import Location from "../../assets/Icons/Propiedades/location-icon.svg";
import { useNavigate } from "react-router-dom";
import { extractFolderId, getDriveImageUrl } from "../../utils/googleDrive";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Google Apps Script URL - User needs to deploy and update this
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzSEn2OIiqn8ATsvdUknoK2v0SUvfTYNfiAzX9Mf0UJS2JWrgqr_TE0Rtur770b9JIf/exec";

function Card({
  id,
  tagList,
  title,
  districto,
  barrio,
  agentId,
  status,
  image,
  imagenes,
  price,
  currency,
}) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [displayImage, setDisplayImage] = useState(image);
  const [imageLoading, setImageLoading] = useState(false);

  useEffect(() => {
    // If we have a Google Drive folder URL and Apps Script is configured
    if (imagenes && APPS_SCRIPT_URL) {
      setImageLoading(true);
      const folderId = extractFolderId(imagenes);
      console.log(">>> folderId", folderId);

      if (folderId) {
        // Use redirect: 'follow' for Google Apps Script CORS compatibility
        fetch(`${APPS_SCRIPT_URL}?folderId=${folderId}`, {
          method: "GET",
          redirect: "follow",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(">>> Drive response:", data);
            if (data.images && data.images.length > 0) {
              console.log(">>> Image URL:", data.images[0].url);
              setDisplayImage(data.images[0].url);
            }
          })
          .catch((err) => {
            console.error("Error fetching Drive images:", err);
          })
          .finally(() => setImageLoading(false));
      } else {
        setImageLoading(false);
      }
    }
  }, [imagenes]);

  const onClickPropertyDetails = () => {
    navigate(`/propiedades/${id}`);
  };

  return (
    <section className="card-container">
      <div className="card-img-container">
        {imageLoading ? (
          <div className="card-img-skeleton"></div>
        ) : (
          <img
            src={displayImage}
            alt=""
            className="card-img"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      {status && (
        <span
          className={`card-ribbon card-ribbon--${status.toLowerCase()}`}
          data-status={status}
        ></span>
      )}
      <section className="card-information">
        <h3>{title}</h3>

        <div className="card-location">
          <img src={Location} alt="" />
          <p>{[barrio, districto].filter(Boolean).join(", ")}</p>
          {agentId && <span className="card-agent-id">ID: {agentId}</span>}
        </div>

        <div className="card-tag-list">
          {tagList.map((tag, index) => {
            const label = tag.type
              ? `${tag.count} ${t(`card.tags.${tag.type}.${tag.count === 1 ? "one" : "many"}`)}`
              : tag.name;
            return (
              <div key={index} className="card-tags">
                <img src={tag.icon} alt="" />
                <p>{label}</p>
              </div>
            );
          })}
        </div>

        <div className="card-footer">
          <div className="card-price">
            <p className="price-title">{t("card.price")}</p>
            <p className="price-value">
              {currency} {price}
            </p>
          </div>
          <div className="card-button-container">
            {(() => {
              const s = (status || "").toLowerCase();
              const isDisabled = ["alquilado", "vendido", "agotado"].includes(s);
              return (
                <button
                  className={`card-button${isDisabled ? " card-button--disabled" : ""}`}
                  onClick={isDisabled ? undefined : onClickPropertyDetails}
                  disabled={isDisabled}
                >
                  {t("card.viewDetails")}
                </button>
              );
            })()}
          </div>
        </div>
      </section>
    </section>
  );
}

export default Card;
