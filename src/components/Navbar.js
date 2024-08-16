import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";
import { useMediaQuery } from 'react-responsive'

const Navbar = () => {
  const isLarge = useMediaQuery({ minWidth: 700 })

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
            {isLarge && (
              <li className="links__search">
                <Searchbar />
              </li>
            )}
            
          </ul>
        </nav>
        {!isLarge && (
          <Searchbar />
        )}
      </div>
    </div>
  );
};

export default Navbar;
