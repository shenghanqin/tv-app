import { useContext, useEffect } from "react";

// Context
import ShowsContext from "../context/shows/showsContext";

// Components
import ListItem from "../components/ListItem";
import ScrollSlider from "../components/ScrollSlider";
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
              {!searchTerm && (
                <>
                  <h2 className="floor-title">All Time Popular Shows</h2>
                  <div className='slider-list'>
                    <ScrollSlider
                      isNeedScrollbar={false}
                    >
                      {shows.slice(0, 12).map((item) => {
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
                    </ScrollSlider>
                  </div>
                  <h2 className="floor-title">New Shows to Watch</h2>
                  <div className='slider-list'>
                    <ScrollSlider
                      isNeedScrollbar={false}
                    >
                      {shows.slice(12, 24).map((item) => {
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
                    </ScrollSlider>
                  </div>
                </>
              )}
              <h2 className="floor-title">All Shows</h2>
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
