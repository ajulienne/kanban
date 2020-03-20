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

const IssueModal = ({ issue, categoryTitle, editIssue }) => {
  const [isEditingDescription, setEditDescription] = useState(false);
  const [descriptionFormValue, setDescriptionFormValue] = useState("");

  return (
    <>
      <div className="row">
        <FontAwesomeIcon icon={faClipboardList} className="icon" size="lg" />
        <h2 className="title">{issue.title}</h2>
        <p className="content subtitle">In: {categoryTitle}</p>
      </div>
      <div className="row">
        <FontAwesomeIcon icon={faAlignLeft} className="icon" />
        <h3 className="title">Description</h3>
        <div className="description content">
          {issue.description ? (
            <p>{issue.description}</p>
          ) : isEditingDescription ? (
            <form>
              <textarea
                cols="30"
                rows="10"
                value={descriptionFormValue}
                onChange={event => setDescriptionFormValue(event.target.value)}
              ></textarea>
              <button
                className="submit"
                onClick={event => {
                  event.preventDefault();
                  editIssue(issue.id, issue.title, descriptionFormValue);
                }}
              >
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
