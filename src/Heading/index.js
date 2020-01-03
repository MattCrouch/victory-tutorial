import React from "react";
import arrow from "./heading-arrow.svg";
import "./styles.css";

const Heading = ({ children }) => (
  <div className="heading">
    <img alt="" className="heading__arrow" src={arrow} />
    <h2 className="heading__text">{children}</h2>
  </div>
);

export default Heading;
