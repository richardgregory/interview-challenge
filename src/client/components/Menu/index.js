import React, { useState, useReducer } from "react";
import useFetchMenu from "./useFetchMenu";
import { reducer, initialState } from "./reducer";
import Summary from "../Summary";
import MenuList from "../MenuList";
import Preview from "../Preview";
import "./Menu.css";

export const Menu = () => {
  const [search, setSearch] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data = { items: [] } } = useFetchMenu(search);

  const { selected, selectedDietaries } = state;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSelect = (id) => {
    const hasBeenSelected = selected.some((dish) => dish.id === id);

    if (!hasBeenSelected) {
      const dish = data.items.find((dish) => id === dish.id);
      dispatch({ type: "add", payload: dish });
    }
  };

  const handleRemove = (id) => {
    const dish = data.items.find((dish) => id === dish.id);
    dispatch({ type: "remove", payload: dish });
  };

  return (
    <>
      <Summary total={selected.length} dietaries={selectedDietaries} />

      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <MenuList
              dishes={data.items}
              onSearch={handleSearch}
              onSelect={handleSelect}
            />
          </div>

          <div className="col-8">
            <h2>Menu preview</h2>
            <Preview dishes={selected} onRemove={handleRemove} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
