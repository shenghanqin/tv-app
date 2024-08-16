import spinner from "./spinner.gif";

const Loader = ({ size = '' }) => {
  return (
    <div className={"loader " + size}>
      <img src={spinner} alt="Loading..." />
    </div>
  );
};

export default Loader;
