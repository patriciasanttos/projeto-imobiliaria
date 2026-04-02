import "./CardList.scss";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import useProperties from "../../hooks/useProperties.js";

function CardList({ isShowAll, isFilterByHome, filters }) {
  const { cardList, loading } = useProperties();

  const getFilteredList = (list) => {
    const getListByFlags = (items) => {
      if (isShowAll) {
        return items;
      }

      if (isFilterByHome) {
        return items.filter((card) => card.home !== null && card.home !== "");
      }

      return items.slice(0, 2);
    };

    const filteredList = getListByFlags(list).filter((card) => {
      let returnRow = true;

      if (filters) {
        if (filters.operationType) {
          returnRow =
            returnRow &&
            card.operationType.toLowerCase() ===
              filters.operationType.toLowerCase();
        }

        if (filters.bedrooms) {
          const bedrooms = parseInt(card.bedrooms);
          const filterBedrooms = parseInt(filters.bedrooms);

          if (filterBedrooms === 4) {
            returnRow = returnRow && bedrooms >= 4;
          } else {
            returnRow = returnRow && bedrooms === filterBedrooms;
          }
        }

        if (filters.propertyType) {
          returnRow =
            returnRow &&
            card.propertyType.toLowerCase() ===
              filters.propertyType.toLowerCase();
        }

        if (filters.districto) {
          returnRow =
            returnRow &&
            card.districto &&
            card.districto.toLowerCase() === filters.districto.toLowerCase();
        }

        if (filters.barrio) {
          returnRow =
            returnRow &&
            card.barrio &&
            card.barrio.toLowerCase() === filters.barrio.toLowerCase();
        }

        if (filters.minPrice && card.price) {
          const price = parseInt(
            card.price.replace(/\./g, "").replace(/,/g, ""),
          );
          returnRow = returnRow && price >= filters.minPrice;
        }

        if (filters.maxPrice && card.price) {
          const price = parseInt(
            card.price.replace(/\./g, "").replace(/,/g, ""),
          );
          returnRow = returnRow && price <= filters.maxPrice;
        }
      }

      return returnRow;
    });

    if (filters?.sortOrder === "desc" || filters?.sortOrder === "asc") {
      filteredList.sort((a, b) => {
        const parsePrice = (card) =>
          card.price
            ? parseInt(card.price.replace(/\./g, "").replace(/,/g, ""))
            : 0;
        const diff = parsePrice(a) - parsePrice(b);
        return filters.sortOrder === "asc" ? diff : -diff;
      });
    }

    return filteredList;
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="card-list">
      {getFilteredList(cardList).map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
}

export default CardList;
