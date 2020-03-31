import React from "react";
import { connect } from "react-redux";
import "./App.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { moveIssue, moveCategory } from "../../store/actions";
import Board from "../board/Board";
import produce from "immer";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "../header/Header";
import BoardsList from "../boards-list/BoardsList";

function App({ categories, issues, boards, moveIssue, moveCategory }) {
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
      moveIssue(
        +draggableId.substring(6),
        +source.droppableId.substring(9),
        +destination.droppableId.substring(9),
        +source.index,
        +destination.index
      );
    }

    if (type === "category") {
      moveCategory(
        +draggableId.substring(9),
        +source.index,
        +destination.index
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
}

export const mapDispatchToProps = {
  moveIssue: (
    draggableId,
    oldCategoryId,
    newCategoryId,
    oldPosition,
    newPosition
  ) =>
    moveIssue(
      draggableId,
      oldCategoryId,
      newCategoryId,
      oldPosition,
      newPosition
    ),
  moveCategory: (draggableId, oldPosition, newPosition) =>
    moveCategory(draggableId, oldPosition, newPosition)
};

export const mapStateToProps = state => {
  return {
    categories: state.categories,
    issues: state.issues,
    boards: state.boards
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
