import { useSelector, useDispatch } from "react-redux";
import { Star, Trash2, X } from "lucide-react";
import {
  toggleImportant,
  toggleComplete,
  deleteTask,
} from "../slice/todoSlice";
import { toggleFilterList, toggleTaskDetail } from "../slice/uiSlice";
import notasks from "../assets/noTasks.png"

const FilterTask = () => {
  const { isTaskDetailOpen, isTodayTasksOpen, isImportantTasksOpen, isCompleteTasksOpen, isOverduetasksOpen, isThemeDark } = useSelector((state) => state.ui);
  const tasks = useSelector((state) => state.todos.tasks);
  const dispatch = useDispatch();

  let filteredTasks = [...tasks];
  let filteredTaskTitle = "All Tasks";
  if(isTodayTasksOpen){
    filteredTaskTitle = "Today's Tasks"
    filteredTasks = tasks.filter((task) => new Date(task.todayDate).toDateString() === new Date().toDateString());
  }
  else if(isImportantTasksOpen){
    filteredTaskTitle = "Important Tasks"
    filteredTasks = tasks.filter((task) => task.important === true);
  }
  else if(isCompleteTasksOpen){
    filteredTaskTitle = "Completed Tasks"
    filteredTasks = tasks.filter((task) => task.completed === true);
  }
  else if(isOverduetasksOpen){
    filteredTaskTitle = "Overdue Tasks"
    filteredTasks = tasks.filter((task) => new Date() > new Date(task.duedate));
  }

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="flex justify-between items-center py-4 pl-5 pr-8 mt-6 text-lg font-medium bg-gradient-to-t from-[rgba(53,121,55,0.1)] to-[rgba(208,255,210,0.1)] rounded-4xl">
        <span className={`${isThemeDark ? "text-[#F5F5F5]" : "text-[#1B281B]"}`}>{filteredTaskTitle}</span>
        <button
          onClick={() => { dispatch(toggleFilterList(false)) }}
          className="text-gray-400 rounded-full hover:bg-[#35793729] hover:scale-125 cursor-pointer"
        >
          <X size={22} />
        </button>
      </div>

      <div className="h-full overflow-y-scroll">
      {/* Tasks List */}
      {filteredTasks.length > 0 ? (filteredTasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between py-4 pr-8 pl-2.5 border-b-[1.5px] border-[#496e4ba7]"
        >
          <div className="flex items-center">
            <div className="w-5 h-5 mr-3">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleComplete(task.id))}
                className={`h-5 w-5 border-2 border-gray-400 rounded-sm mr-3 cursor-pointer ${
                  task.completed ? "accent-green-600" : "appearance-none"}`}
              />
            </div>
            <span 
              onClick={() => dispatch(toggleTaskDetail(task))}
              className={`${isThemeDark ? "text-[#F5F5F5]" : "text-[#1B281B]"}`}
            >
              {task.text}
            </span>
          </div>
          <div className={`flex ${ isTaskDetailOpen ? "space-x-10" : "space-x-5"}`}>
            <button className="text-gray-600">
              <Star
                size={20}
                onClick={() => dispatch(toggleImportant(task.id))}
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
            >
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      ))) : 
      <div className={`w-1/5 h-full opacity-60 mx-auto flex justify-center`}>
        <img className="w-full h-1/2" src={notasks}/>
      </div>}
      </div>
    </div>
  );
};

export default FilterTask;
