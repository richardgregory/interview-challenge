import React from "react";
import PropTypes from "prop-types";
import MenuItem from "../MenuItem";
import "./MenuList.css";

export const MenuList = ({ dishes, onSearch, onSelect }) => (
  <>
    <div className="filters">
      <input
        type="text"
        className="form-control"
        placeholder="Name"
        aria-label="Search"
        onChange={onSearch}
      />
    </div>

    <ul className="item-picker">
      {dishes.map((dish) => (
        <li
          key={dish.id}
          onClick={() => onSelect(dish.id)}
          name={dish.name}
          role="button"
        >
          <MenuItem id={dish.id} name={dish.name} dietaries={dish.dietaries} />
        </li>
      ))}
    </ul>
  </>
);

MenuList.propTypes = {
  dishes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ),
  onSearch: PropTypes.func.isRequired,
};

export default MenuList;
