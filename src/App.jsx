// import { useState } from 'react'
import { useEffect } from "react";

import Footer from "./Components/Footer/Footer.jsx";
import Header from "./Components/Header/Header.jsx";
import ScrollTop from "./Components/ScrollTop/ScrollTop.jsx";
import "./index.scss";

import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home/Home.jsx";
import Contact from "./pages/Contact/Contact.jsx";
import AboutUs from "./pages/AboutUs/AboutUs.jsx";
import Properties from "./pages/Properties/Properties.jsx";
import PropertyDetails from "./pages/PropertyDetails/PropertyDetails.jsx";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/quienes-somos" element={<AboutUs />} />
        <Route path="/propiedades" element={<Properties />} />
        <Route path="/propiedades/:id" element={<PropertyDetails />} />
      </Routes>
      <ScrollTop />
      <Footer />
    </>
  );
}

export default App;
