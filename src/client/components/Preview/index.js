import React from "react";
import PropTypes from "prop-types";
import MenuItem from "../MenuItem";
import "./Preview.css";

export const Preview = ({ dishes, onRemove }) => (
  <ul className="menu-preview">
    {dishes.map((dish) => (
      <li key={dish.id}>
        <MenuItem
          id={dish.id}
          name={dish.name}
          dietaries={dish.dietaries}
          onRemove={() => onRemove(dish.id, dish.dietaries)}
        />
      </li>
    ))}
  </ul>
);

Preview.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  onRemove: PropTypes.func.isRequired,
};

export default Preview;
