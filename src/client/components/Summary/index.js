import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Dietary from "../Dietary";
import "./Summary.css";

export const Summary = ({ total, dietaries }) => (
  <div className="menu-summary">
    <div className="container">
      <div className="row">
        <div className="col-6 menu-summary-left">
          <span>{total} items</span>
        </div>
        <div className="col-6 menu-summary-right">
          {Object.keys(dietaries).map(
            (key) =>
              dietaries[key] > 0 && (
                <Fragment key={key}>
                  {dietaries[key]}x <Dietary>{key}</Dietary>
                </Fragment>
              )
          )}
        </div>
      </div>
    </div>
  </div>
);

Summary.propTypes = {
  total: PropTypes.number,
  dietaries: PropTypes.objectOf(PropTypes.number),
};

export default Summary;
