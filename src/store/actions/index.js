export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_ISSUE = "ADD_ISSUE";
export const MOVE_ISSUE = "MOVE_ISSUE";
export const MOVE_CATEGORY = "MOVE_CATEGORY";

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
    payload: { draggableId, oldPosition, newPosition }
  };
};
