import React from "react";
import "./Issue.scss";
import { Draggable } from "react-beautiful-dnd";

export const Issue = ({ id, title, index }) => {
  return (
    <Draggable draggableId={`issue-${id}`} index={index}>
      {provided => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="issue"
        >
          {title} - <a href="#">Edit</a>
        </div>
      )}
    </Draggable>
  );
};
