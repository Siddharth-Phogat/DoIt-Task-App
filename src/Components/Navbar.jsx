import {
  MenuIcon,
  Search,
  Moon,
  Sun,
  LayoutGrid,
  Logs,
  CircleUserRound,
  X
} from "lucide-react";
import {
  toggleSidebar,
  toggleLayout,
  toggleTheme,
  toggleFilterList
} from "../slice/uiSlice";
import { searchTask } from "../slice/todoSlice"
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

export default function NavBar () {
  const dispatch = useDispatch();
  const { isLayout, isThemeDark } = useSelector((state) => state.ui);

  const [searchBar, setSearchBar] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const fetchTasks = ()=>{
      dispatch(searchTask(searchInput))
      dispatch(toggleFilterList(false))
    }
    const timerId = setTimeout(fetchTasks, 500);
    return () => {
      clearTimeout(timerId);
    }
  }, [searchInput])

  return (
    <div className={`flex w-full h-[56px] mx-auto items-center justify-between rounded-full shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-2 ${isThemeDark ? "bg-[#242424]" : "bg-[#FBFDFC]"}`}>
      {/* Left section with menu icon and logo */}
      <div className="flex items-center w-[138px] h-[32px] gap-[24px]">
        <button
          className={`p-1 rounded-full ${isThemeDark ? "text-white hover:bg-[#3F9142]" : "text-gray-600 hover:bg-gray-100"}`}
          onClick={() => {
            dispatch(toggleSidebar());
            dispatch(toggleFilterList(false));
          }}
        >
          <MenuIcon size={24} className={`${isThemeDark ? "text-white" : "text-gray-600"} `}/>
        </button>

        <div className="flex w-[90px] h-[32px] gap-1 items-center">
          {/* <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.71812 6.71757C7.71011 5.72557 9.59348 5.34578 12.2718 6.13352C12.4606 6.18905 12.6515 6.24999 12.8442 6.31629C11.6298 7.1782 10.44 8.18116 9.31084 9.31029C8.87424 9.74689 8.4572 10.1918 8.06039 10.643C7.51329 11.2651 7.57406 12.2129 8.19613 12.76C8.81819 13.3071 9.766 13.2463 10.3131 12.6243C10.6675 12.2213 11.0407 11.8231 11.4322 11.4316C12.9144 9.94939 14.4837 8.73835 16.0284 7.81847C17.573 8.73835 19.1423 9.94939 20.6245 11.4316C22.3065 13.1136 23.6393 14.9078 24.5937 16.6506C24.6229 16.7154 24.6568 16.7781 24.6951 16.8384C25.2348 17.8505 25.6458 18.8433 25.9226 19.7844C26.7104 22.4627 26.3306 24.346 25.3386 25.338C24.3466 26.33 22.4632 26.7098 19.7849 25.9221C19.5961 25.8666 19.4052 25.8056 19.2125 25.7393C20.4269 24.8774 21.6167 23.8745 22.7459 22.7453C23.1635 22.3277 23.5633 21.9024 23.9445 21.4713C24.4934 20.8508 24.4352 19.9028 23.8147 19.354C23.1942 18.8051 22.2462 18.8632 21.6974 19.4838C21.3568 19.8689 20.999 20.2495 20.6245 20.624C19.1423 22.1062 17.573 23.3173 16.0284 24.2371C14.4837 23.3173 12.9144 22.1062 11.4322 20.624C8.71081 17.9026 6.90357 14.8875 6.13407 12.2712C5.34634 9.59293 5.72612 7.70956 6.71812 6.71757ZM13.1183 3.25542C14.0718 3.53587 15.0479 3.92169 16.0284 4.40533C17.0088 3.92169 17.9849 3.53588 18.9384 3.25542C22.0611 2.33701 25.3277 2.46405 27.4599 4.59625C28.9191 6.05539 29.4396 8.07153 29.3296 10.159C29.2317 12.0189 28.6353 14.0318 27.6508 16.0278C28.1345 17.0082 28.5203 17.9843 28.8007 18.9379C29.7192 22.0605 29.5921 25.3272 27.4599 27.4594C25.3277 29.5916 22.0611 29.7186 18.9384 28.8002C17.9849 28.5197 17.0088 28.1339 16.0284 27.6503C15.0479 28.1339 14.0718 28.5197 13.1183 28.8002C9.99566 29.7186 6.72899 29.5916 4.5968 27.4594C3.13867 26.0012 2.61787 23.9868 2.72684 21.9009C2.82406 20.0398 3.42065 18.0253 4.40591 16.0279C3.92226 15.0474 3.53643 14.0713 3.25597 13.1177C2.33756 9.99511 2.4646 6.72844 4.5968 4.59624C6.72899 2.46405 9.99566 2.33701 13.1183 3.25542ZM22.7459 9.31029C21.6167 8.18116 20.4269 7.1782 19.2125 6.31629C19.4052 6.24999 19.5961 6.18905 19.7849 6.13352C22.4632 5.34579 24.3466 5.72557 25.3386 6.71757C26.0228 7.40176 26.4138 8.48246 26.3338 10.0013C26.2886 10.8601 26.0921 11.8198 25.7399 12.8437C24.878 11.6293 23.875 10.4394 22.7459 9.31029ZM9.31084 22.7453C10.44 23.8745 11.6298 24.8774 12.8442 25.7393C12.6515 25.8056 12.4606 25.8666 12.2718 25.9221C9.59348 26.7098 7.71011 26.33 6.71812 25.338C6.03437 24.6543 5.6435 23.5746 5.72275 22.0574C5.76765 21.1979 5.9642 20.2371 6.31683 19.2119C7.17874 20.4263 8.1817 21.6162 9.31084 22.7453ZM19 16C19 17.6569 17.6569 19 16 19C14.3431 19 13 17.6569 13 16C13 14.3431 14.3431 13 16 13C17.6569 13 19 14.3431 19 16Z"
              fill="#3F9142"
            />
          </svg> */}
          <img
            src={`src/assets/IconDoItApp.png`}
            alt="Profile"
            className="w-12 h-12 object-cover"
          />
          <span className="text-2xl font-bold text-[#3F9142]">DoIt</span>
        </div>
      </div>

      {/* Right section with search and settings icons */}
      <div className="flex items-center justify-end w-[446px] h-[24px] gap-[24px]">
        <div className="flex gap-[15px]">
          {searchBar && (
            <input 
            className={`bg-[#8bc58c1a] p-1.5 pl-3 w-2xl rounded-full text-lg outline-0 ${isThemeDark ? "text-white" : "text-gray-600"}`}
            type="text" 
            placeholder="Search task..."
            value={searchInput}
            onChange={(e)=>setSearchInput(e.target.value)}
          />
          )}
          <button 
            title="Search Task"
            className={`p-2 rounded-full ${isThemeDark ? "text-white hover:bg-[#3F9142]" : "text-gray-600 hover:bg-gray-100"}`}
            onClick={() => {
              setSearchBar(!searchBar)
              setSearchInput("")
            }}
          >
            {searchBar ? <X size={24} /> : <Search size={24} />}
          </button>
        </div>

        <button
          title= {isLayout ? "Grid View" : "List View"}
          onClick={() => dispatch(toggleLayout())}
          className={`p-1 rounded-full ${isThemeDark ? "text-white hover:bg-[#3F9142]" : "text-gray-600 hover:bg-gray-100"}`}
        >
          {isLayout ? (<Logs size={24} />) : (<LayoutGrid size={24} />)}
        </button>

        <button
          title= {isThemeDark ? "Light Mode" : "Dark Mode"}
         className={`p-1 rounded-full ${isThemeDark ? "text-white hover:bg-[#3F9142]" : "text-gray-600 hover:bg-gray-100"}`}
         onClick={() => dispatch(toggleTheme())}
        >
          {isThemeDark ? (<Sun size={24} />) : (<Moon size={24} />)}
        </button>

        <button className={`p-1 rounded-full ${isThemeDark ? "text-white hover:bg-[#3F9142]" : "text-gray-600 hover:bg-gray-100"}`}>
          <CircleUserRound size={24}/>
          {/* <img
            src={`https://avatar.iran.liara.run/username?username=Siddharth+Phogat`}
            alt="Profile"
            className="w-8 h-8 object-cover"
          /> */}
        </button>
      </div>
    </div>
  );
};
