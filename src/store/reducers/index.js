import produce from "immer";
import { ADD_ISSUE, ADD_CATEGORY, MOVE_ISSUE, MOVE_CATEGORY } from "../actions";

const initialState = {
  categories: [
    {
      id: 0,
      title: "Todo",
      index: 0
    },
    {
      id: 1,
      title: "Doing",
      index: 1
    },
    {
      id: 2,
      title: "Done",
      index: 2
    }
  ],
  issues: [
    {
      id: 0,
      title: "Drag & drop",
      description: "Lorem ipsum dolor sit amet.",
      categoryId: 0,
      index: 0
    },
    {
      id: 1,
      title: "Persistence",
      description: "Lorem ipsum dolor sit amet.",
      categoryId: 0,
      index: 1
    },
    {
      id: 2,
      title: "Edit issue",
      description: "Lorem ipsum dolor sit amet.",
      categoryId: 0,
      index: 2
    },
    {
      id: 3,
      title: "Category dnd",
      description: "Lorem ipsum dolor sit amet.",
      categoryId: 0,
      index: 3
    },
    {
      id: 4,
      title: "Styling",
      description: "Lorem ipsum dolor sit amet.",
      categoryId: 1,
      index: 0
    },
    {
      id: 5,
      title: "Init react-app",
      description: "Lorem ipsum dolor sit amet.",
      categoryId: 2,
      index: 0
    },
    {
      id: 6,
      title: "Redux",
      description: "Lorem ipsum dolor sit amet.",
      categoryId: 2,
      index: 1
    },
    {
      id: 7,
      title: "Main components",
      description: "Lorem ipsum dolor sit amet.",
      categoryId: 2,
      index: 2
    }
  ]
};

let currCategoryId = 2;
let currIssueId = 7;

const kanbanReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      const newCategory = {
        id: currCategoryId + 1,
        title: action.payload,
        index: currCategoryId + 1
      };
      currCategoryId++;
      return {
        ...state,
        categories: [...state.categories, newCategory]
      };
    case ADD_ISSUE:
      const newIssue = {
        id: currIssueId + 1,
        title: action.payload.title,
        categoryId: action.payload.categoryId
      };
      currIssueId++;
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
              i.index -= 1;
            }
            return i;
          });

        // Move up all issues placed after the moved issue in the new category
        draft.issues
          .filter(i => i.categoryId === newCategoryId)
          .map(i => {
            if (i.index >= newPosition) {
              i.index += 1;
            }
            return i;
          });

        // Edit the position and the category of the moved issue
        draft.issues.find(i => i.id === draggableId).categoryId = newCategoryId;
        draft.issues.find(i => i.id === draggableId).index = newPosition;
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
              }
            } else {
              // if moving down : move up all between old and new
              if (
                c.index >= action.payload.newPosition &&
                c.index < action.payload.oldPosition
              ) {
                c.index += 1;
              }
            }
            return c;
          });
        draft.categories.find(c => c.id === action.payload.draggableId).index =
          action.payload.newPosition;
      });
      return movedCategoryState;
    default:
      return state;
  }
};

export default kanbanReducer;
