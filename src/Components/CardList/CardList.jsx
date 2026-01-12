import "./CardList.scss";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import useProperties from "../../hooks/useProperties.js";

function CardList({isShowAll, isFilterByHome}) {
  const { cardList, loading } = useProperties();

  const getFilteredList = () => {
    if (isShowAll) {
      return cardList
    }

    if (isFilterByHome) {
      return cardList.filter(
        (card) => card.home !== null && card.home !== ""
      );
    }

    return cardList.slice(0, 2)
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="card-list">
      {getFilteredList().map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}

export default CardList;
