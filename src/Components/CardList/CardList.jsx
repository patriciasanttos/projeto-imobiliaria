import './CardList.scss';
import Card from '../Card/Card';

function CardList({cardList}) {
    return (
        <div className='card-list'>
            {cardList.map((card, index) => (
                <Card key={index} {...card} />
            ))}
        </div>
    )
}

export default CardList;