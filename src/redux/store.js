import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../slice/todoSlice";
import uiReducer from "../slice/uiSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    ui: uiReducer,
  },
});
