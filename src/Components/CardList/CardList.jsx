import './CardList.scss';
import Card from '../Card/Card';

function CardList({ cardList }) {
    return (
        <div className='card-list'>
            {cardList.map((card) => (
                <Card key={card.id} {...card} />
            ))}
        </div>
    );
}

export default CardList;