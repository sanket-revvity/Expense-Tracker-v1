import React, { createContext, useContext, useState, useEffect } from "react";
import logo from "../../assets/logo.svg";
import { ChevronFirst, ChevronLast } from "lucide-react";

const SidebarContext = createContext();

function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ expanded: !isMobile && expanded }}>
      <div
        className={`h-screen transition-all duration-300 bg-white  border-0 ${
          !isMobile && expanded ? "w-64" : "w-20"
        }`}
      >
        <nav className="h-full flex flex-col">
          <div className="p-4 pb-2 flex justify-between items-center">
            <a href="/">
              <img
                src={logo}
                className={`transition-all duration-300 ${
                  !isMobile && expanded ? "w-12" : "w-0"
                }`}
                alt="logo"
              />
            </a>
            {!isMobile && (
              <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200"
              >
                {expanded ? <ChevronFirst /> : <ChevronLast />}
              </button>
            )}
          </div>

          <ul className="flex-1 px-3">{children}</ul>
        </nav>
      </div>
    </SidebarContext.Provider>
  );
}

export default Sidebar;

export function SideBarItem({ icon, text, alert, isActive, onClick }) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors 
      ${
        isActive
          ? "bg-gradient-to-tr from-gray-500 to-gray-700 text-white"
          : "hover:bg-gray-300 text-gray-700"
      }`}
      onClick={onClick}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all duration-300 ${
          expanded ? "w-52 ml-3" : "w-0 opacity-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
    </li>
  );
}
