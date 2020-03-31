import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { addCategory, addIssue } from "../../../store/actions";
import "./AddButton.scss";
import TextareaAutosize from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const AddButton = ({
  category,
  categoryId,
  boardId,
  addCategory,
  addIssue
}) => {
  const label = category ? "Add Issue" : "Add Category";
  const placeholder = category ? "Issue text" : "Category name";

  const [edit, setEdit] = useState(false); // Flag to display or not the form
  const [text, setText] = useState(); // Value of the input

  const wrapperRef = useRef(null); // Ref of the form

  /**
   * Hide the form when clicked outside of it
   * @param event the click
   */
  function handleClickOutside(event) {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setEdit(false);
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

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
            category ? addIssue(text, categoryId) : addCategory(text, boardId);
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

export const mapDispatchToProps = {
  addCategory: (title, boardId) => addCategory(title, boardId),
  addIssue: (title, categoryId) => addIssue(title, categoryId)
};

export default connect(null, mapDispatchToProps)(AddButton);
