import produce from "immer";
import {
  ADD_ISSUE,
  ADD_CATEGORY,
  MOVE_ISSUE,
  MOVE_CATEGORY,
  DELETE_ISSUE,
  DELETE_CATEGORY,
  EDIT_CATEGORY,
  EDIT_ISSUE,
  INIT_BOARD
} from "../actions";
import { updateIssue, updateCategory } from "../../db/services";

const initialState = {
  categories: [],
  issues: []
};

const kanbanReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_BOARD:
      return {
        categories: action.payload.categories,
        issues: action.payload.issues
      };
    case ADD_CATEGORY:
      const newCategory = action.payload;
      return {
        ...state,
        categories: [...state.categories, newCategory]
      };
    case ADD_ISSUE:
      console.log(action.payload);
      const newIssue = {
        ...action.payload,
        description: ""
      };
      return {
        ...state,
        issues: [...state.issues, newIssue]
      };
    case MOVE_ISSUE:
      const {
        draggableId,
        oldCategoryId,
        newCategoryId,
        oldPosition,
        newPosition
      } = action.payload;

      const tempState = produce(state, draft => {
        // Move down all issues placed after the moved issue in the old category
        draft.issues
          .filter(i => i.categoryId === oldCategoryId)
          .map(i => {
            if (i.index > oldPosition) {
              console.log(`${i.index} UP`);
              i.index -= 1;
              updateIssue(i.id, { index: i.index });
            }
            return i;
          });

        // Move up all issues placed after the moved issue in the new category
        draft.issues
          .filter(i => i.categoryId === newCategoryId)
          .map(i => {
            if (i.index >= newPosition) {
              console.log(`${i.index} UP`);
              i.index += 1;
              updateIssue(i.id, { index: i.index });
            }
            return i;
          });

        // Edit the position and the category of the moved issue
        draft.issues.find(i => i.id === draggableId).categoryId = newCategoryId;
        draft.issues.find(i => i.id === draggableId).index = newPosition;
        updateIssue(draggableId, {
          index: newPosition,
          categoryId: newCategoryId
        });
      });
      return tempState;
    case MOVE_CATEGORY:
      const movedCategoryState = produce(state, draft => {
        draft.categories
          .filter(c => c.id !== action.payload.draggableId)
          .map(c => {
            if (action.payload.newPosition > action.payload.oldPosition) {
              // if moving up : move down all between old and new
              if (
                c.index > action.payload.oldPosition &&
                c.index <= action.payload.newPosition
              ) {
                c.index -= 1;
                updateCategory(c.id, { index: c.index });
              }
            } else {
              // if moving down : move up all between old and new
              if (
                c.index >= action.payload.newPosition &&
                c.index < action.payload.oldPosition
              ) {
                c.index += 1;
                updateCategory(c.id, { index: c.index });
              }
            }
            return c;
          });
        draft.categories.find(c => c.id === action.payload.draggableId).index =
          action.payload.newPosition;
        updateCategory(action.payload.draggableId, {
          index: action.payload.newPosition
        });
      });
      return movedCategoryState;
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(c => c.id !== action.payload), // Filter out the category
        issues: state.issues.filter(i => i.categoryId !== action.payload) // Filter out all the issues in that category
      };
    case DELETE_ISSUE:
      const { categoryId, index } = state.issues.find(
        i => i.id === action.payload
      );

      const newIssues = produce(state.issues, draft => {
        draft.map(i => {
          if (i.categoryId === categoryId && i.index > index) {
            i.index -= 1; // Move down all issues in the same category located after the issue
          }
          return i;
        });
      });

      return {
        ...state,
        issues: newIssues.filter(i => i.id !== action.payload)
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(c =>
          c.id === action.payload.id
            ? {
                ...c,
                title: action.payload.title
              }
            : c
        )
      };
    case EDIT_ISSUE:
      return {
        ...state,
        issues: state.issues.map(i =>
          i.id === action.payload.id
            ? {
                ...i,
                title: action.payload.title,
                description: action.payload.description
              }
            : i
        )
      };
    default:
      return state;
  }
};

export default kanbanReducer;
