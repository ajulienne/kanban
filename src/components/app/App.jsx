import React from "react";
import { connect } from "react-redux";
import "./App.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { moveIssue, moveCategory } from "../../store/actions";
import { Board } from "../board/Board";
import produce from "immer";

function App({ categories, issues, moveIssue, moveCategory }) {
  const onDragEnd = ({ draggableId, destination, source, type }) => {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Board
        categories={produce(categories, draft => {
          draft.sort((a, b) =>
            a.index > b.index ? 1 : a.index < b.index ? -1 : 0
          );
        })}
        issues={issues}
      />
    </DragDropContext>
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
    issues: state.issues
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
