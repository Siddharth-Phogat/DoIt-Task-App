import React from "react";

const SideBarItem = ({ label, icon, count, onClick, theme }) => {
  return (
    <>
      <li
        className={`flex h-[40px] items-center justify-between py-2 px-4 rounded cursor-pointer ${
          theme ? "dark-theme-sidebar" : "light-theme-sidebar"
        }`}
        onClick={onClick}
      >
        <div className="flex items-center">
          {icon}
          <span>{label}</span>
        </div>
        {count > 0 && (
          <div className="bg-green-600 flex h-5 w-7 rounded-full text-white font-extrabold items-center justify-center">
            {count}
          </div>
        )}
      </li>
    </>
  );
};

export default SideBarItem;
