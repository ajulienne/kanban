import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faColumns,
  faPlus,
  faBell
} from "@fortawesome/free-solid-svg-icons";
import "./Header.scss";

const Header = props => {
  return (
    <header id="header">
      <div id="navigation">
        <Link to="/" className="button" title="Home">
          <FontAwesomeIcon icon={faHome} size="lg" />
        </Link>
        <button className="button" title="Switch board">
          <FontAwesomeIcon icon={faColumns} size="lg" /> Boards
        </button>
      </div>
      <div id="logo">
        <Link to="/" title="React Trello">
          React Trello
        </Link>
      </div>
      <div id="user-actions">
        <button className="button" title="Create a new board">
          <FontAwesomeIcon icon={faPlus} size="lg" />
        </button>
        <button className="button notifications" title="Notifications">
          <FontAwesomeIcon icon={faBell} size="lg" />
        </button>
        <button className="avatar" title="User settings">
          &nbsp;
        </button>
      </div>
    </header>
  );
};

export default Header;
