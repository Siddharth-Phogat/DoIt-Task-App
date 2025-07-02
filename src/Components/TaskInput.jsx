import React, { useState, useEffect } from "react";
import { RotateCcw, Calendar, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../slice/todoSlice";
import DatePicker from "react-datepicker";
import { toggleFilterList, toggleTaskDetail } from "../slice/uiSlice";

const TaskInput = () => {
  const dispatch = useDispatch();
  const [taskText, setTaskText] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const editingTask = useSelector((state) => state.todos.editingTask);
  const { isThemeDark } = useSelector((state) => state.ui);

  const handleDateChange = (date) => setDueDate(date);

  // For editing task
  useEffect(() => {
    if (editingTask) {
      setTaskText(editingTask.text);
      setDueDate(new Date(editingTask.duedate));
      setIsImportant(editingTask.important);
    }
  }, [editingTask]);

  // When submitting check if we were editing a task or adding new task
  const handleSubmit = () => {
    if(!dueDate){
      alert("Select Due date for the task");
    }
    // Entering dueDate is mandatory
    if (taskText.trim() && dueDate) {
      let dueDateString = dueDate.toLocaleString();
      if (editingTask) {
        dispatch(editTask
          ({
            id: editingTask.id,
            updatedTask: {
              text: taskText,
              duedate: dueDateString,
              important: isImportant,
            },
          }));
      } else {
        dispatch(addTask
          ({
            text: taskText,
            important: isImportant,
            dueDate: dueDateString,
          }));
      }

      dispatch(toggleTaskDetail(false));
      dispatch(toggleFilterList(false));
      setTaskText("");
      setIsImportant(false);
      setDueDate(null);
    }
  };

  return (
    <>
      {/* header */}
      <div className={`py-2 px-3 my-2 border-b-[1.5px] flex justify-between rounded-t-4xl items-center ${isThemeDark ? "text-[#97F69BB5] border-[#496e4ba7]" : "text-[#142E159E]"}`}>
        <span className="font-medium text-xl flex gap-1">What's your next goal?</span>
      </div>
      <div className = "flex flex-col w-full h-[178px] rounded-b-4xl bg-gradient-to-t from-[#3579371a] to-[#d0ffd21a]">
        <div className="h-full">
          {/* task input */}
          <div className={`p-4 h-[110px] ${isThemeDark ? "text-[#97F69BB5]" : "text-[#142E159E]"}`}>
            <textarea
              type="text"
              placeholder="Add A Task"
              className="w-full text-lg bg-transparent outline-none"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              autoFocus
              rows={3}
            />
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center p-2 ">
            <div className={`flex items-center space-x-4 ${isThemeDark ? "text-[#97F69BB5]" : "text-gray-500"}`}>
              <button
                title="Mark Important"
                className={`p-2 cursor-pointer rounded-full ${isThemeDark ? "hover:bg-[#35793729]" : "hover:bg-gray-100"}`}
                onClick={() => setIsImportant(!isImportant)}
              >
                <Star
                  size={24}
                  fill={isImportant ? "currentColor" : "none"}
                  className={isImportant ? `${isThemeDark ? "text-[#97F69BB5]" : "text-black"}` : ""}
                />
              </button>
              <button
                title="Clear Text"
                className={`p-2 cursor-pointer rounded-full ${isThemeDark ? "hover:bg-[#35793729]" : "hover:bg-gray-100"}`}
                onClick={() => {
                  setTaskText("");
                  setIsImportant(false);
                }}
              >
                <RotateCcw size={24} />
              </button>
              <button
                title="Set DueDate"
                className={`p-2 cursor-pointer rounded-full ${isThemeDark ? "hover:bg-[#35793729]" : "hover:bg-gray-100"}`}
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <Calendar size={24} />
              </button>
              {showDatePicker && (
                <DatePicker
                  selected={dueDate}
                  onChange={handleDateChange}
                  dateFormat="yyyy-MM-dd"
                  required
                  showTimeSelect
                  id="dueDate"
                  minDate={new Date()}
                  autoFocus
                  className="outline-[#35793729] w-24 text-center"
                  withPortal
                />
              )}
            </div>
            <button
              onClick={handleSubmit}
              className={`cursor-pointer w-[104px] h-[36px] px-4 py-2 rounded-lg text-sm font-medium flex items-center ${isThemeDark ? "bg-[#357937E0] hover:bg-[#357937] text-[#CFCFCF]" : "bg-[#35793729] hover:bg-[#35793758] text-[#357937]"}`}
              // If empty then disable button
              disabled={!taskText.trim()}
            >
              <span>ADD TASK</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskInput;
