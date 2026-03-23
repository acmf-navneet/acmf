import LiveTvIcon from "@mui/icons-material/LiveTv";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import logo3 from "../../assets/logo3.png";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const ProjectList = () => {
  return (
    <>
      <aside
        id="logo-sidebar"
        className=" flex flex-col items-center max-h-full fixed left-0  w-64 h-screen pt-10 transition-transform -translate-x-full bg-blue border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        style={{ backgroundColor: "#004C7B" }}
        aria-label="Sidebar"
      >
        <img src={logo3} className="w-60 h-30" />
        <div className="px-3 pb-4 border-solid border-1 border-white m-2">
          <ul className="space-y-2 font-medium w-full">
            <li>
              <a
                href="#"
                className="text-white flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MenuIcon style={{ color: "white" }} />
                <span className="ms-3">All Projects</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <LiveTvIcon style={{ color: "white" }} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Live Projects
                </span>
                <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                  Pro
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white flex items-center p-2  rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CreateIcon style={{ color: "white" }} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Create Project
                </span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  3
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white flex items-center p-2 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <CloseIcon style={{ color: "white" }} />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Closed Projects
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <form className="m-8 translate-x-20 gap-x-6">
          <label
            for="default-search"
            className="ml-4 mb-2 p-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative -translate-x-20">
            <div className="absolute inset-y-0 start-0 flex items-center pl-3 mr-4">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <div className="flex items-center gap-x-4">
              <input
                type="search"
                id="default-search"
                className="flex-grow block w-2/5 px-4 p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
              </div>
          </div>
        </form>
        <ul role="list" className="divide-y divide-gray-100 m-10 items-center">
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 items-center flex-grow gap-x-4">
              <div className="min-w-0 flex-auto flex items-center gap-x-4">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] truncate text-gray-500">
                  Created by <strong>Admin</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] truncate text-gray-500">
                  Access <strong> Any</strong>
                </p>
              </div>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Add New Project
              </button>
            </div>
          </li>

          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="flex sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="flex sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="flex sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="flex sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="flex sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="flex sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="flex sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="flex sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
          <li className="flex justify-between gap-x-4 py-2 items-center">
            <div className="flex min-w-0 gap-x-4 items-center flex-grow">
              <div className="w-[192px] h-[108px] flex-none rounded-lg bg-gray-100"></div>
              <div className="min-w-0 flex-auto">
                <p className="font-montserrat text-[20px] font-bold leading-[24.38px] text-left text-gray-900">
                  Leslie Alexander
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-left mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
              <div className="flex flex-col items-center mx-auto -translate-x-20">
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] text-gray-900">
                  Owned by <strong>AMCS123 team</strong>
                </p>
                <p className="font-montserrat text-[15px] font-normal leading-[18.29px] mt-1 truncate text-gray-500">
                  leslie.alexander@example.com
                </p>
              </div>
            </div>
            <div className="flex  sm:flex sm:items-end gap-x-1 ml-6">
              <StarBorderIcon />
              <ChevronRightIcon />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ProjectList;
