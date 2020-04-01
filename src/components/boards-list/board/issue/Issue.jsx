import React, { useState } from "react";
import "./Issue.scss";
import { Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { deleteIssue } from "../../../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import IssueModal from "./issue-modal/IssueModal";

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

const Issue = ({ data, index, categoryTitle }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

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
              <div
                className="issue-title"
                onClick={openModal}
                title="Click to see the details of this issue"
              >
                {data.title}
                {data.description && (
                  <div className="indicators">
                    <FontAwesomeIcon icon={faAlignLeft} />
                  </div>
                )}
              </div>
              <div className="issue-options">
                <button
                  title="Delete this issue"
                  className="action"
                  onClick={() => {
                    dispatch(deleteIssue(data.id));
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

export default Issue;
