export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_ISSUE = "ADD_ISSUE";
export const MOVE_ISSUE = "MOVE_ISSUE";
export const MOVE_CATEGORY = "MOVE_CATEGORY";
export const DELETE_ISSUE = "DELETE_ISSUE";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_ISSUE = "EDIT_ISSUE";
export const EDIT_CATEGORY = "EDIT_CATEGORY";

export const addCategory = title => {
  return {
    type: ADD_CATEGORY,
    payload: title
  };
};

export const addIssue = (title, categoryId) => {
  return {
    type: ADD_ISSUE,
    payload: {
      title,
      categoryId
    }
  };
};

export const moveIssue = (
  draggableId,
  oldCategoryId,
  newCategoryId,
  oldPosition,
  newPosition
) => {
  return {
    type: MOVE_ISSUE,
    payload: {
      draggableId,
      oldCategoryId,
      newCategoryId,
      oldPosition,
      newPosition
    }
  };
};

export const moveCategory = (draggableId, oldPosition, newPosition) => {
  return {
    type: MOVE_CATEGORY,
    payload: {
      draggableId,
      oldPosition,
      newPosition
    }
  }
}

export const deleteIssue = issueId => {
  return {
    type: DELETE_ISSUE,
    payload: issueId
  };
};

export const deleteCategory = categoryId => {
  return {
    type: DELETE_CATEGORY,
    payload: categoryId
  };
};

export const editIssue = (id, title, description) => {
  return {
    type: EDIT_ISSUE,
    payload: {
      id,
      title,
      description
    }
  };
};

export const editCategory = (id, title) => {
  return {
    type: EDIT_CATEGORY,
    payload: {
      id,
      title
    }
  };
};