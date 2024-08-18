import "./styles.css";

const Loader = ({ size = '' }) => {
  return (
    <div className={"page-loading " + size}>
      <div className={"page-loading-square"}>
        <div className={"loading-easy "}></div>
      </div>
    </div>
  );
};

export default Loader;
