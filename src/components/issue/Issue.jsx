import React, { useState } from "react";
import "./Issue.scss";
import { Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";
import { connect } from "react-redux";
import { deleteIssue } from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import IssueModal from "../issue-modal/IssueModal";

Modal.setAppElement("#root");

const modalSyle = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.64)",
    position: "fixed",
    display: "flex",
    zIndex: 60,
    top: 0,
    left: 0,
    width: "100%",
    justifyContent: "center",
    height: "100%"
  },
  content: {
    width: "768px",
    backgroundColor: "rgb(244, 245, 247)",
    padding: "20px 50px 20px 20px",
    border: "none",
    borderRadius: "2px",
    position: "relative",
    inset: "0",
    marginTop: "50px"
  }
};

const Issue = ({ data, index, deleteIssue, categoryTitle }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <Draggable draggableId={`issue-${data.id}`} index={index}>
      {provided => (
        <>
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="issue"
            id={`issue-${data.id}`}
          >
            <div className="wrapper">
              <div className="issue-title" onClick={openModal}>
                {data.title}
                {data.description && (
                  <div className="indicators">
                    <FontAwesomeIcon icon={faAlignLeft} />
                  </div>
                )}
              </div>
              <div className="issue-options">
                <button
                  className="action"
                  onClick={() => {
                    deleteIssue(data.id);
                  }}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalSyle}
          >
            <button className="close-button" onClick={closeModal}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <IssueModal issue={data} categoryTitle={categoryTitle} />
          </Modal>
        </>
      )}
    </Draggable>
  );
};

const mapDispatchToProps = {
  deleteIssue: id => deleteIssue(id)
};

export default connect(null, mapDispatchToProps)(Issue);
