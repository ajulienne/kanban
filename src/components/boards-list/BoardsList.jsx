import React from "react";
import "./BoardsList.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { resetBoards } from "../../store/actions";
import NewBoardForm from "../new-board-form/NewBoardForm";

const BoardsList = ({ boards }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetBoards());
  }, [dispatch]);

  return (
    <>
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
          <button className="new-board">Create a new board</button>
        </li>
      </ul>
      <NewBoardForm />
    </>
  );
};

export default BoardsList;
