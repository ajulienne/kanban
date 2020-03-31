import React from "react";
import { useState } from "react";
import "./NewBoardForm.scss";
import ColorRadio from "./color-radio/ColorRadio";
import BoardPreview from "./board-preview/BoardPreview";
import { addBoard } from "../../../store/actions";
import { connect } from "react-redux";

import { Backdrop } from "../../shared/backdrop/Backdrop";
import { useClickOutside } from "../../shared/hooks/useClickOutside";

const colors = [
  "0079BF",
  "D29034",
  "519839",
  "B04632",
  "8DB9CA",
  "832561",
  "FC636B",
  "70B29C",
  "FFCC2F"
];

const NewBoardForm = ({ addBoard, onClose }) => {
  const [color, setColor] = useState(colors[0]);
  const [title, setTitle] = useState();

  const wrapperRef = useClickOutside(onClose);

  const isValid = () => {
    return (
      title !== null &&
      title !== undefined &&
      title &&
      color !== null &&
      color !== undefined &&
      color
    );
  };

  return (
    <Backdrop>
      <div className="new-board" ref={wrapperRef}>
        <div className="board-form">
          <BoardPreview
            close={onClose}
            color={color}
            changed={e => setTitle(e.target.value)}
          />
          <ul className="colors-list">
            {colors.map(c => (
              <li key={c}>
                <ColorRadio
                  color={c}
                  clicked={() => setColor(c)}
                  isSelected={color === c}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="action">
          <button
            disabled={!isValid()}
            className="submit"
            onClick={() => {
              addBoard(title, color);
              onClose();
            }}
          >
            Add board
          </button>
        </div>
      </div>
    </Backdrop>
  );
};

const mapDispatchToProps = {
  addBoard: (title, color) => addBoard(title, `#${color}`)
};

export default connect(null, mapDispatchToProps)(NewBoardForm);
