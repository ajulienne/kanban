import React from "react";
import { Issue } from "../issue/Issue";
import ActionButton from "../shared/add-button/AddButton";
import "./Category.scss";
import { Droppable } from "react-beautiful-dnd";

export const Category = ({ id, title, issues }) => {
  return (
    <div className="category-wrapper">
      <Droppable droppableId={`category-${id}`}>
        {provided => (
          <div
            className="category"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <h3>{title}</h3>
            {issues.map((issue, index) => (
              <Issue
                key={issue.id}
                title={issue.title}
                id={issue.id}
                index={index}
              />
            ))}
            {provided.placeholder}
            <ActionButton category categoryId={id} />
          </div>
        )}
      </Droppable>
    </div>
  );
};
