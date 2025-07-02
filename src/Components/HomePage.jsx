import React from "react";
import { useEffect } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import TaskDetailPanel from "./TaskDetailPanel";
import FilterTask from "./FilterTask";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { isSidebarOpen, isTaskDetailOpen, isThemeDark, isFilterTasksOpen } = useSelector((state) => state.ui);

  useEffect(() => {
    if (isThemeDark) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
      document.body.classList.remove("dark-theme");
    }
  }, [isThemeDark]);

  return (
    <>
      <div
        className={`w-full h-full mx-auto ${isThemeDark ? "bg-[#242424]" : "bg-[#FBFDFC]"}`}
      >
        <div>
          <Navbar />
        </div>
        <div className="flex w-full h-[920px] gap-4 justify-between px-4 min-w-[900px]">
          {isSidebarOpen && (
            <div className="flex h-[850px] w-[330px] self-end">
              <Sidebar />
            </div>
          )}
          <div className={`flex w-full flex-col self-center h-11/12`}>
            {isFilterTasksOpen ? (
              <div className="w-full">
                <div className="h-[210px]">
                  <TaskInput />
                </div>
                <div className="h-[587px]">
                  <FilterTask />
                </div>
              </div>
            ) : (
              <div className="w-full">
                <div className="h-[210px]">
                  <TaskInput />
                </div>
                <div className="h-[630px]">
                  <TaskList />
                </div>
              </div>
            )}
          </div>
          {isTaskDetailOpen && (
            <div className="w-[566px] h-[904px]">
              <TaskDetailPanel />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
