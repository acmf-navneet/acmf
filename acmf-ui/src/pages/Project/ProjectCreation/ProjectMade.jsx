import StepProgress from "../Steps/StepProgress";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fetchProjectByName, fetchProjectByRootDir } from "@/redux/Project/Project.Action";
import { PROJECT_TYPES } from "@/constants/projectTypes";

const ProjectMade = ({ projectName, projectType, generationData, rootDirectoryName, isMicroservice }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectDetails, microserviceDetails, isLoading, error } = useSelector((state) => state.project);

  const [githubUrl, setGithubUrl] = useState(null);
  const [projectInfo, setProjectInfo] = useState(null);

  useEffect(() => {
    if (!isMicroservice && projectName) {
      dispatch(fetchProjectByName(projectName));
    } else if (isMicroservice && rootDirectoryName) {
      dispatch(fetchProjectByRootDir(rootDirectoryName));
    }
  }, [dispatch, projectType, projectName, rootDirectoryName]);

  useEffect(() => {
    if (!isMicroservice && projectDetails) {
      // For monolithic projects - projectDetails is a single object
      setGithubUrl(projectDetails.githubUrl);
      setProjectInfo({
        name: projectDetails.baseName || projectName,
        path: projectDetails.projectPath,
        type: 'Monolithic Application'
      });
    } else if (isMicroservice && microserviceDetails && microserviceDetails.length > 0) {
      // For microservice projects - microserviceDetails is an array of services
      setGithubUrl(microserviceDetails[0]?.githubUrl);
      setProjectInfo({
        name: rootDirectoryName || 'Microservice System',
        type: 'Microservice System',
        services: microserviceDetails || []
      });
    }
  }, [projectType, projectDetails, microserviceDetails, projectName, rootDirectoryName]);

  const goToProjectDetails = () => {
    if (!isMicroservice) {
      navigate(`/project/name/${projectName}`);
    } else if (isMicroservice) {
      navigate(`/project/created-microservices/${rootDirectoryName}`);
    }
  };

  const goToGithub = () => {
    if (githubUrl) {
      window.open(githubUrl, '_blank');
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading project details...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Project</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-white dark:bg-dark">
        <div className="m-2 flex flex-col items-center justify-center space-y-4 mb-10">
          <div className="w-full max-w-5xl mb-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="text-blue-500 font-semibold"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/importproject"
                    className="text-blue-500 font-semibold"
                  >
                    New Project
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/importproject"
                    className="text-blue-500 font-semibold"
                  >
                    Create Project
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="w-full max-w-5xl flex items-center justify-center">
            <StepProgress currentStep={4} isSuccess={true} />
          </div>
        </div>
        <div className="container mx-auto">
          <div className="m-4 relative z-10 overflow-hidden rounded bg-primary py-12 px-8 md:p-[70px]">
            <div className="flex flex-wrap items-center -mx-4">
              <div className="w-full px-4 lg:w-1/2">
                <span className="block mb-4 text-base font-medium text-white">
                  🎉 Project Generated Successfully!
                </span>
                <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:mb-8 sm:text-[40px]/[48px] lg:mb-0">
                  <span className="xs:block">
                    Your {projectInfo?.type || 'Project'} is ready
                  </span>
                </h2>

                {/* Project Information */}
                {projectInfo && (
                  <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {projectInfo.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-2">
                      Type: {projectInfo.type}
                    </p>
                    {projectInfo.services && projectInfo.services.length > 0 && (
                      <div className="mt-3">
                        <p className="text-white/80 text-sm mb-2">Services:</p>
                        <div className="flex flex-wrap gap-2">
                          {projectInfo.services.map((service, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-white/20 rounded text-xs text-white"
                            >
                              {service.baseName || service.name || `Service ${index + 1}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="w-full px-4 lg:w-1/2">
                <div className="flex flex-wrap lg:justify-end">
                  <button
                    onClick={goToProjectDetails}
                    className="inline-flex py-3 my-1 mr-4 text-base font-medium transition bg-white rounded-md hover:bg-shadow-1 text-primary px-7"
                  >
                    Go to Project Details
                  </button>

                  {githubUrl ? (
                    <button
                      onClick={goToGithub}
                      className="inline-flex py-3 my-1 mr-4 text-base font-medium transition bg-white rounded-md hover:bg-shadow-1 text-primary px-7"
                    >
                      View on GitHub
                    </button>
                  ) : (
                    <button
                      disabled
                      className="inline-flex py-3 my-1 mr-4 text-base font-medium bg-gray-300 rounded-md text-gray-500 px-7 cursor-not-allowed"
                    >
                      GitHub URL Not Available
                    </button>
                  )}
                </div>

                {/* Additional Information */}
                {githubUrl && (
                  <div className="mt-4 p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <p className="text-white/80 text-sm">
                      Your project has been pushed to GitHub and is ready for development!
                    </p>
                    <p className="text-white/60 text-xs mt-1">
                      Repository: {githubUrl}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectMade;
