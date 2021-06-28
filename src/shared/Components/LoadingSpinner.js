import React from "react";

import "./LoadingSpinner.css";

const LoadingSpinner = (props) => {
  return (
    <div className={`${props.asOverlay && "loading-spinner__overlay"} ${props.className}`}>
      <div
        className={`${props.small && "lds-dual-ring-small"} ${
          props.xsmall && "lds-dual-ring-x-small"
        } ${!props.small && !props.xsmall && "lds-dual-ring"} ${props.color}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
