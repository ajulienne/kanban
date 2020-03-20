import db from ".";

export const getCategories = async () => {
  const data = await db.categories.toArray();
  return data;
};

export const getIssues = async () => {
  const data = await db.issues.toArray();
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

export const createCategory = async title => {
  const count = await db.categories.count();
  const id = await db.categories.add({ title, index: count });

  return { id, index: count };
};

export const deleteIssueDb = async id => {
  await db.issues.delete(id);
};

export const deleteCategoryDb = async id => {
  await db.categories.delete(id);
};

export const updateIssue = async (id, props) => {
  await db.issues.update(id, props);
};

export const updateCategory = async (id, props) => {
  await db.categories.update(id, props);
};
