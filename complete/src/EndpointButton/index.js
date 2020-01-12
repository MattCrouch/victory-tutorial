import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

const EndpointButton = ({ endpoint, onClick, responseTime }) => (
  <button className="endpointButton" onClick={onClick}>
    <div className="endpointButton__container">
      <div className="endpointButton__endpoint">
        <span className="endpointButton__method">{endpoint.method}</span>
        <span className="endpointButton__route">{endpoint.route}</span>
      </div>
      <div className="endpointButton__response-time">
        {responseTime.toFixed(2)}s
      </div>
    </div>
  </button>
);

EndpointButton.propTypes = {
  endpoint: PropTypes.shape({
    id: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  responseTime: PropTypes.number.isRequired
};

export default EndpointButton;
