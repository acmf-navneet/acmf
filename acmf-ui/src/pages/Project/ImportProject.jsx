import React, { useState } from "react";
import { Button } from "@/components/ui/button"; 
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { z } from "zod";

const formSchema = z.object({
  projectName: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
});

const ProjectImport = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleInputChange = (e) => {
    setRepoUrl(e.target.value);
  };

  const handleImport = (platform) => {
  };

  const getContinueUrl = () => {
    return selectedOption ? `/continue/${selectedOption}` : "#"; 
  };

  return (
    <div className="min-h-screen bg-gray-100 ml-20">
      <div className="w-full max-w-5xl mb-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/importproject">Projects</BreadcrumbLink>
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex justify-center items-center mt-20">
        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Import Project
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Enter the repository URL to import your project from GitHub, GitLab,
            or Bitbucket.
          </p>

          <input
            type="text"
            value={repoUrl}
            onChange={handleInputChange}
            placeholder="Enter GitHub/GitLab/Bitbucket Repo URL"
            className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
          />

          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={() => setSelectedOption("github")}
              className={`w-1/2 border border-gray-300 rounded-md py-4 px-3 ${
                selectedOption === "github" ? "bg-blue-500 text-white" : "bg-white"
              } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              variant="outline"
            >
              Import from GitHub
            </Button>
            <Button
              onClick={() => setSelectedOption("jhipster")}
              className={`w-1/2 border border-gray-300 rounded-md py-4 px-3 ${
                selectedOption === "jhipster" ? "bg-blue-500 text-white" : "bg-white"
              } focus:ring-2 focus:ring-blue-500 focus:outline-none`}
              variant="outline"
            >
              Create Project
            </Button>
          </div>

          <a href={getContinueUrl()} className="mt-3 block">
            <Button className="mt-3 min-w-full">Continue</Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectImport;
