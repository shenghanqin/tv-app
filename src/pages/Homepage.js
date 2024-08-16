import { useContext, useEffect } from "react";

// Context
import ShowsContext from "../context/shows/showsContext";

// Components
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";

const Homepage = () => {
  const showsContext = useContext(ShowsContext);
  const { loading, shows, homeShows } = showsContext;

  useEffect(() => {
    homeShows()
  }, [])

  return (
    <div className="homepage">
      {
        loading
        ? (
          <Loader />
        ) 
        : (
          <div className="homepage__list">
            {shows.map((item) => {
              const { show} = item
              const { id, image, name, rating } = show || item
              return (
                <ListItem
                  key={id}
                  id={id}
                  image={
                    image
                      ? image.medium
                      : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                  }
                  name={name}
                  rating={
                    rating.average
                      ? rating.average
                      : "No rating"
                  }
                />
              )
            })}
          </div>
        )
      }
    </div>
  );
};

export default Homepage;
