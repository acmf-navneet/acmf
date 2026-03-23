import React from "react";
import {
  IconPlus,
  IconAlignBoxLeftBottom,
  IconChecks,
  IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";

const StepProgress = ({ currentStep = 1, isSuccess = false }) => {
  const steps = [
    {
      id: 1,
      icon: IconPlus,
      title: "Create Project",
      description: "Choose project type and configuration"
    },
    {
      id: 2,
      icon: IconAlignBoxLeftBottom,
      title: "Enter Requirements",
      description: "Fill in project details and options"
    },
    {
      id: 3,
      icon: IconChecks,
      title: "Confirm Details",
      description: "Review and confirm your configuration"
    },
    {
      id: 4,
      icon: IconRosetteDiscountCheckFilled,
      title: "Project Created",
      description: "Your project has been generated successfully"
    }
  ];

  const getStepClasses = (stepId) => {
    // If success mode and all steps are completed, show green
    if (isSuccess && stepId <= steps.length) {
      return {
        container: "flex-1 flex items-center text-green-600 dark:text-green-500",
        connector: stepId < steps.length ? "after:content-[''] after:flex-1 after:h-2 after:bg-green-100 dark:after:bg-green-800" : "",
        circle: "flex items-center justify-center w-12 h-12 bg-green-100 rounded-full lg:h-14 lg:w-14 dark:bg-green-800 shrink-0",
        icon: "text-green-600 lg:w-4 lg:h-4 dark:text-green-300"
      };
    }
    // Normal progression mode
    else if (stepId <= currentStep) {
      return {
        container: "flex-1 flex items-center text-blue-600 dark:text-blue-500",
        connector: stepId < steps.length ? "after:content-[''] after:flex-1 after:h-2 after:bg-blue-100 dark:after:bg-blue-800" : "",
        circle: "flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full lg:h-14 lg:w-14 dark:bg-blue-800 shrink-0",
        icon: "text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300"
      };
    } else {
      return {
        container: "flex-1 flex items-center",
        connector: stepId < steps.length ? "after:content-[''] after:flex-1 after:h-2 after:bg-gray-100 dark:after:bg-gray-700" : "",
        circle: "flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full lg:h-14 lg:w-14 dark:bg-gray-800 shrink-0",
        icon: "text-gray-400 lg:w-4 lg:h-4 dark:text-gray-500"
      };
    }
  };

  return (
    <ol className="flex items-center w-full justify-center relative">
      {steps.map((step, index) => {
        const classes = getStepClasses(step.id);
        const IconComponent = step.icon;
        
        return (
          <li 
            key={step.id} 
            className={`${classes.container} ${classes.connector} relative group`}
          >
            <span className={classes.circle}>
              <IconComponent
                size={18}
                className={classes.icon}
              />
            </span>

            <div
              className={`absolute z-10 hidden group-hover:block px-3 py-2 text-sm font-medium rounded-lg shadow-sm opacity-100 tooltip bottom-full mb-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                isSuccess 
                  ? "bg-green-600 text-white dark:bg-green-700" 
                  : "bg-white text-[#004C7B] dark:bg-blue-700 dark:text-white"
              }`}
              role="tooltip"
            >
              <div className="font-semibold">{step.title}</div>
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default StepProgress;