import React from "react";
import Issue from "../issue/Issue";
import ActionButton from "../shared/add-button/AddButton";
import "./Category.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { deleteCategory } from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export const Category = ({ id, title, issues, index, deleteCategory }) => {
  return (
    <Draggable draggableId={`category-${id}`} index={index}>
      {provided => (
        <div
          className="category-wrapper"
          {...provided.draggableProps}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={`category-${id}`} type="issue">
            {provided => (
              <div
                className="category"
                {...provided.droppableProps}
                ref={provided.innerRef}
                id={`category-${id}`}
              >
                <h3>
                  {title}
                  <button
                    className="action"
                    onClick={() => {
                      deleteCategory(id);
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </h3>
                {issues.map((issue, index) => (
                  <Issue
                    key={issue.id}
                    data={issue}
                    index={index}
                    categoryTitle={title}
                  />
                ))}
                {provided.placeholder}
                <ActionButton category categoryId={id} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

const mapDispatchToProps = {
  deleteCategory: id => deleteCategory(id)
};

export default connect(null, mapDispatchToProps)(Category);
