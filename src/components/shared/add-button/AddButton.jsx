import React, { useState } from "react";
import { connect } from "react-redux";
import { addCategory, addIssue } from "../../../store/actions";
import "./AddButton.scss";
import TextareaAutosize from "react-textarea-autosize";

const AddButton = ({ category, categoryId, addCategory, addIssue }) => {
  const label = category ? "Add Issue" : "Add Category";
  const placeholder = category ? "Issue text" : "Category name";

  const [edit, setEdit] = useState(false); // Flag to display or not the form
  const [text, setText] = useState(); // Value of the input

  /**
   * Close of open the form
   */
  const toggleEdit = () => {
    setEdit(!edit);
  };

  /**
   * Render the form and dispatch the action to create a category or an issue
   */
  const renderForm = () => {
    return (
      <form>
        <TextareaAutosize
          autoFocus
          onBlur={toggleEdit}
          onChange={event => {
            setText(event.target.value);
          }}
          placeholder={placeholder}
        >
          {text}
        </TextareaAutosize>
        <br />
        <button
          onMouseDown={() => {
            category ? addIssue(text, categoryId) : addCategory(text);
            toggleEdit();
          }}
        >
          Add
        </button>
      </form>
    );
  };

  return (
    <div className="add-button">
      {edit ? renderForm() : <button onClick={toggleEdit}>{label}</button>}
    </div>
  );
};

export const mapDispatchToProps = {
  addCategory: title => addCategory(title),
  addIssue: (title, categoryId) => addIssue(title, categoryId)
};

export default connect(null, mapDispatchToProps)(AddButton);
