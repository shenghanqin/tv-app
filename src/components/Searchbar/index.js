import { useState, useContext, useRef } from "react";

// Context
import ShowsContext from "../../context/shows/showsContext";
import AlertsContext from "../../context/alerts/alertsContext";

// Components
import Alert from "../Alert/index";

import "./styles.css";

const Searchbar = () => {
  const searchArr = window.location.href.split('/search/')
  console.log("🚀 ~ Navbar ~ searchArr:", searchArr)
  const searchTermUrl = searchArr.length === 2 ? searchArr[1] : ''
  const [searchTerm, setSearchTerm] = useState(decodeURIComponent(searchTermUrl));

  const inputRef = useRef()

  const showsContext = useContext(ShowsContext);
  const { searchShows } = showsContext;

  const { alert, setAlert } = useContext(AlertsContext);




  const onSearchHandler = (e) => {
    
    if (searchTerm === "") {
      setAlert("Please enter something", "danger");
    } else {
      if (searchTermUrl) {
        searchShows(searchTerm)
      } else {
        window.location.href = '/search/' + encodeURIComponent(searchTerm)
      }
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
