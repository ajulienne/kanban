import {
  getCategories,
  getIssues,
  createCategory,
  createIssue,
  deleteIssueDb,
  deleteCategoryDb,
  updateIssue
} from "../../db/services";

export const INIT_BOARD = "INIT_BOARD";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_ISSUE = "ADD_ISSUE";
export const MOVE_ISSUE = "MOVE_ISSUE";
export const MOVE_CATEGORY = "MOVE_CATEGORY";
export const DELETE_ISSUE = "DELETE_ISSUE";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const EDIT_ISSUE = "EDIT_ISSUE";
export const EDIT_CATEGORY = "EDIT_CATEGORY";

export const initBoard = () => async dispatch => {
  dispatch({
    type: INIT_BOARD,
    payload: {
      categories: await getCategories(),
      issues: await getIssues()
    }
  });
};

export const addCategory = title => async dispatch => {
  const { id, index } = await createCategory(title);
  dispatch({
    type: ADD_CATEGORY,
    payload: { id, title, index }
  });
};

export const addIssue = (title, categoryId) => async dispatch => {
  const { id, index } = await createIssue(title, "", categoryId);
  dispatch({
    type: ADD_ISSUE,
    payload: {
      id,
      title,
      categoryId,
      index
    }
  });
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
  };
};

export const deleteIssue = issueId => async dispatch => {
  await deleteIssueDb(issueId);
  dispatch({
    type: DELETE_ISSUE,
    payload: issueId
  });
};

export const deleteCategory = categoryId => async dispatch => {
  await deleteCategoryDb(categoryId);
  dispatch({
    type: DELETE_CATEGORY,
    payload: categoryId
  });
};

export const editIssue = (id, title, description) => async dispatch => {
  await updateIssue(id, { title, description });
  dispatch({
    type: EDIT_ISSUE,
    payload: {
      id,
      title,
      description
    }
  });
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
