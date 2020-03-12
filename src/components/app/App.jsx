import React from "react";
import { connect } from "react-redux";
import { Category } from "../category/Category";
import AddButton from "../shared/add-button/AddButton";
import "./App.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { moveIssue } from "../../store/actions";

function App({ kanban, moveIssue }) {
  const onDragEnd = ({ destination, source }) => {
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

    // Dispatch the move to the store
    moveIssue(
      source.droppableId,
      destination.droppableId,
      source.index,
      destination.index
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {kanban.map(c => {
          return (
            <Category
              key={`cat-${c.id}`}
              id={c.id}
              title={c.title}
              issues={c.issues}
            />
          );
        })}
        <div className="new-category">
          <AddButton />
        </div>
      </div>
    </DragDropContext>
  );
}

export const mapDispatchToProps = {
  moveIssue: (oldCategoryId, newCategoryId, oldPosition, newPosition) =>
    moveIssue(oldCategoryId, newCategoryId, oldPosition, newPosition)
};

export const mapStateToProps = state => {
  return {
    kanban: state
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
