import { ArrowBigLeftDash, ArrowBigRightDash, ClockAlert, Star, Trash2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteTask,
  toggleComplete,
  toggleImportant,
} from "../slice/todoSlice";
import { toggleTaskDetail } from "../slice/uiSlice";
import "../App.css";

const TaskList = () => {
  const { isTaskDetailOpen, isLayout, isThemeDark } = useSelector((state) => state.ui);
  const { tasks, searchResults, searchInput } = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  // Render according to searchbar
  const renderTaskItem = (task) => (
    <div
      key={task.id}
      className={`flex ${isTaskDetailOpen ? "flex-col gap-4 items-center justify-center" : "flex-row items-center justify-between"} h-[80px] py-4 pr-8 pl-2.5 border-t-[1.5px] border-[#496e4ba7]`}
    >
      <div className="flex items-center h-[48px]">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => dispatch(toggleComplete(task.id))}
          className={`h-5 w-5 border-[3px] border-gray-400 rounded-sm mr-3 cursor-pointer ${
          task.completed ? "accent-green-600" : "appearance-none"}`}
        />
        <button
          onClick={() => dispatch(toggleTaskDetail(task))}
          className="cursor-pointer"
        >
          <span className={`${isThemeDark ? "text-[#F5F5F5]" : "text-[#1B281B]"} ${
          task.completed ? "line-through" : ""}`}>{task.text}</span>
        </button>
      </div>
      <div
        className={`flex ${
          isTaskDetailOpen ? "space-x-10" : "space-x-5"
        }`}
      >
        <div title={`Due At- ${task.duedate}`}>
          <ClockAlert className={(new Date(task.duedate) > new Date()) ? "text-green-600" : "text-red-600"} size={22}/>
        </div>
        <button
          onClick={() => dispatch(toggleImportant(task.id))}
          className={`text-gray-400 ${isThemeDark ? "hover:text-gray-200" : "hover:text-gray-600"}`}
          title="Mark Important"
          >
          <Star
            size={20}
            fill={task.important ? "currentColor" : "none"}
            className={task.important ? `${isThemeDark ? "text-[#F5F5F5]" : "text-black"}` : ""}
          />
        </button>
        <button
          onClick={() => {
            dispatch(deleteTask(task.id));
            dispatch(toggleTaskDetail(false));
          }}
          className={`text-gray-400 ${isThemeDark ? "hover:text-gray-200" : "hover:text-gray-600"}`}
          title="Delete Task"
        >
          <Trash2 size={20} />
        </button>
        <button
          onClick={() => dispatch(toggleTaskDetail(task))}
          className={`text-gray-400 ${isThemeDark ? "hover:text-gray-200" : "hover:text-gray-600"}`}
          title="Task Details"
        >
          {isTaskDetailOpen ? <ArrowBigRightDash size={20}/> : <ArrowBigLeftDash size={20} />}
        </button>
      </div>
    </div>
  );

  return (
    <div
      className={`flex flex-col w-full h-full my-5 ${isThemeDark ? "bg-[#242424] text-[#F5F5F5]" : "bg-[#FBFDFC] text-[#1B281B]"}`}
    >
      <h2 className="text-xl font-bold py-2 px-3">Your Tasks:</h2>
      <div
        className={`grid overflow-y-scroll ${isLayout ? "grid-cols-1" : "grid-cols-3 gap-6"}`}
      >
        {searchInput ? (searchResults.length > 0 ? searchResults.map(renderTaskItem) : <p className="text-center mt-10 text-lg">No tasks found. Search something else...</p>) 
                     : (tasks.length === 0 ? <p className="text-lg mt-10 text-center">No tasks yet. Add some!</p> : tasks.map(renderTaskItem))
        }
      </div>
    </div>
  );
};

export default TaskList;
