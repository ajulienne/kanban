import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faAlignLeft,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "./IssueModal.scss";
import { editIssue } from "../../store/actions";
import { connect } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

const IssueModal = ({ issue, categoryTitle, editIssue }) => {
  const [titleValue, setTitleValue] = useState(issue.title);

  const [isEditingDescription, setEditDescription] = useState(false);
  const [descriptionFormValue, setDescriptionFormValue] = useState(
    issue.description
  );

  const saveDescription = event => {
    event.preventDefault();
    editIssue(issue.id, titleValue, descriptionFormValue);
    setEditDescription(false);
  };

  return (
    <>
      <div className="row">
        <FontAwesomeIcon
          icon={faClipboardList}
          className="icon icon-title"
          size="lg"
        />
        <form className="inline title">
          <TextareaAutosize
            className="title-edit"
            onChange={event => {
              setTitleValue(event.target.value);
              if (event.target.value) {
                editIssue(issue.id, event.target.value, descriptionFormValue);
              }
            }}
            placeholder="Enter a title"
            value={titleValue}
          />
        </form>
        <p className="content subtitle">In: {categoryTitle}</p>
      </div>
      <div className="row">
        <FontAwesomeIcon icon={faAlignLeft} className="icon" />
        <h3 className="title">Description</h3>
        <div className="description content">
          {issue.description && !isEditingDescription ? (
            <div onClick={() => setEditDescription(true)} className="editable">
              <ReactMarkdown source={issue.description} />
            </div>
          ) : isEditingDescription ? (
            <form>
              <TextareaAutosize
                autoFocus
                value={descriptionFormValue}
                onChange={event => setDescriptionFormValue(event.target.value)}
                onBlur={saveDescription}
              />
              <button className="submit" onClick={saveDescription}>
                Submit
              </button>
              <button
                className="close"
                onClick={() => setEditDescription(false)}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>
            </form>
          ) : (
            <button
              className="description-button"
              onClick={() => setEditDescription(true)}
            >
              Add a description...
            </button>
          )}
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  editIssue: (id, title, description) => editIssue(id, title, description)
};

export default connect(null, mapDispatchToProps)(IssueModal);
