import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import StepProgress from "../Steps/StepProgress";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Server, Database, Code, Settings, Cloud, Package, Github } from "lucide-react";
import ProjectMade from "./ProjectMade";
import { PROJECT_TYPES } from "@/constants/projectTypes";

const DetailsViewer = ({
  setNext,
  next,
  formData,
  dataToDispatch,
  isLoading,
  resultMessage,
  statusCode,
  statusMessage,
  setStatusMessage,
  currentStep = 3,
}) => {
  // Check if this is a microservice project
  const isMicroservice = formData.applicationType === PROJECT_TYPES.MICROSERVICE || dataToDispatch?.services;
  const microserviceData = dataToDispatch?.services || [];
  
  // State for collapsible services (first service expanded by default)
  const [expandedServices, setExpandedServices] = useState(() => {
    const initialState = {};
    microserviceData.forEach((_, index) => {
      initialState[index] = index === 0; // First service expanded by default
    });
    return initialState;
  });

  const toggleService = (index) => {
    setExpandedServices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      {next ? (
        <div className="p-3 relative overflow-x-auto sm:rounded-lg m-8">
          <Popup
            isLoading={isLoading}
            statusMessage={statusMessage}
            statusCode={statusCode}
            onClose={() => setStatusMessage("")}
            next={next}
            setNext={setNext}
          />
          <div className="m-2 ml-4 flex flex-col items-center justify-center space-y-4">
             
            <div className="w-full max-w-5xl flex items-center justify-center translate-x-14">
              <StepProgress currentStep={currentStep} />
            </div>
          </div>


          {/* GitHub and Cloud Configuration Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* GitHub Configuration */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Github className="h-5 w-5" />
                  GitHub Configuration
                </CardTitle>
                <CardDescription>
                  Repository and organization settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dataToDispatch?.githubUsername && (
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        GitHub Username
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {dataToDispatch.githubUsername}
                      </div>
                    </div>
                  )}
                  {dataToDispatch?.githubOrganization && (
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        GitHub Organization
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {dataToDispatch.githubOrganization}
                      </div>
                    </div>
                  )}
                  {dataToDispatch?.githubToken && (
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        GitHub Token
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        ••••••••••••••••
                      </div>
                    </div>
                  )}
                  {!dataToDispatch?.githubUsername && !dataToDispatch?.githubOrganization && !dataToDispatch?.githubToken && (
                    <div className="text-sm text-gray-500 italic">
                      No GitHub configuration specified
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cloud Configuration */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Cloud className="h-5 w-5" />
                  Cloud Configuration
                </CardTitle>
                <CardDescription>
                  Cloud provider and deployment settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dataToDispatch?.cloudProvider && (
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Cloud Provider
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {dataToDispatch.cloudProvider.toUpperCase()}
                      </div>
                    </div>
                  )}
                  {dataToDispatch?.cloudService && (
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Cloud Service
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {dataToDispatch.cloudService}
                      </div>
                    </div>
                  )}
                  {dataToDispatch?.region && (
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Region
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {dataToDispatch.region}
                      </div>
                    </div>
                  )}
                  {dataToDispatch?.accountId && (
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Account ID
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {dataToDispatch.accountId}
                      </div>
                    </div>
                  )}
                  {dataToDispatch?.projectPath && (
                    <div className="bg-gray-50 p-3 rounded-lg border">
                      <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                        Project Path
                      </div>
                      <div className="text-sm font-semibold text-gray-900">
                        {dataToDispatch.projectPath}
                      </div>
                    </div>
                  )}
                  {!dataToDispatch?.cloudProvider && !dataToDispatch?.cloudService && !dataToDispatch?.region && !dataToDispatch?.accountId && !dataToDispatch?.projectPath && (
                    <div className="text-sm text-gray-500 italic">
                      No cloud configuration specified
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {isMicroservice ? (
            // Microservice Layout with Cards and Collapsible sections
            <div className="space-y-6">
          
              {/* Services Section */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Server className="h-5 w-5" />
                  Microservices Configuration
                </h3>
                
                {microserviceData.map((service, index) => (
                  <Card key={index} className="border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <Collapsible open={expandedServices[index]} onOpenChange={() => toggleService(index)}>
                      <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${service.isGateway ? 'bg-purple-500' : 'bg-green-500'}`}></div>
                              <div>
                                <CardTitle className="text-lg text-gray-800">
                                  {service.baseName || `Service ${index + 1}`}
                                  {service.isGateway && <span className="ml-2 text-sm text-purple-600 font-normal">(Gateway)</span>}
                                </CardTitle>
                                <CardDescription className="flex items-center gap-4 mt-1">
                                  <span className="flex items-center gap-1">
                                    <Server className="h-3 w-3" />
                                    Port: {service.serverPort}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Database className="h-3 w-3" />
                                    {service.databaseType}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Code className="h-3 w-3" />
                                    {service.buildTool}
                                  </span>
                                </CardDescription>
                              </div>
                            </div>
                            {expandedServices[index] ? 
                              <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                              <ChevronDown className="h-4 w-4 text-gray-500" />
                            }
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {Object.entries(service)
                              .filter(([key, value]) => value !== undefined && value !== null && value !== '')
                              .map(([key, value]) => (
                                <div key={key} className="bg-gray-50 p-3 rounded-lg border">
                                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                  </div>
                                  <div className="text-sm font-semibold text-gray-900">
                                    {Array.isArray(value) ? value.join(", ") : value.toString()}
                                  </div>
                                </div>
                              ))
                            }
                          </div>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            // Monolith Layout with improved cards
            <div className="space-y-6">
             

              {/* Detailed Configuration Card */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <Settings className="h-5 w-5" />
                    Detailed Configuration
                  </CardTitle>
                  <CardDescription>
                    Complete list of all configuration parameters
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dataToDispatch && Object.entries(dataToDispatch)
                      .filter(([key, value]) => 
                        key !== 'services' && 
                        key !== 'githubUsername' && 
                        key !== 'githubToken' && 
                        key !== 'githubOrganization' && 
                        key !== 'cloudProvider' && 
                        key !== 'cloudService' && 
                        key !== 'accountId' && 
                        key !== 'region' && 
                        key !== 'projectPath' && 
                        value !== undefined && 
                        value !== null && 
                        value !== ''
                      )
                      .map(([key, value]) => (
                        <div key={key} className="bg-gray-50 p-3 rounded-lg border">
                          <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </div>
                          <div className="text-sm font-semibold text-gray-900">
                            {Array.isArray(value) ? value.join(", ") : value.toString()}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      ) : (
        <ProjectMade 
          projectName={dataToDispatch?.baseName || formData?.baseName}
          projectType={formData?.applicationType || dataToDispatch?.applicationType}
          isMicroservice={isMicroservice}
          generationData={dataToDispatch}
          rootDirectoryName={dataToDispatch?.rootDirectoryName || formData?.rootDirectoryName}
        />
      )}
    </>
  );
};

export default DetailsViewer;
