import "./CardList.scss";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

function CardList({ cardList, loading }) {
  return loading ? (
    <Loading />
  ) : (
    <div className="card-list">
      {cardList.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}

export default CardList;
