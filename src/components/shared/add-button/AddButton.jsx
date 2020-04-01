import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory, addIssue } from "../../../store/actions";
import "./AddButton.scss";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useClickOutside } from "../hooks/useClickOutside";

const AddButton = ({ category, categoryId, boardId }) => {
  const dispatch = useDispatch();

  const label = category ? "Add Issue" : "Add Category";
  const placeholder = category ? "Issue text" : "Category name";

  const [edit, setEdit] = useState(false); // Flag to display or not the form
  const [text, setText] = useState(); // Value of the input

  const wrapperRef = useClickOutside(() => setEdit(false));

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
      <form
        ref={wrapperRef}
        className={category ? "form-add-issue" : "form-add-category"}
      >
        <TextareaAutosize
          autoFocus
          onChange={event => {
            setText(event.target.value);
          }}
          placeholder={placeholder}
          value={text}
        />
        <br />
        <button
          className="submit"
          onMouseDown={() => {
            category
              ? dispatch(addIssue(text, categoryId))
              : dispatch(addCategory(text, boardId));
            setText("");
          }}
        >
          Add
        </button>
        <button className="close" onClick={() => toggleEdit()}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </form>
    );
  };

  return (
    <div className="add-button">
      {edit ? (
        renderForm()
      ) : (
        <button
          onClick={toggleEdit}
          className={!category ? "button-category" : "button-issue"}
        >
          <FontAwesomeIcon icon={faPlus} />
          &nbsp;{label}
        </button>
      )}
    </div>
  );
};

export default AddButton;
