import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./ColorRadio.scss";

const ColorRadio = ({ color, clicked, isSelected }) => {
  return (
    <button
      className={isSelected ? "radio-color selected" : "radio-color"}
      checked={isSelected}
      onClick={clicked}
      style={{ backgroundColor: `#${color}` }}
    >
      {isSelected && <FontAwesomeIcon icon={faCheck} />}
    </button>
  );
};

export default ColorRadio;
