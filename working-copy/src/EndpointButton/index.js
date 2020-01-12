import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const EndpointButton = ({ active, endpoint, onClick, responseTime }) => (
  <button
    className={`endpointButton ${
      active ? "endpointButton--active" : "endpointButton--inactive"
    }`}
    onClick={onClick}
  >
    <div className="endpointButton__container">
      <div className="endpointButton__endpoint">
        {/* Show endpoint method */}
        <span className="endpointButton__method">{endpoint.method}</span>
        {/* Show endpoint route */}
        <span className="endpointButton__route">{endpoint.route}</span>
      </div>
      {/* Show latest response time */}
      <div className="endpointButton__response-time">
        {responseTime.toFixed(2)}s
      </div>
    </div>
  </button>
);

EndpointButton.propTypes = {
  active: PropTypes.bool.isRequired,
  endpoint: PropTypes.shape({
    id: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  responseTime: PropTypes.number.isRequired
};

export default EndpointButton;
