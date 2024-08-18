import "./styles.css";

const HomeBanner = ({ image }) => {
  return (
    <div
      className="home-banner__container flex justify-center items-end"
      style={{
        backgroundImage: `linear-gradient(0deg, #141414 0%, rgba(20, 20, 20, 0.00) 100%), url(${image?.original})`,
      }}
    >
      home-banner
    </div>
  );
};

export default HomeBanner;
