import produce from "immer";
import {
  ADD_ISSUE,
  ADD_CATEGORY
} from "../actions";

const initialState = [{
    id: 0,
    title: "Todo",
    issues: [{
        id: 0,
        title: "Drag & drop"
      },
      {
        id: 1,
        title: "Persistence"
      },
      {
        id: 2,
        title: "issue3"
      },
      {
        id: 3,
        title: "issue4"
      }
    ]
  },
  {
    id: 1,
    title: "Doing",
    issues: [{
      id: 4,
      title: "Styling"
    }]
  },
  {
    id: 2,
    title: "Done",
    issues: [{
        id: 5,
        title: "Init React app"
      },
      {
        id: 6,
        title: "Main components"
      },
      {
        id: 7,
        title: "Redux"
      }
    ]
  },
];

let currCategoryId = 2;
let currIssueId = 7;

const kanbanReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CATEGORY:
      const newCategory = {
        id: currCategoryId + 1,
        title: action.payload,
        issues: []
      };
      currCategoryId++;
      return [...state, newCategory];
    case ADD_ISSUE:
      const {
        title, categoryId
      } = action.payload;
      const newIssue = {
        id: currIssueId + 1,
        title
      };
      currIssueId++;

      const newState = produce(state, draft => {
        draft.find(c => c.id === categoryId).issues.push(newIssue);
      });

      return newState;
    default:
      return state;
  }
};

export default kanbanReducer;