import { Link } from "react-router-dom";
import BetterPicture from "./BetterPicture";

const ListItem = ({ image, name, rating, id }) => {
  return (
    <Link to={`/singleshow/${id}`} className="listitem">
      <BetterPicture src={image} width="210" height="295" />
      <div className="listitem__info">
        <h4 className="info__name">{name}</h4>
        <h4 className="info__rating">{rating}</h4>
      </div>
    </Link>
  );
};

export default ListItem;
