import {
  IconPlus,
  IconAlignBoxLeftBottom,
  IconChecks,
  IconRosetteDiscountCheckFilled,
  IconPlayerRecord,
} from "@tabler/icons-react";

const StepProgress2 = () => {
  return (
    <ol className="flex items-center w-full justify-center relative">
      <li className="flex-1 flex items-center text-blue-600 dark:text-blue-500 after:content-[''] after:flex-1 after:h-2 after:bg-blue-100 dark:after:bg-blue-800 relative group">
        <span className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full lg:h-14 lg:w-14 dark:bg-blue-800 shrink-0">
          <IconPlus
            size={18}
            className="text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
          />
        </span>

        <div
          className="absolute z-10 hidden group-hover:block px-3 p-2 text-sm font-medium text-white bg-[#004C7B] rounded-lg shadow-sm opacity-100 tooltip dark:bg-blue-700 bottom-full mb-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
          role="tooltip"
        >
          Create Project
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </li>

      <li className="flex-1 flex items-center text-blue-600 dark:text-blue-500 after:content-[''] after:flex-1 after:h-2 after:bg-blue-100 dark:after:bg-blue-800 relative group">
        <span className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full lg:h-14 lg:w-14 dark:bg-blue-800 shrink-0">
          <IconAlignBoxLeftBottom
            size={18}
            className="text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
          />
        </span>

        <div
          className="absolute z-10 hidden group-hover:block px-3 p-2 text-sm font-medium text-white bg-[#004C7B] rounded-lg shadow-sm opacity-100 tooltip dark:bg-blue-700 bottom-full mb-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
          role="tooltip"
        >
          Enter you requirements
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </li>

      <li className="flex-1 flex items-center after:content-[''] after:flex-1 after:h-2 after:bg-blue-100 dark:after:bg-blue-700 relative group">
        <span className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full lg:h-14 lg:w-14 dark:bg-blue-800 shrink-0">
          <IconChecks />
        </span>

        <div
          className="absolute z-10 hidden group-hover:block px-3 p-2 text-sm font-medium text-white bg-[#004C7B] rounded-lg shadow-sm opacity-100 tooltip dark:bg-blue-700 bottom-full mb-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
          role="tooltip"
        >
          Confirm the details
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </li>

      <li className="flex-1 flex items-center w-full relative group">
        <span className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full lg:h-14 lg:w-14 dark:bg-blue-800 shrink-0">
          <IconRosetteDiscountCheckFilled />
        </span>

        <div
          className="absolute z-10 hidden group-hover:block px-3 p-2 text-sm font-medium text-white bg-[#004C7B] rounded-lg shadow-sm opacity-100 tooltip dark:bg-blue-700 bottom-full mb-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-300"
          role="tooltip"
        >
          Project Creted
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </li>
    </ol>
  );
};

export default StepProgress2;
