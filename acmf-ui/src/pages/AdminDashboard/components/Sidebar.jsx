import { useEffect, useState } from "react";
import {
  IconLayoutDashboard,
  IconChecklist,
  IconChevronsLeft,
  IconHomeFilled,
  IconChevronDown,
  IconChevronUp,
  IconPlus,
  IconTransferIn,
} from "@tabler/icons-react";
import { Layout } from "./custom/layout";
import { Button } from "./custom/button";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "../../../lib/utils";
import itstratlogo from "../../../assets/logo22.png"
import acmflogosm from "../../../assets/acmflogosm.png"

export default function Sidebar({ className, isCollapsed, setIsCollapsed }) {
  const [navOpened, setNavOpened] = useState(false);
  const [newProjectDropdown, setNewProjectDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", navOpened);
  }, [navOpened]);

  const handleNavToggle = () => setNavOpened((prev) => !prev);
  const handleSidebarToggle = () => setIsCollapsed((prev) => !prev);

  const isNewProjectActive =
    location.pathname === "/importproject" || location.pathname === "/generateproject";

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setNewProjectDropdown(!newProjectDropdown);
  };
  useEffect(() => {
    console.log(`togglecollapse`, toggleCollapse);
  }, [toggleCollapse]);
  useEffect(() => {
    console.log(`isCollapsed`, isCollapsed);
  }, [isCollapsed]);

  return (
    <aside
      className={cn(
        "translate-y-16 mt-1 fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh",
        isCollapsed ? "md:w-14" : "md:w-64",
        className
      )}
    >
      <div
        onClick={handleNavToggle}
        className={cn(
          "absolute inset-0 transition-opacity delay-100 duration-700 bg-black md:hidden",
          navOpened ? "h-svh opacity-50" : "h-0 opacity-0"
        )}
      />
      {!isCollapsed ? <img src={itstratlogo} className= "mt-4 h-20 w-full p-2" alt="itrstratlogo" /> : <img src={acmflogosm} className="mt-4 p-2" alt="acmflogo small" />}

      <Layout fixed className={navOpened ? "h-svh" : ""}>
        <nav
          className={cn(
            "z-40 h-full flex-1 overflow-auto bg-[#004C7B] text-white justify-end",
            navOpened ? "max-h-screen" : "max-h-0 py-0 md:max-h-screen md:py-2"
          )}
        >
          <NavLink
            to="/"
            title="Dashboard"
            className={({ isActive }) =>
              cn(
                "group flex items-center justify-left p-2 rounded-lg transition-all m-2 pt-1 pb-1 relative ",
                isActive
                  ? "bg-white text-[#004C7B] shadow-md"
                  : "hover:bg-white hover:text-[#004C7B] hover:shadow-md"
              )
            }
          >
            <IconHomeFilled size={24} />
            {!isCollapsed && <span className="ml-2">Home</span>}
            <span className="absolute left-full ml-2 z-10 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-sm font-medium py-1 px-2 rounded-lg transition-opacity">
              Home
            </span>
          </NavLink>
          <NavLink
            to="/dashboard"
            title="Dashboard"
            className={({ isActive }) =>
              cn(
                "group flex items-center justify-left p-2 rounded-lg transition-all m-2 pt-1 pb-1 relative ",
                isActive
                  ? "bg-white text-[#004C7B] shadow-md"
                  : "hover:bg-white hover:text-[#004C7B] hover:shadow-md"
              )
            }
          >
            <IconLayoutDashboard size={24} />
            {!isCollapsed && <span className="ml-2">Dashboard</span>}
            <span className="absolute left-full ml-2 z-10 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-sm font-medium py-1 px-2 rounded-lg transition-opacity">
              Dashboard
            </span>
          </NavLink>

          <div
            className={cn(
              "group relative m-2 rounded-lg border transition-all overflow-hidden",
              isCollapsed
                ? "border-transparent"
                : isNewProjectActive
                ? "bg-white text-[#004C7B] shadow-md"
                : "border-white hover:shadow-md"
            )}
          >
            <div
              onClick={() => {
                if (isCollapsed) {
                  setIsCollapsed(false);
                } else {
                  setNewProjectDropdown((prev) => !prev);
                }
              }}
              className={cn(
                "flex items-center justify-between px-1 py-1 cursor-pointer rounded-lg transition-all",
                newProjectDropdown && !isCollapsed
                  ? "bg-white text-[#004C7B]"
                  : "hover:bg-white hover:text-[#004C7B] hover:shadow-md"
              )}
            >
              <div className="flex items-center rounded-lg">
                <IconChecklist size={24} />
                {!isCollapsed && <span className="ml-2">New Project</span>}
              </div>
              <button
                onClick={() => setNewProjectDropdown(!newProjectDropdown)}
                className="ml-2 flex items-center justify-center"
              >
                {!isCollapsed ? (
                  !newProjectDropdown ? (
                    <IconChevronDown size={24} />
                  ) : (
                    <IconChevronUp size={24} />
                  )
                ) : null}
              </button>
            </div>

            {!isCollapsed && newProjectDropdown && (
              <div className="flex flex-col bg-[#004C7B] text-white">
                <NavLink
                  to="/importproject"
                  className="block px-4 py-2 my-1 hover:bg-white hover:text-[#004C7B] rounded-lg pl-6"
                >
                  <div className="flex items-center">
                    <IconTransferIn size={18} />
                    <span className="ml-2">Import Project</span>
                  </div>
                </NavLink>
                <NavLink
                  to="/generateproject"
                  className="block px-4 py-2 my-1 hover:bg-white hover:text-[#004C7B] rounded-lg pl-6"
                >
                  <div className="flex items-center gap-2">
                    <IconPlus size={18} />
                    Create Project
                  </div>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        <Button
          onClick={handleSidebarToggle}
          size="icon"
          variant="outline"
          className="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? "rotate-180" : ""}`}
          />
        </Button>
      </Layout>
    </aside>
  );
}
