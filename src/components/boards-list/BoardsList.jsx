import React from "react";
import "./BoardsList.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetBoards } from "../../store/actions";
import NewBoardForm from "../new-board/new-board-form/NewBoardForm";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

const BoardsList = ({ boards }) => {
  // Reset the colors for the background and the header
  document.body.style = "background-color: #f4f5f7";

  const header = document.getElementById("header");
  if (header) {
    header.style = "background-color: #026aa7";
  }

  const dispatch = useDispatch();

  const [isNewBoardFormOpen, setNewBoardFormOpen] = useState(false);

  useEffect(() => {
    dispatch(resetBoards());
  }, [dispatch]);

  return (
    <div className="container">
      <h2>
        <FontAwesomeIcon icon={faClock} />
        &nbsp;Recently viewed boards
      </h2>
      <p>Not yet implemented...</p>
      <h2>
        <FontAwesomeIcon icon={faUser} />
        &nbsp;Your boards
      </h2>
      <ul className="boards-list">
        {boards &&
          boards.map((b, i) => (
            <li key={i}>
              <Link to={`/board/${b.id}`} style={{ backgroundColor: b.color }}>
                {b.title}
                <span />
              </Link>
            </li>
          ))}
        <li>
          <button
            className="new-board-button"
            onClick={() => setNewBoardFormOpen(true)}
          >
            Create a new board
          </button>
        </li>
      </ul>
      {isNewBoardFormOpen && (
        <NewBoardForm onClose={() => setNewBoardFormOpen(false)} />
      )}
      <h2>
        <FontAwesomeIcon icon={faUsers} />
        &nbsp;Team boards
      </h2>
      <p>Not yet implemented...</p>
    </div>
  );
};

export default BoardsList;
