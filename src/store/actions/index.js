import {
  getCategories,
  getIssues,
  createCategory,
  createIssue,
  deleteIssueDb,
  deleteCategoryDb,
  updateIssue,
  getBoards,
  createBoard,
  updateBoard,
  updateCategory,
  deleteBoardDb
} from "../../db/services";

export const FETCH_BOARDS = "FETCH_BOARDS";
export const RESET_BOARDS = "RESET_BOARDS";
export const INIT_BOARD = "INIT_BOARD";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_ISSUE = "ADD_ISSUE";
export const ADD_BOARD = "ADD_BOARD";
export const MOVE_ISSUE = "MOVE_ISSUE";
export const MOVE_CATEGORY = "MOVE_CATEGORY";
export const MOVE_BOARD = "MOVE_BOARD";
export const DELETE_ISSUE = "DELETE_ISSUE";
export const DELETE_CATEGORY = "DELETE_CATEGORY";
export const DELETE_BOARD = "DELETE_BOARD";
export const EDIT_ISSUE = "EDIT_ISSUE";
export const EDIT_CATEGORY = "EDIT_CATEGORY";
export const EDIT_BOARD = "EDIT_BOARD";

export const fetchBoards = () => async dispatch => {
  const boards = await getBoards();
  dispatch({
    type: FETCH_BOARDS,
    payload: boards
  });
};

export const resetBoards = () => ({
  type: RESET_BOARDS
});

export const initBoard = boardId => async dispatch => {
  const categories = await getCategories(boardId);
  const catId = categories.map(c => c.id);
  const issues = await getIssues(catId);
  dispatch({
    type: INIT_BOARD,
    payload: {
      categories,
      issues
    }
  });
};

export const addCategory = (title, boardId) => async dispatch => {
  const { id, index } = await createCategory(title, boardId);
  dispatch({
    type: ADD_CATEGORY,
    payload: { id, title, index, boardId }
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

export const addBoard = (title, color) => async dispatch => {
  const id = await createBoard(title, color);
  dispatch({
    type: ADD_BOARD,
    payload: {
      id,
      title,
      color
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

export const deleteBoard = boardId => async dispatch => {
  await deleteBoardDb(boardId);
  dispatch({
    type: DELETE_BOARD,
    payload: boardId
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

export const editCategory = (id, title) => async dispatch => {
  await updateCategory(id, { title });
  return {
    type: EDIT_CATEGORY,
    payload: {
      id,
      title
    }
  };
};

export const editBoard = (id, title, color) => async dispatch => {
  await updateBoard(id, { title, color });
  dispatch({
    type: EDIT_BOARD,
    payload: {
      id,
      title,
      color
    }
  });
};
