import React from "react";
import "./BoardPreview.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const BoardPreview = ({ color, changed, close }) => {
  return (
    <div className="board-preview" style={{ backgroundColor: `#${color}` }}>
      <input
        type="text"
        placeholder="Add a title to the board"
        onChange={changed}
      />
      <button className="close" onClick={close}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
    </div>
  );
};

export default BoardPreview;
