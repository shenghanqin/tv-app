import { useEffect, useContext } from "react";

// Context
import ShowsContext from "../context/shows/showsContext";
import { useMediaQuery } from "react-responsive";
// Components
import Loader from "../components/Loader/index";
import ScrollSlider from "../components/ScrollSlider/index";
import HomeBanner from "../components/HomeBanner/index";

const Singlepage = ({ match }) => {
  const { getSingleShow, singleShow, loading } = useContext(ShowsContext);

  const { _embedded } = singleShow
   console.log("🚀 ~ Singlepage ~ _embedded:", _embedded)
   


  const isLarge = useMediaQuery({ minWidth: 700 })

  useEffect(() => {
    getSingleShow(match.params.id);

    // eslint-disable-next-line
  }, []);

  const removeTags = (text) => {
    if (text === null || text === "") {
      return false;
    } else {
      text = text.toString();
    }
    return text.replace(/(<([^>]+)>)/gi, "");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HomeBanner {...singleShow} />
          <h2 className="floor-title">Cast</h2>
            <div className='cast-list'>
              <ScrollSlider
                isNeedScrollbar={!isLarge}
              >
                {_embedded?.cast.map((item) => {
                  const { person, character } = item
                  return (
                    <div className="show-cast-item" key={item?.person?.id}>
                      <div className="item-content">
                        <img
                          src={person?.image?.medium}
                          alt=""
                          className="object-fit-cover"
                        />
                        <h2>{person.name}</h2>
                        <h3>Character: {character.name}</h3>
                      </div>
                    </div>
                  )
                })}
              </ScrollSlider>
            </div>
        </>
      )}
    </>
  );
};

export default Singlepage;
