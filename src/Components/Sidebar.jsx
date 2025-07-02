import React from "react";
import {
  ClipboardCheck,
  Calendar,
  CalendarClock,
  CalendarOff,
  CalendarHeart,
} from "lucide-react";
import { deleteAllTasks } from "../slice/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilterList } from "../slice/uiSlice";
import "../App.css";
import SideBarItem from "./SideBarItem";

const Sidebar = () => {
  const dispatch = useDispatch();
  const {isTodayTasksOpen, isImportantTasksOpen, isCompleteTasksOpen, isOverduetasksOpen, isThemeDark} = useSelector((state) => state.ui);
  const tasks = useSelector((state) => state.todos.tasks);
  
  let randomAvatar = Math.random() * 100;
  let randomNum = "";
  for (let index = 0; index < 6; index++) {
    randomNum += Math.floor(Math.random() * 10);
  }

  let filteredTasks = [...tasks];
  let filteredTaskTitle = "All Tasks";

  if (isTodayTasksOpen) {
    filteredTaskTitle = "Today's Tasks";
    filteredTasks = tasks.filter(
      (task) =>
        new Date(task.todayDate).toDateString() ===
        new Date().toDateString()
    );
  } else if (isImportantTasksOpen) {
    filteredTaskTitle = "Important Tasks";
    filteredTasks = tasks.filter((task) => task.important === true);
  } else if (isCompleteTasksOpen) {
    filteredTaskTitle = "Completed Tasks";
    filteredTasks = tasks.filter((task) => task.completed === true);
  } else if (isOverduetasksOpen) {
    filteredTaskTitle = "Overdue Tasks";
    filteredTasks = tasks.filter(
      (task) => new Date() > new Date(task.duedate)
    );
  }

  return (
    <div
      className={`h-full w-full ${
        isThemeDark ? "bg-[#2C2C2C]" : "bg-[#EEF6EF]"
      } flex flex-col items-center py-6 gap-y-6 rounded-4xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center gap-3 relative top-[-75px]">
        <div
          className={`w-[118px] h-[118px] rounded-full overflow-hidden border-2 ${
            isThemeDark ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <img
            src={`https://avatar.iran.liara.run/public/20`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className={`flex flex-col items-center gap-1 ${
            isThemeDark ? "text-[#EBEBEB]" : "text-[#1B281B]"
          }`}
        >
          <div className="text-xl">Hey,</div>
          <div className="text-3xl">{`User #${randomNum}`}</div>
        </div>
      </div>

      <div className="w-[330px] relative top-[-75px] gap-y-3 flex flex-col justify-between items-center">
        {/* Menu Section */}
        <div
          className={`w-[290px] py-4 flex flex-col ${isThemeDark ? "bg-[#232323]" : "bg-[#FBFDFC]"} rounded-2xl`}
        >
          <ul className="space-y-1 w-full">
            <SideBarItem
              label="All Tasks"
              icon={<ClipboardCheck className="w-6 h-6 mr-3" />}
              count={tasks.length}
              onClick={() => dispatch(toggleFilterList("alltasks"))}
              theme={isThemeDark}
            />
            <SideBarItem
              label="Today"
              icon={<Calendar className="w-6 h-6 mr-3" />}
              count={tasks.filter(
                (task) =>
                  new Date(task.todayDate).toDateString() ===
                  new Date().toDateString()
              ).length}
              onClick={() => dispatch(toggleFilterList("today"))}
              theme={isThemeDark}
            />
            <SideBarItem
              label="Important"
              icon={<CalendarHeart className="w-6 h-6 mr-3" />}
              count={tasks.filter((task) => task.important === true).length}
              onClick={() => dispatch(toggleFilterList("important"))}
              theme={isThemeDark}
            />
            <SideBarItem
              label="Complete"
              icon={<CalendarHeart className="w-6 h-6 mr-3" />}
              count={tasks.filter((task) => task.completed === true).length}
              onClick={() => dispatch(toggleFilterList("complete"))}
              theme={isThemeDark}
            />
            <SideBarItem
              label="Overdue"
              icon={<CalendarClock className="w-6 h-6 mr-3" />}
              count={tasks.filter((task) => new Date() > new Date(task.duedate)).length}
              onClick={() => dispatch(toggleFilterList("overdue"))}
              theme={isThemeDark}
            />
            <SideBarItem
              label="Delete All"
              icon={<CalendarOff className="w-6 h-6 mr-3" />}
              count={null}
              onClick={() => {
                dispatch(deleteAllTasks());
                dispatch(toggleFilterList(false));
              }}
              theme={isThemeDark}
            />
          </ul>
        </div>
            
        {/* Stats Section */}
        <div
          className={`p-4 w-[290px] h-[50px] rounded-lg shadow flex justify-between items-center ${isThemeDark ? "bg-[#232323] text-[#E2E2E2]" : "bg-[#FBFDFC] text-[#1B281B]"}`}
        >
          <p className="text-xl font-bold">{filteredTaskTitle}</p>
          <p className="text-2xl font-bold">
            {filteredTasks.length}/{tasks.length}
          </p>
        </div>
      </div>
      {/* Footer */}
      <footer
        className={`text-md mt-auto ${
          isThemeDark ? "text-[#E2E2E2]" : "text-[#1B281B]"
        }`}
      >
        🔰 {new Date().getFullYear()}, Siddharth Phogat
      </footer>
    </div>
  );
};

export default Sidebar;