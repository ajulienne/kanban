import React from "react";
import { Issue } from "../issue/Issue";
import ActionButton from "../shared/add-button/AddButton";
import "./Category.scss";

export const Category = ({ id, title, issues }) => {
  return (
    <div className="category-wrapper">
      <div className="category">
        <h3>{title}</h3>
        {issues.map(i => (
          <Issue key={i.id} title={i.title} />
        ))}
        <ActionButton category categoryId={id} />
      </div>
    </div>
  );
};
