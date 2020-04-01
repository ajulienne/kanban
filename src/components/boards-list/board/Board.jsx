import React from "react";
import Category from "./category/Category";
import { Droppable } from "react-beautiful-dnd";
import AddButton from "../../shared/add-button/AddButton";
import "./Board.scss";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initBoard, editBoard, deleteBoard } from "../../../store/actions";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faStar } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";

const Board = () => {
  let { id } = useParams();
  let history = useHistory();

  const [isEditingBoardTitle, setEditingBoardTitle] = useState(false);

  const dispatch = useDispatch();
  const { categories, issues, board } = useSelector(state => {
    return {
      categories: state.categories,
      issues: state.issues,
      board: state.boards.find(b => b.id === +id)
    };
  });

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

  const toggleEdit = () => {
    setEditingBoardTitle(!isEditingBoardTitle);
  };

  return board ? (
    <>
      <div className="board-header">
        {isEditingBoardTitle ? (
          <input
            autoFocus
            type="text"
            value={board?.title}
            onChange={e =>
              dispatch(editBoard(board.id, e.target.value, board.color))
            }
            onBlur={toggleEdit}
          />
        ) : (
          <div className="board-title" onClick={toggleEdit}>
            {board?.title}
          </div>
        )}
        <button title="Add this board to favorites">
          <FontAwesomeIcon icon={faStar} />
        </button>
        <button
          title="Delete this board"
          onClick={() => {
            if (window.confirm("Do you want to delete this board ?")) {
              dispatch(deleteBoard(board.id));
              history.push("/");
            }
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} size="lg" />
        </button>
      </div>
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
    </>
  ) : (
    <div>Loading</div>
  );
};

export default Board;
