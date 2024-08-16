import { Link } from "react-router-dom";
import BetterPicture from "./BetterPicture";
import { Rating } from 'react-simple-star-rating'

const ListItem = ({ image, name, rating, id, type, isLarge }) => {
  return (
    <Link to={`/singleshow/${id}`} className="listitem">
      <BetterPicture src={image} width={isLarge ? 210 : 140} height={isLarge ? 295 : 196} />
      <p className="info__type"><i className="fas fa-book"></i>&nbsp;{type}</p>
      <div className="listitem__info">
        <h2 className="info__name">{name}</h2>
        <h3 className="info__rating">{rating}</h3>
        <h4 className="info__rating"><Rating ratingValue={rating} iconsCount={10} fillColor="var(--secondary-color)" /></h4>
      </div>
    </Link>
  );
};

export default ListItem;
