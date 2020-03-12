export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_ISSUE = "ADD_ISSUE";
export const MOVE_ISSUE = "MOVE_ISSUE";

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
  oldCategoryId,
  newCategoryId,
  oldPosition,
  newPosition
) => {
  return {
    type: MOVE_ISSUE,
    payload: {
      oldCategoryId,
      newCategoryId,
      oldPosition,
      newPosition
    }
  };
};
