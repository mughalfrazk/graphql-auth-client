import React, { useEffect, useRef, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { IoWarning } from "react-icons/io5";

import "./Input.css";

const Input = (props) => {
  const inputRef = useRef();

  const InputClickHandler = () => {
    inputRef.current.focus();
  };

  return (
    <React.Fragment>
      <div className="custom-input-div">
        {props.element === "textarea" ? (
          <textarea
            type={props.type}
            id={props.id}
            className={`custom-input-field ${props.className} ${
              props.disabled ? "disable" : "enable"
            }`}
            value={props.value || ""}
            onChange={props.onChange}
            onBlur={props.onBlur}
            rows={props.rows || "3"}
            disabled={props.disabled ? true : false}
            readOnly={props.readOnly ? true : false}
            ref={inputRef}
            required
          ></textarea>
        ) : (
          <input
            type={props.type}
            id={props.id}
            className={`custom-input-field ${props.className} ${
              props.disabled ? "disable" : "enable"
            }`}
            value={props.value || ""}
            onChange={props.onChange}
            onBlur={props.onBlur}
            min={props.min}
            max={props.max}
            disabled={props.disabled ? true : false}
            readOnly={props.readOnly ? true : false}
            ref={inputRef}
            autoComplete={props.autoComplete}
            required
          />
        )}
        {props.readOnly && (
          <AiFillLock size={20} className="custom-input-readonly-icon" />
        )}

        {props.error && !props.readOnly && (
          <div className="custom-input-error">
            <IoWarning size={20} className="custom-input-error-icon" />
            <p className="custom-input-error-text">{props.error}</p>
          </div>
        )}
        <label
          className={`custom-input-label ${
            props.value ? "active" : "inactive"
          }`}
          onClick={InputClickHandler}
        >
          {props.label}
        </label>
      </div>
      {/* {props.error && (
        <p className="text-danger input-error-text">{props.error}</p>
      )} */}
    </React.Fragment>
  );
};

export default Input;
