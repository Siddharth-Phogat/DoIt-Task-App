import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  toggleComplete,
  setEditingTask,
  changeDueDate,
  repeatTask,
  addNotes,
} from "../slice/todoSlice";
import {
  toggleTaskDetail,
  toggleFilterList,
} from "../slice/uiSlice";

import { Edit, RotateCcw, X, CalendarCog, Trash2, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css"

const TaskDetailPanel = () => {
  const selectedTask = useSelector((state) => state.todos.tasks.find((task) => task.id === state.ui.selectedTask?.id));
  const{ isThemeDark } = useSelector((state) => state.ui);
  
  const dispatch = useDispatch();
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [noteInput, setNoteInput] = useState("");

  useEffect(() => {
    if (selectedTask?.duedate) {
      setDueDate(new Date(selectedTask.duedate));
    }
  }, [selectedTask]);

  useEffect(() => {
    if (!selectedTask) {
      dispatch(setEditingTask(null));
      dispatch(toggleTaskDetail(false));
    }
  }, [selectedTask, dispatch]);

  const handleDateChange = (date) => setDueDate(date);

  const handleSubmit = () => {
    if (selectedTask) {
      let dueDateString = dueDate.toLocaleString();
      dispatch(changeDueDate({ id: selectedTask.id, dueDate: dueDateString }));
      setShowDatePicker(false);
      dispatch(toggleTaskDetail(false));
    }
  };

  const handleEditClick = () => {
    dispatch(setEditingTask(selectedTask));
  };

  const handleAddNote = (taskId) => {
    if (noteInput.trim() !== "") {
      dispatch(addNotes({ id: taskId, note: noteInput }));
      setNoteInput("");
    }
  };

  return (
    <div className="flex flex-col w-full h-full mt-3 rounded-4xl bg-[#94bf951a]">
      {selectedTask && (
        <div className="flex-grow">
          {/* task name */}
          <div className="flex w-full items-center justify-between pr-4 pl-6 py-3 border-b-2 border-[#7da07fa7]">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTask.completed}
                onChange={() => dispatch(toggleComplete(selectedTask.id))}
                className={`h-5 w-5 cursor-pointer border-[3px] border-gray-400 rounded-sm mr-3 px-2 ${
                  selectedTask.completed ? "accent-green-600" : "appearance-none"
                }`}
              />
              <span className={`${isThemeDark ? "text-[#F5F5F5]" : "text-[#1B281B]"}`}>{selectedTask.text}</span>
            </div>
            <button
              onClick={() => {
                dispatch(toggleTaskDetail(false));
                dispatch(setEditingTask(null));
                dispatch(toggleFilterList(false));
              }}
              className="text-gray-400 rounded-full hover:bg-[#35793729] hover:scale-125 cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Craeted At */}
          <div
            className={`${isThemeDark ? "dark-taskDetailButton" : "light-taskDetailButton"}`}
          >
            <Clock size={18} className="mr-3" />
            <span>{`Created At -  ${selectedTask.todayDate}`}</span>
          </div>

          {/* Edit */}
          <button
            className={`${isThemeDark ? "dark-taskDetailButton" : "light-taskDetailButton"}`}
            onClick={handleEditClick}
          >
            <Edit size={18} className="mr-3" />
            <span>Edit</span>
          </button>

          {/* Repeat */}
          <button
            className={`${isThemeDark ? "dark-taskDetailButton" : "light-taskDetailButton"}`}
            onClick={() => {
              dispatch(repeatTask(selectedTask.id));
              dispatch(toggleTaskDetail(false));
            }}
          >
            <RotateCcw size={18} className="mr-3" />
            <span>Repeat</span>
          </button>

          {/* duedate */}
          <button
            className={`${isThemeDark ? "dark-taskDetailButton" : "light-taskDetailButton"}`}
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <CalendarCog size={18} className="mr-3" />
            <span>Change due Date</span>
          </button>
          {showDatePicker && (
            <div className=" flex justify-center items-center px-4 py-2">
              <DatePicker
                selected={dueDate}
                onChange={handleDateChange}
                dateFormat="yyyy-MM-dd"
                required
                showTimeSelect
                id="dueDate"
                minDate={new Date()}
                autoFocus
                className="outline-[#35793729] w-[60%] text-[#F5F5F5]"
                withPortal
              />
              <button
                className={`cursor-pointer w-[104px] h-[36px] px-4 py-2 rounded-lg text-sm font-medium flex justify-center items-center ${isThemeDark ? "bg-[#357937E0] hover:bg-[#357937] text-[#CFCFCF]" : "bg-[#35793729] hover:bg-[#35793758] text-[#357937]"}`}
                onClick={handleSubmit}
              >
                <span>CHANGE</span>
              </button>
            </div>
          )}

          {/* delete */}
          <button
            className={`${isThemeDark ? "dark-taskDetailButton" : "light-taskDetailButton"}`}
            onClick={() => {
              dispatch(deleteTask(selectedTask.id));
              dispatch(toggleTaskDetail(false));
            }}
          >
            <Trash2 size={18} className="mr-3" />
            <span>Delete</span>
          </button>

          {/* notes */}
          <div className="px-4 py-3 h-[600px] overflow-y-scroll">
            <div className={`${isThemeDark ? "text-[#f5f5f596]" : "text-[#1B281B96]"}`}>Notes</div>
            {selectedTask?.notes?.length > 0 && (
              <ol className="w-full px-4 py-3 bg-transparent text-gray-400 list-disc">
                {selectedTask.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ol>
            )}
            <input
              placeholder="ADD NOTES"
              type="text"
              className={`w-full px-4 py-3 my-3 rounded-lg text-gray-400 focus-within:outline-1 outline-gray-100 ${isThemeDark ? "bg-[#1d241c]" : "bg-gray-50"}`}
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              rows={3}
            />
            <button
              className={`cursor-pointer w-[104px] h-[36px] px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center ${isThemeDark ? "bg-[#357937E0] hover:bg-[#357937] text-[#CFCFCF]" : "bg-[#35793729] hover:bg-[#35793758] text-[#357937]"}`}
              onClick={() => handleAddNote(selectedTask.id)}
            >
              <span>Add Note</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetailPanel;
