import { Link } from "react-router-dom";
import Searchbar from "../Searchbar";
import { useMediaQuery } from 'react-responsive'
import { useState } from "react";


import "./styles.css";


const Navbar = () => {
  const isLarge = useMediaQuery({ minWidth: 700 })
  const [mobileSearchShow, setMobileSearchShow] = useState(false,)

  const toggleMobileSearchShow = () => {
    setMobileSearchShow(!mobileSearchShow)
  }

  return (
    <div className="navbar">
      <div className="container">
        <nav className="navbar__nav">
          <h1 className="nav__brand">
            <Link to="/" title="homepage">
              <img src="/tvm-header-logo.png" alt="home logo" />
            </Link>
          </h1>
          <ul className="nav__links">
            <li className="links__link">
              <Link to="/">HOME</Link>
            </li>
            <li className="links__link">
              <Link to="/about">ABOUT</Link>
            </li>
            {!isLarge && (
              <li className="links__link" onClick={toggleMobileSearchShow}>
                <a className="fas fa-search" />
              </li>
            )}
            {isLarge && (
              <li className="links__search">
                <Searchbar />
              </li>
            )}
            
          </ul>
        </nav>
        {!isLarge && mobileSearchShow && (
          <Searchbar />
        )}
      </div>
    </div>
  );
};

export default Navbar;
