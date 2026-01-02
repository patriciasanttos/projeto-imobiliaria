// import { useState } from 'react'

import Card from './Components/Card/Card.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Header from './Components/Header/Header.jsx'
import './index.scss'

//Icons
import Room from "./assets/Icons/Propiedades/room-icon.svg";
import Bathroom from "./assets/Icons/Propiedades/bathroom-icon.svg";
import Car from "./assets/Icons/Propiedades/car-icon.svg";
import CardList from './Components/CardList/CardList.jsx';

//Images
import House1 from "./assets/Images/house-1.svg";


function App() {
  
  return (
    <>
      <Header />
      <CardList
        cardList={[
          {
            title: "Dúplex en Venta",
            nameLocation: "Barrio San Miguel, Cambyretá",
            image: House1,
            price: "Gs. 4.500.000",
            tagList: [
              { icon: Room, name: "2-Habitación" },
              { icon: Bathroom, name: "2-Baño" },
              { icon: Car, name: "2-Auto" },
            ],
          },
          {
            title: "Tchururu",
            nameLocation: "Barrio San Miguel, Cambyretá",
            image: House1,
            price: "Gs. 3.500.000",
            tagList: [
              { icon: Room, name: "1-Habitación" },
              { icon: Bathroom, name: "1-Baño" },
            ],
          },
          {
            title: "Departamento en Alquiler",
            nameLocation: "Barrio San Miguel, Cambyretá",
            image: House1,
            price: "Gs. 2.500.000",
            tagList: [
              { icon: Room, name: "1-Habitación" },
              { icon: Bathroom, name: "1-Baño" },
            ],
          },
        ]}
      />
      <Footer />
    </>
  );
}

export default App
