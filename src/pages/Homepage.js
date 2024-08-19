import { useContext, useEffect } from "react";

// Context
import ShowsContext from "../context/shows/showsContext";

// Components
import ListItem from "../components/ListItem/index";
import ScrollSlider from "../components/ScrollSlider/index";
import HomeBanner from "../components/HomeBanner/index";
import Loader from "../components/Loader/index";
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

  console.log('searchTerm', searchTerm)

  return (
    <div className="homepage">
      {
        loading
        ? (
          <Loader />
        ) 
        : (
          <>
              <HomeBanner {...(shows[parseInt(Math.random() * 20)])} isHome={true} />
              <h2 className="floor-title">All Time Popular Shows</h2>
              <div className='slider-list'>
                <ScrollSlider
                  isNeedScrollbar={!isLarge}
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
                  isNeedScrollbar={!isLarge}
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
