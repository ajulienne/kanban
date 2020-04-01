import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { moveIssue, moveCategory } from "../../store/actions";
import Board from "../boards-list/board/Board";
import produce from "immer";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../header/Header";
import BoardsList from "../boards-list/BoardsList";

const App = () => {
  const dispatch = useDispatch();

  const { categories, issues, boards } = useSelector(state => state);

  const onDragStart = ({ draggableId, type }) => {
    if (type === "issue") {
      document
        .getElementById(draggableId)
        .firstElementChild.classList.add("dragging");
    } else {
      document.getElementById(draggableId).classList.add("dragging");
    }
  };

  const onDragEnd = ({ draggableId, destination, source, type }) => {
    if (type === "issue") {
      document
        .getElementById(draggableId)
        .firstElementChild.classList.remove("dragging");
    } else {
      document.getElementById(draggableId).classList.remove("dragging");
    }

    // Stop if the element is dropped in a non droppable element
    if (!destination) {
      return;
    }

    // Stop if the element is dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "issue") {
      // Dispatch the move to the store
      dispatch(
        moveIssue(
          +draggableId.substring(6),
          +source.droppableId.substring(9),
          +destination.droppableId.substring(9),
          +source.index,
          +destination.index
        )
      );
    }

    if (type === "category") {
      dispatch(
        moveCategory(
          +draggableId.substring(9),
          +source.index,
          +destination.index
        )
      );
    }
  };

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/board/:id">
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            {categories && (
              <Board
                categories={produce(categories, draft => {
                  draft.sort((a, b) =>
                    a.index > b.index ? 1 : a.index < b.index ? -1 : 0
                  );
                })}
                issues={issues}
              />
            )}
          </DragDropContext>
        </Route>
        <Route exact path="/">
          <BoardsList boards={boards} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
