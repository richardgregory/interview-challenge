import React from "react";
import PropTypes from "prop-types";
import "./Dietary.css";

export const Dietary = ({ children }) => (
  <span className="dietary">{children}</span>
);

Dietary.propTypes = {
  diet: PropTypes.string,
};

export default Dietary;
