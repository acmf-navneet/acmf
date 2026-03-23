import React from "react";
import MonolithList from "./MonolithList";
import MicroserviceList from "./MicroserviceList";
import { useLocation, useNavigate } from "react-router-dom";
import { PROJECT_TYPES, PROJECT_TYPE_LABELS, DEFAULT_PROJECT_TYPE } from "@/constants/projectTypes";

const ProjectList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const projectType = searchParams.get("type") || DEFAULT_PROJECT_TYPE;

  const handleProjectTypeChange = (type) => {
    searchParams.set("type", type);
    const query = searchParams.toString();
    navigate({ search: query ? `?${query}` : "" });
  };

  return (
    <>
      <div className="relative px-5 lg:px-0 lg:flex gap-5 justify-center py-5">
        <section className="hidden lg:block"></section>

        <section className="w-full lg:w-[48rem]">
          {/* Project Type Navigation */}
          <div className="flex gap-1 border-b border-gray-200 mb-5">
            <button
              onClick={() => handleProjectTypeChange(PROJECT_TYPES.MONOLITH)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                projectType === PROJECT_TYPES.MONOLITH
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {PROJECT_TYPE_LABELS[PROJECT_TYPES.MONOLITH]}
            </button>
            <button
              onClick={() => handleProjectTypeChange(PROJECT_TYPES.MICROSERVICE)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                projectType === PROJECT_TYPES.MICROSERVICE
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {PROJECT_TYPE_LABELS[PROJECT_TYPES.MICROSERVICE]}
            </button>
          </div>

          {/* Render appropriate component based on selected tab */}
          {projectType === PROJECT_TYPES.MONOLITH ? <MonolithList /> : <MicroserviceList />}
        </section>
      </div>
    </>
  );
};

export default ProjectList;
