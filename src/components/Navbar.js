import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

const Navbar = () => {
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
            <li className="links__search">
              <Searchbar />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
