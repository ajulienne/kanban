import db from ".";

export const getBoards = async () => {
  const data = await db.boards.toArray();
  return data;
};

/**
 * return all categories of a board
 * @param {*} boardId
 */
export const getCategories = async boardId => {
  const data = await db.categories.where({ boardId }).toArray();
  return data;
};

/** Return all issues of the corresponding categories */
export const getIssues = async categoriesId => {
  const data = await db.issues
    .where("categoryId")
    .anyOf(categoriesId)
    .toArray();
  return data;
};

export const createIssue = async (title, description, categoryId) => {
  const count = await db.issues.where({ categoryId }).count();
  const id = await db.issues.add({
    title,
    description,
    index: count,
    categoryId
  });
  return {
    id,
    index: count
  };
};

export const createCategory = async (title, boardId) => {
  const count = await db.categories.count();
  const id = await db.categories.add({ title, index: count, boardId });

  return { id, index: count };
};

export const createBoard = async (title, color) => {
  const id = await db.boards.add({ title, color });
  return id;
};

export const deleteIssueDb = async id => {
  await db.issues.delete(id);
};

export const deleteCategoryDb = async id => {
  await db.categories.delete(id);
};

export const deleteBoardDb = async id => {
  await db.boards.delete(id);
};

export const updateIssue = async (id, props) => {
  await db.issues.update(id, props);
};

export const updateCategory = async (id, props) => {
  await db.categories.update(id, props);
};

export const updateBoard = async (id, props) => {
  await db.boards.update(id, props);
};
