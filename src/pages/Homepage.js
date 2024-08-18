import { useContext, useEffect } from "react";

// Context
import ShowsContext from "../context/shows/showsContext";

// Components
import ListItem from "../components/ListItem";
import Loader from "../components/Loader";
import { useMediaQuery } from "react-responsive";
import { InView } from 'react-intersection-observer'

const Homepage = () => {
  const showsContext = useContext(ShowsContext);
  const { loading, shows, homeShows, searchTerm, loadingMore, loadMoreShows } = showsContext;

  const isLarge = useMediaQuery({ minWidth: 700 })

  useEffect(() => {
    homeShows()
  }, [])

  const onLineChange = (visible) => {
    console.log("🚀 ~ onLineChange ~ onLineChange:")
    if (visible) {
      loadMoreShows()
    }
  }

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
                  const { id } = show || item
                  return (
                    <ListItem
                      isLarge={isLarge}
                      key={id}
                      id={id}
                      {...(show || item)}
                    />
                  )
                })}

              </div>
              {!!loadingMore && (
                <Loader size="small" />
              )}
              {/* TODO search don't support pagination */}
              {!searchTerm && !loadingMore && shows.length > 0 && <InView as="div" onChange={onLineChange}></InView>}

          </>
        )
      }
    </div>
  );
};

export default Homepage;
