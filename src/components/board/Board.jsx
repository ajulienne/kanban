import React from "react";
import Category from "../category/Category";
import { Droppable } from "react-beautiful-dnd";
import AddButton from "../shared/add-button/AddButton";
import "./Board.scss";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { initBoard } from "../../store/actions";
import { useEffect } from "react";

const Board = ({ boards, categories, issues }) => {
  let { id } = useParams();

  const dispatch = useDispatch();

  let color = "#ccc"; // default background-color

  if (boards && boards.length) {
    color = boards.find(b => {
      return b.id === +id;
    }).color;
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
          style={{ backgroundColor: color }}
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

const mapStateToProps = state => {
  return {
    boards: state.boards
  };
};

export default connect(mapStateToProps)(Board);
