import { createSlice } from "@reduxjs/toolkit";

const storedState = JSON.parse(localStorage.getItem("todolistui")) || {};

const initialState = {
  isThemeDark: storedState.isThemeDark ?? false,
  isSidebarOpen: storedState.isSidebarOpen ?? false,
  isTaskDetailOpen: storedState.isTaskDetailOpen ?? false,
  isLayout: storedState.isLayout ?? true,
  isTaskListOpen: storedState.isTaskListOpen ?? true,
  isFilterTasksOpen: storedState.isFilterTasksOpen ?? false,
  isAllTasksOpen: storedState.isAllTasksOpen ?? false,
  isTodayTasksOpen: storedState.isTodayTasksOpen ?? false,
  isImportantTasksOpen: storedState.isImportantTasksOpen ?? false,
  isCompleteTasksOpen: storedState.isCompleteTasksOpen ?? false,
  isOverduetasksOpen: storedState.isOverduetasksOpen ?? false,
  selectedTask: storedState.selectedTask ?? null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {

    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
      localStorage.setItem("todolistui", JSON.stringify({ ...state, isSidebarOpen: state.isSidebarOpen }));
    },

    toggleTaskDetail: (state, action) => {
      if (action.payload === false || state.selectedTask?.id === action.payload?.id) {
        state.isTaskDetailOpen = false;
        state.selectedTask = null;
      } 
      else {
        state.isTaskDetailOpen = true;
        state.selectedTask = action.payload;
      }
      console.log(state.selectedTask, state.isTaskDetailOpen);
      localStorage.setItem("todolistui", JSON.stringify({ ...state, isTaskDetailOpen: state.isTaskDetailOpen, selectedTask: state.selectedTask }));
    },
    
    toggleLayout: (state) => {
      state.isLayout = !state.isLayout;
      localStorage.setItem("todolistui", JSON.stringify({ ...state, isLayout: state.isLayout }));
    },

    toggleFilterList: (state, action) => {
      state.isFilterTasksOpen = action.payload !== false;
      state.isAllTasksOpen = action.payload === "alltasks";
      state.isTodayTasksOpen = action.payload === "today";
      state.isImportantTasksOpen = action.payload === "important";
      state.isCompleteTasksOpen = action.payload === "complete";
      state.isOverduetasksOpen = action.payload === "overdue";
      
      localStorage.setItem("todolistui", JSON.stringify({
        ...state, 
        isFilterTasksOpen: state.isFilterTasksOpen,
        isAllTasksOpen: state.isAllTasksOpen,
        isTodayTasksOpen: state.isTodayTasksOpen,
        isImportantTasksOpen: state.isImportantTasksOpen,
        isCompleteTasksOpen: state.isCompleteTasksOpen,
        isOverduetasksOpen: state.isOverduetasksOpen,
      }));
      // console.log("filter status: " + state.isFilterTasksOpen + "and tasks are: " + action.payload);
    },

    toggleTheme: (state) => {
      state.isThemeDark = !state.isThemeDark;
      localStorage.setItem("todolistui", JSON.stringify({ ...state, isThemeDark: state.isThemeDark }));
      // console.log("theme changed:" + state.isThemeDark);
    },

  },
});

export const {
  toggleSidebar,
  toggleTaskDetail,
  toggleLayout,
  toggleFilterList,
  toggleTheme,
} = uiSlice.actions;
export default uiSlice.reducer;
