import React from "react";
import { connect } from "react-redux";
import { Category } from "../category/Category";
import AddButton from "../shared/add-button/AddButton";
import "./App.scss";
import { DragDropContext } from "react-beautiful-dnd";
import { moveIssue } from "../../store/actions";

function App({ categories, issues, moveIssue }) {
  const onDragEnd = ({ draggableId, destination, source }) => {
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

    if (draggableId.startsWith("issue")) {
      // Dispatch the move to the store
      moveIssue(
        +draggableId.substring(6),
        +source.droppableId.substring(9),
        +destination.droppableId.substring(9),
        +source.index,
        +destination.index
      );
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        {categories.map(c => {
          return (
            <Category
              key={`cat-${c.id}`}
              id={c.id}
              title={c.title}
              issues={issues
                .filter(i => i.categoryId === c.id)
                .sort((a, b) =>
                  a.index < b.index ? -1 : a.index > b.index ? 1 : 0
                )}
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
    )
};

export const mapStateToProps = state => {
  return {
    categories: state.categories,
    issues: state.issues
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
