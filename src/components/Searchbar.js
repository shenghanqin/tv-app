import { useState, useContext, useRef } from "react";

// Context
import ShowsContext from "../context/shows/showsContext";
import AlertsContext from "../context/alerts/alertsContext";

// Components
import Alert from "./Alert";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inputRef = useRef()

  const showsContext = useContext(ShowsContext);
  const { searchShows, homeShows } = showsContext;

  const { alert, setAlert } = useContext(AlertsContext);

  const onSearchHandler = (e) => {
    
    console.log("🚀 ~ onSearchHandler ~ searchTerm:", searchTerm)
    if (searchTerm === "") {
      setAlert("Please enter something", "danger");
      homeShows()
    } else {
      searchShows(searchTerm);
    }
  };

  const onKeyUp = (event) => {
    if (event.keyCode === 13) {
      onSearchHandler()
    }
  }

  return (
    <div className="searchbar">
      <div className="searchbar__form">
        <input
          type="text"
          placeholder="Search For Tv Show"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            console.log('e.target.value', e.target.value)
            
          }}
          ref={inputRef}
          onKeyUp={onKeyUp}
        />
        <button className="searchbar__btn" onClick={() => {
          console.log('searchbar__btn')
          onSearchHandler()
        }}>
          <i className="fas fa-search"></i>
        </button>
        {alert ? <Alert message={alert.message} type={alert.type} positionType="bottom" /> : null}
      </div>
    </div>
  );
};

export default Searchbar;
