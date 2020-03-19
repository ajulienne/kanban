import React, { useState } from "react";
import "./Issue.scss";
import { Draggable } from "react-beautiful-dnd";
import Modal from "react-modal";
import { connect } from "react-redux";
import { deleteIssue } from "../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPen } from "@fortawesome/free-solid-svg-icons";

Modal.setAppElement("#root");

const Issue = ({ data, index, deleteIssue }) => {
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
          >
            {data.title} -{" "}
            <button onClick={openModal} className="action">
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              className="action"
              onClick={() => {
                deleteIssue(data.id);
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <h2>
              {data.id} - {data.title}
            </h2>
            <p>{data.description}</p>
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
