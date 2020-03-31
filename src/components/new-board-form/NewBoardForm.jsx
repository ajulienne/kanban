import React from "react";
import { useState } from "react";
import "./NewBoardForm.scss";
import ColorRadio from "./color-radio/ColorRadio";
import BoardPreview from "./board-preview/BoardPreview";
import { addBoard } from "../../store/actions";
import { connect } from "react-redux";

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

const NewBoardForm = ({ addBoard }) => {
  const [color, setColor] = useState(colors[0]);
  const [title, setTitle] = useState();

  return (
    <>
      <div className="board-form">
        <BoardPreview color={color} changed={e => setTitle(e.target.value)} />
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
        <button className="submit" onClick={() => addBoard(title, color)}>
          Add board
        </button>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  addBoard: (title, color) => addBoard(title, `#${color}`)
};

export default connect(null, mapDispatchToProps)(NewBoardForm);
