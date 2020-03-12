import kanbanReducer from "./reducers";
import {
  configureStore
} from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: kanbanReducer
});