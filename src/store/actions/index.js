export const ADD_CATEGORY = "ADD_CATEGORY";
export const ADD_ISSUE = "ADD_ISSUE";

export const addCategory = (title) => {
  return {
    type: ADD_CATEGORY,
    payload: title
  }
}

export const addIssue = (title, categoryId) => {
  return {
    type: ADD_ISSUE,
    payload: {
      title,
      categoryId
    }
  }
}