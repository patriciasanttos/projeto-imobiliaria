import React, { useState, useRef, useEffect } from "react";
import "./MobileMenu.scss";

import MenuOpenIcon from "../../assets/Icons/MenuHeader/menu-open.svg";
import MenuCloseIcon from "../../assets/Icons/MenuHeader/menu-close.svg";


const MobileMenu = ({ menuItems, socialMedia }) => {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="mobile-menu-container">
      {!isOpen && (
        <button
          className="menu-toggle-btn"
          onClick={toggleMenu}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav-overlay"
        >
          <img src={MenuOpenIcon} alt="Abrir menu" />
        </button>
      )}

      {isOpen && (
        <div className="mobile-menu-fullscreen-overlay">
          <button
            className="menu-toggle-btn close-btn"
            onClick={toggleMenu}
            aria-label="Fechar menu"
          >
            <img src={MenuCloseIcon} alt="Fechar menu" />
          </button>
          <nav
            className="mobile-nav-overlay"
            id="mobile-nav-overlay"
            ref={overlayRef}
            aria-modal="true"
            role="dialog"
          >
            <ul className="mobile-nav-links">
              {menuItems.map((item, index) => (
                <li key={index} onClick={toggleMenu}>
                  <a href={item.link}>{item.name}</a>
                </li>
              ))}
            </ul>
            <div className="mobile-social-icons">
              {socialMedia.map((item, index) => (
                <a key={index} href={item.link}>
                  <img src={Object.values(item.icon)[0]} alt="Social Icon" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
