import React from "react";
import Category from "../category/Category";
import { Droppable } from "react-beautiful-dnd";
import AddButton from "../shared/add-button/AddButton";
import "./Board.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initBoard } from "../../store/actions";
import { useEffect } from "react";

const Board = ({ categories, issues }) => {
  let { id } = useParams();

  const dispatch = useDispatch();
  const board = useSelector(state => state.boards.find(b => b.id === +id));

  if (board) {
    // Set the color of the background and the header according to the board color
    const color = board.color || "#ccc";
    document.body.style = "background-color: " + color;
    const header = document.getElementById("header");
    if (header) {
      header.style = "background-color: rgba(0,0,0,.15)";
    }
  }

  useEffect(() => {
    dispatch(initBoard(id));
  }, [id, dispatch]);

  return (
    <Droppable
      droppableId="main-wrapper"
      direction="horizontal"
      type="category"
    >
      {provided => (
        <div
          className="Board"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {categories.map((c, i) => {
            return (
              <Category
                key={`cat-${c.id}`}
                id={c.id}
                title={c.title}
                index={i}
                issues={issues
                  .filter(i => i.categoryId === c.id)
                  .sort((a, b) =>
                    a.index < b.index ? -1 : a.index > b.index ? 1 : 0
                  )}
              />
            );
          })}
          {provided.placeholder}
          <div className="new-category">
            <AddButton boardId={id} />
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default Board;
