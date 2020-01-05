import React from "react";
import PropTypes from "prop-types";
import arrow from "./heading-arrow.svg";
import "./styles.css";

const Heading = ({ children }) => (
  <div className="heading">
    <img alt="" className="heading__arrow" src={arrow} />
    <h2 className="heading__text">{children}</h2>
  </div>
);

Heading.propTypes = {
  children: PropTypes.string.isRequired
};

export default Heading;
