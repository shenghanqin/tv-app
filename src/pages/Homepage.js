import { useContext, useEffect } from "react";

// Context
import ShowsContext from "../context/shows/showsContext";

// Components
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import { useMediaQuery } from "react-responsive";

const Homepage = () => {
  const showsContext = useContext(ShowsContext);
  const { loading, shows, homeShows, searchTerm } = showsContext;

  const isLarge = useMediaQuery({ minWidth: 700 })

  useEffect(() => {
    homeShows()
    console.log('usereff')
  }, [])

  return (
    <div className="homepage">
      {
        loading
        ? (
          <Loader />
        ) 
        : (
          <>
              {!!searchTerm && (
                <div>The content of "{searchTerm}" is displayed. There are {shows.length} results</div>
              )}
              <div className="homepage__list">
                {shows.map((item) => {
                  const { show } = item
                  const { id, image, name, rating } = show || item
                  return (
                    <ListItem
                      isLarge={isLarge}
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
          </>
        )
      }
    </div>
  );
};

export default Homepage;
