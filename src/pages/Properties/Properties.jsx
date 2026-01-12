import "./Properties.scss";

import PropertiesFilter from "../../Components/PropertiesFilter/PropertiesFilter";
import CardList from "../../Components/CardList/CardList.jsx";

function Properties() {
  return (
    <section className="properties-container">
      <section className="properties-description">
        <h1>Encuentre la propiedad de sus sueños</h1>
        <p>
          Bienvenido a Habbita, donde la propiedad de tus sueños te espera en
          cada rincón de nuestro hermoso mundo. Explora nuestra cuidada
          selección de propiedades, cada una con una historia única y la
          oportunidad de redefinir tu vida. Con categorías que se adaptan a cada
          soñador, tu viaje...
        </p>
      </section>
      <PropertiesFilter />
      <CardList isShowAll/>
    </section>
  );
}

export default Properties;
