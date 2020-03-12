import React from "react";
import { connect } from "react-redux";
import { Category } from "../category/Category";
import AddButton from "../shared/add-button/AddButton";
import "./App.scss";

function App({ kanban }) {
  return (
    <div className="App">
      {kanban.map(c => {
        return (
          <Category
            key={`cat-${c.id}`}
            id={c.id}
            title={c.title}
            issues={c.issues}
          />
        );
      })}
      <div className="new-category">
        <AddButton />
      </div>
    </div>
  );
}

export const mapStateToProps = state => {
  return {
    kanban: state
  };
};

export default connect(mapStateToProps)(App);
