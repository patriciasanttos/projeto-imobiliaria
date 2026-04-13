import "./Card.scss";

import Location from "../../assets/Icons/Propiedades/location-icon.svg";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext.jsx";

// Static portfolio image (same for all properties)
import PropertyImg1 from "../../assets/Images/property-1.png";

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
  const displayImage = PropertyImg1;
  const imageLoading = false;

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
          data-status={t(`card.status.${status.toLowerCase()}`) || status}
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
