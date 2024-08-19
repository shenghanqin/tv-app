import "./styles.css";


const Alert = ({ type, message, positionType }) => {
  return (
    <div className={`alert alert-${type} ${positionType === 'bottom' ? 'alert-bottom' : ''}`}>
      <i className="fas fa-info-circle"></i> {message}
    </div>
  );
};

export default Alert;
