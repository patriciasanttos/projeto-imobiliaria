import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.scss";


import { useLanguage } from "../../context/LanguageContext.jsx";

// Static portfolio image (same for all properties)
import PropertyImg1 from "../../assets/Images/property-1.png";

import LocationIcon from "../../assets/Icons/Propiedades/location-icon.svg";



// Default center: Encarnación, Paraguay
const DEFAULT_CENTER = [-27.3364, -55.8667];
const DEFAULT_ZOOM = 13;

// Custom marker icon using the site's primary color
function createMarkerIcon(isActive = false) {
  const color = isActive ? "#C9A24D" : "#0E4F4F";
  const size = isActive ? 40 : 30;
  return L.divIcon({
    className: "custom-map-pin",
    html: `<svg width="${size}" height="${size}" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" fill="${color}"/>
      <circle cx="12" cy="12" r="5" fill="white"/>
    </svg>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
}

const defaultIcon = createMarkerIcon(false);
const activeIcon = createMarkerIcon(true);

// Component to recenter the map on a single marker click
function MapRecenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 14, { duration: 0.6 });
    }
  }, [center, map]);
  return null;
}

// Component to fit map bounds to show all markers
function MapFitBounds({ properties }) {
  const map = useMap();
  const hasFitted = useRef(false);

  useEffect(() => {
    if (properties.length === 0 || hasFitted.current) return;

    const bounds = L.latLngBounds(
      properties.map((p) => [p.coords.lat, p.coords.lng])
    );
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
    hasFitted.current = true;
  }, [properties, map]);

  return null;
}

// Fix Leaflet rendering when container size changes (responsive breakpoints)
function MapInvalidateSize() {
  const map = useMap();
  useEffect(() => {
    // Invalidate on mount after a brief delay to ensure CSS has applied
    const timer = setTimeout(() => map.invalidateSize(), 200);

    const handleResize = () => map.invalidateSize();
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [map]);
  return null;
}

// Mini card for the left panel
function PropertyListItem({
  property,
  isActive,
  onClick,
  itemRef,
  thumbnail,
}) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const s = (property.status || "").toLowerCase();
  const isDisabled = ["alquilado", "vendido", "agotado"].includes(s);

  return (
    <div
      ref={itemRef}
      className={`map-property-item${isActive ? " active" : ""}`}
      onClick={onClick}
    >
      <div className="map-property-item-image">
        <img
          src={thumbnail || property.image}
          alt={property.title}
          referrerPolicy="no-referrer"
        />
        {property.status && (
          <span
            className={`map-item-ribbon map-item-ribbon--${s}`}
            data-status={property.status}
          />
        )}
      </div>
      <div className="map-property-item-info">
        <h3>{property.title}</h3>
        <div className="map-property-item-location">
          <img src={LocationIcon} alt="" />
          <span>
            {[property.barrio, property.districto].filter(Boolean).join(", ")}
          </span>
        </div>
        <div className="map-property-item-price">
          {property.currency} {property.price}
        </div>
        <div className="map-property-item-tags">
          {property.tagList?.map((tag, i) => {
            const text = tag.type
              ? t(`card.tags.${tag.type}.${tag.count === 1 ? "one" : "many"}`)
              : "";
            const count = tag.type ? tag.count : "";
            const name = tag.name || "";
            return (
              <span key={i} className="map-item-tag">
                <img src={tag.icon} alt="" />
                {tag.type ? (
                  <>
                    <span className="map-item-tag__count">{count}</span>
                    <span className="map-item-tag__text">{text}</span>
                  </>
                ) : (
                  name
                )}
              </span>
            );
          })}
        </div>
        <button
          className={`map-property-item-btn${isDisabled ? " disabled" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            if (!isDisabled) navigate(`/propiedades/${property.id}`);
          }}
          disabled={isDisabled}
        >
          {t("card.viewDetails")}
        </button>
      </div>
    </div>
  );
}

function MapView({ cardList = [], loading = false }) {
  const { t } = useLanguage();
  const [activePropertyId, setActivePropertyId] = useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const itemRefs = useRef({});

  // Use pre-computed coordinates from JSON data (instant, no API calls)
  const propertiesWithCoords = useMemo(() => {
    return cardList
      .filter((p) => p.lat != null && p.lng != null)
      .map((p) => ({ ...p, coords: { lat: p.lat, lng: p.lng } }));
  }, [cardList]);

  // Compute center from all markers
  const computedCenter = useMemo(() => {
    if (propertiesWithCoords.length === 0) return DEFAULT_CENTER;
    const lats = propertiesWithCoords.map((p) => p.coords.lat);
    const lngs = propertiesWithCoords.map((p) => p.coords.lng);
    return [
      lats.reduce((a, b) => a + b, 0) / lats.length,
      lngs.reduce((a, b) => a + b, 0) / lngs.length,
    ];
  }, [propertiesWithCoords]);



  const handleMarkerClick = (property) => {
    setActivePropertyId(property.id);
    // Scroll the list item into view
    const ref = itemRefs.current[property.id];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleListItemClick = (property) => {
    setActivePropertyId(property.id);
    setMapCenter([property.coords.lat, property.coords.lng]);
  };

  return (
    <div className="map-view-container">
      {/* Left panel: property list */}
      <aside className="map-view-list">
        <div className="map-view-list-header">
          <span className="map-view-count">
            {propertiesWithCoords.length} {t("mapView.propertiesFound")}
          </span>
        </div>
        <div className="map-view-list-scroll">
          {loading ? (
            <div className="map-view-loading">
              <div className="map-view-spinner" />
              <p>{t("card.loading")}</p>
            </div>
          ) : propertiesWithCoords.length === 0 ? (
            <p className="map-view-empty">{t("card.noProperties")}</p>
          ) : (
            propertiesWithCoords.map((property) => (
              <PropertyListItem
                key={property.id}
                property={property}
                isActive={activePropertyId === property.id}
                onClick={() => handleListItemClick(property)}
                itemRef={(el) => (itemRefs.current[property.id] = el)}
                thumbnail={PropertyImg1}
              />
            ))
          )}
        </div>
      </aside>

      {/* Right panel: map */}
      <div className="map-view-map">
        <MapContainer
          center={computedCenter}
          zoom={DEFAULT_ZOOM}
          className="leaflet-map"
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapRecenter center={mapCenter} />
          <MapFitBounds properties={propertiesWithCoords} />
          <MapInvalidateSize />
          {propertiesWithCoords.map((property) => (
            <Marker
              key={property.id}
              position={[property.coords.lat, property.coords.lng]}
              icon={
                activePropertyId === property.id ? activeIcon : defaultIcon
              }
              eventHandlers={{
                click: () => handleMarkerClick(property),
              }}
            >
              <Popup>
                <div className="map-popup">
                  <strong>{property.title}</strong>
                  <span className="map-popup-price">
                    {property.currency} {property.price}
                  </span>
                  <span className="map-popup-location">
                    {[property.barrio, property.districto]
                      .filter(Boolean)
                      .join(", ")}
                  </span>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;
