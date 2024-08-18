import { Link } from "react-router-dom";
import BetterPicture from "./BetterPicture";
import { Rating } from 'react-simple-star-rating'

const ListItem = ({ image, name, rating, id, genres, isLarge }) => {
  const imageUrl = image
    ? image.medium
    : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"

  const ratingNum = rating.average
  return (
    <Link to={`/singleshow/${id}`} className="listitem">
      <BetterPicture src={imageUrl} width={isLarge ? 210 : 140} height={isLarge ? 295 : 196} />
      {!!ratingNum && <h3 className="info__rating"><i className="fas fa-star"></i>{ratingNum}</h3>}
      <div className="listitem__info">
        <h2 className="info__name">{name}</h2>
        <p className="info__genres"><span>Genres:</span> {genres.join(', ')}</p>
      </div>
    </Link>
  );
};

export default ListItem;
