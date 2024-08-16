import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <nav className="navbar__nav">
          <h3 className="nav__brand">
            <Link to="/">
              <i className="fas fa-video"></i> TV SHOW SEARCH
            </Link>
          </h3>
          <ul className="nav__links">
            <li className="links__link">
              <Link to="/">HOME</Link>
            </li>
            <li className="links__link">
              <Link to="/about">ABOUT</Link>
            </li>
            <li className="links__search">
              <Searchbar />
              {/* <input />
              <i className="fas fa-search"></i> */}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
