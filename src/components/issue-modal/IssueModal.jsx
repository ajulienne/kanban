import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faAlignLeft
} from "@fortawesome/free-solid-svg-icons";
import "./IssueModal.scss";

export const IssueModal = ({ issue, categoryTitle }) => {
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
            issue.description
          ) : (
            <button className="description-button">Add a description...</button>
          )}
        </div>
      </div>
    </>
  );
};
