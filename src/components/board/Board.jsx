import React from "react";
import Category from "../category/Category";
import { Droppable } from "react-beautiful-dnd";
import AddButton from "../shared/add-button/AddButton";

export const Board = ({ categories, issues }) => {
  return (
    <Droppable
      droppableId="main-wrapper"
      direction="horizontal"
      type="category"
    >
      {provided => (
        <div
          className="App"
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
            <AddButton />
          </div>
        </div>
      )}
    </Droppable>
  );
};
