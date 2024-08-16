import { useState, useContext, useEffect, useRef } from "react";

// Context
import ShowsContext from "../context/shows/showsContext";
import AlertsContext from "../context/alerts/alertsContext";

// Components
import Alert from "./Alert";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef()

  const showsContext = useContext(ShowsContext);
  const { searchShows } = showsContext;

  const { alert, setAlert } = useContext(AlertsContext);

  const onSearchHandler = (e) => {
    
    console.log("🚀 ~ onSearchHandler ~ searchTerm:", searchTerm)
    if (searchTerm === "") {
      setAlert("Please enter something", "danger");
    } else {
      searchShows(searchTerm);
    }
  };

  useEffect(() => {
    inputRef.current.addEventListener("keyup", function (event) {
      // event.preventDefault();
      console.log('keyup', event)
      if (event.keyCode === 13) {
        onSearchHandler(event)
      }
    });

  }, [])


  return (
    <div className="searchbar">
      <form className="searchbar__form">
        <input
          type="text"
          placeholder="Search For Tv Show"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            console.log('e.target.value', e.target.value)
            
          }}
          ref={inputRef}
        />
        <button className="searchbar__btn" onClick={() => {
          console.log('searchbar__btn')
          onSearchHandler()
        }}>
          <i className="fas fa-search"></i>
        </button>
        {alert ? <Alert message={alert.message} type={alert.type} positionType="bottom" /> : null}
      </form>
    </div>
  );
};

export default Searchbar;
