import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    // if there are tasks aready given get those else, display empty array
    tasks: localStorage.getItem("todolist") ? JSON.parse(localStorage.getItem("todolist")) : [],
    editingTask: null,
    searchResults: [],
    searchInput:"",
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: uuidv4(),
        text: action.payload.text,
        completed: false,
        important: action.payload.important || false,
        todayDate: new Date().toLocaleString(),
        duedate: action.payload.dueDate,
        notes: [],
      });
      localStorage.setItem("todolist", JSON.stringify(state.tasks));
      // console.log(JSON.parse(JSON.stringify(state.tasks)));
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      localStorage.setItem("todolist", JSON.stringify(state.tasks));
    },
    toggleImportant: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.important = !task.important;
      }
      localStorage.setItem("todolist", JSON.stringify(state.tasks));
    },
    deleteTask: (state, action) => {
      // get everything except mentioned task (way of deleting task)
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem("todolist", JSON.stringify(state.tasks));
      // console.log(JSON.parse(JSON.stringify(state.tasks)));
    },
    deleteAllTasks: (state) => {
      state.tasks = [];
      localStorage.setItem("todolist", JSON.stringify(state.tasks));
    },
    changeDueDate: (state, action) => {
      const { id, dueDate } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.duedate = dueDate;
      }
      localStorage.setItem("todolist", JSON.stringify(state.tasks));
    },
    repeatTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      const repeatedTask = {
        ...task,
        id: uuidv4(),
        text: `${task.text} - Copy`,
        completed: false,
        todayDate: new Date().toLocaleString(),
        notes: [...task.notes, `Copy of task: ${task.text}`],
      };
      state.tasks.push(repeatedTask);
      localStorage.setItem("todolist", JSON.stringify(state.tasks));
      // console.log(JSON.parse(JSON.stringify(state.tasks)));
    },
    editTask: (state, action) => {
      const { id, updatedTask } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task && state.editingTask?.id === action.payload.id) {
        task.text = updatedTask.text;
        task.duedate = updatedTask.duedate;
        task.important = updatedTask.important;
      }
      state.editingTask = null;
      localStorage.setItem("todolist", JSON.stringify(state.tasks));
      // console.log(state.editingTask);
    },
    setEditingTask: (state, action) => {
      // set editing task as: if payload avaliable then payload else null
      state.editingTask = action.payload ? { ...action.payload } : null;
      // console.log(state.editingTask);
    },
    addNotes: (state, action) => {
      const { id, note } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.notes.push(note);
        // console.log("Updated task:", JSON.parse(JSON.stringify(task)));
      }
      localStorage.setItem("todolist", JSON.stringify(state.tasks));
    },
    searchTask: (state, action) => {
      const query = action.payload.toLowerCase();
      if(query.length > 0){
        state.searchResults = state.tasks.filter((task) => task.text.toLowerCase().includes(query));
        state.searchInput = query
      }
      if(query.length === 0){
        state.searchResults = []
        state.searchInput = ""
      }
      // console.log(state.searchResults);
    },
  },
});

export const {
  addTask,
  toggleComplete,
  toggleImportant,
  deleteTask,
  deleteAllTasks,
  changeDueDate,
  repeatTask,
  editTask,
  setEditingTask,
  addNotes,
  searchTask,
} = todoSlice.actions;
export default todoSlice.reducer;
