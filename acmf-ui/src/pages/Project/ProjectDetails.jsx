import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  fetchProjectById,
  fetchProjectByName,
} from "@/redux/Project/Project.Action";
import Loader from "../Loader/Loader";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CheckCircle } from "lucide-react";

const ProjectDetails = () => {
  const [selectedOption, setSelectedOption] = useState("Deployed");
  const buttonClasses =
    selectedOption === "Deployed"
      ? "bg-green-500 hover:bg-green-600 text-white"
      : "bg-[#004C7B] hover:bg-[#003A5C] text-white";

  const handleSelect = (option) => {
    setSelectedOption(option);
  };
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store);

  useEffect(() => {
    if (id) {
      dispatch(fetchProjectById(id));
    } else if (name) {
      dispatch(fetchProjectByName(name));
    }
  }, [id, name, dispatch]);

  if (project?.loading) return <Loader />;

  const projectDetails = project?.projectDetails || {};

  return (
    <div className="p-4 border-2 rounded-xl shadow-md m-8">
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">
          Project Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Details and summary of the selected project.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-xl strong font-medium text-gray-900">
              Project Name
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <strong>{projectDetails.name || "No Project Name"}</strong>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-xl strong font-medium text-gray-900">Admin</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <p>
                <strong>Name:</strong>{" "}
                {`${projectDetails.admin?.firstName || "N/A"} ${
                  projectDetails.admin?.lastName || ""
                }`}
              </p>
              <p>
                <strong>Email:</strong> {projectDetails.admin?.email || "N/A"}
              </p>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-xl strong font-medium text-gray-900">
              Application Source Code
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <a
                href={projectDetails.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                View Repository
              </a>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-xl strong font-medium text-gray-900">
              Deployment Status
            </dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <a
                href={
                  projectDetails?.category === "monolith"
                    ? `${projectDetails?.githubUrl?.replace(/\.git$/, "")}/actions`
                    : `${projectDetails?.githubUrl
                        ?.replace(/\.git$/, "")
                        ?.split("/tree/")[0]}/actions`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Goto Actions
              </a>
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-xl strong font-medium text-gray-900">Tech Stack</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {projectDetails.tags?.length > 0 ? (
                projectDetails.tags.join(", ")
              ) : (
                <span>No Tags</span>
              )}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-xl strong font-medium text-gray-900">Server Port</dt>
            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {/* {projectDetails.tags?.length > 0 ? (
                projectDetails.port.join(", ")
              ) : (
                <span>No Tags</span>
              )} */}
              {projectDetails.port || "N/A"}
            </dd>
          </div>

          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-xl strong font-medium text-gray-900">Status</dt>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md focus:outline-none ${buttonClasses}`}
                >
                  {selectedOption === "Deployed" ? (
                    <span className="flex items-center gap-2">
                      Deployed{" "}
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      Pushed <CheckCircle className="h-4 w-4 text-[#004C7B]" />
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-36">
                <DropdownMenuItem
                  onClick={() => handleSelect("Deployed")}
                  className={`flex items-center gap-2 ${
                    selectedOption === "Deployed"
                      ? "text-green-500"
                      : "text-gray-700"
                  }`}
                >
                  <CheckCircle
                    className={`h-4 w-4 ${
                      selectedOption === "Deployed"
                        ? "text-green-400"
                        : "text-gray-300"
                    }`}
                  />
                  Deployed
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSelect("Pushed")}
                  className={`flex items-center gap-2 ${
                    selectedOption === "Pushed"
                      ? "text-[#004C7B]"
                      : "text-gray-700"
                  }`}
                >
                  <CheckCircle
                    className={`h-4 w-4 ${
                      selectedOption === "Pushed"
                        ? "text-[#004C7B]"
                        : "text-gray-300"
                    }`}
                  />
                  Pushed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ProjectDetails;
