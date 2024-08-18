import { Link } from "react-router-dom";
import "./styles.css";

const HomeBanner = ({ image, name, summary, officialSite, genres, language, rating }) => {
  return (
    <div
      className="home-banner__container "
      style={{
        backgroundImage: `linear-gradient(0deg, #141414 0%, rgba(20, 20, 20, 0.00) 100%), url(${image?.original})`,
      }}
    >
      <div className="banner-content">
        <h2 className="banner-title">
          {name}
        </h2>
        <div
          className="summary-text"
          dangerouslySetInnerHTML={{
            __html: summary?.substring(0, 240) + " ...",
          }}
        ></div>
        <div className="banner-info">
          <Link
            to={officialSite}
            target="_blank"
            rel="noopener noreferrer"
            className="banner-btn"
          >
            <span className="btn-text">Visit Official Site</span>
            <i className="fas fa-link"></i>
          </Link>
          <div className="banner-info-item">
            <p className="banner-genres">
              <span>Genre:</span>
              {genres?.join(", ")}
            </p>
            <ul className="banner-info-list">
              <li className="info-item">
                <i className="fas fa-language"></i>
                {language}
              </li>
              <li className="info-item-star">
                <i className="fas fa-star"></i>
                {rating?.average}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
