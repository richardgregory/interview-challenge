import React from "react";
import PropTypes from "prop-types";
import Dietary from "../Dietary";
import "./MenuItem.css";

export const MenuItem = ({ name, dietaries = [], onRemove }) => (
  <div className="item">
    <h2>{name}</h2>
    <div>
      {dietaries.map((diet) => (
        <Dietary key={diet}>{diet}</Dietary>
      ))}
    </div>
    {onRemove && (
      <button className="remove-item" onClick={onRemove}>
        x
      </button>
    )}
  </div>
);

MenuItem.propTypes = {
  name: PropTypes.string,
  onRemove: PropTypes.func,
  dietaries: PropTypes.arrayOf(PropTypes.string),
};

export default MenuItem;
