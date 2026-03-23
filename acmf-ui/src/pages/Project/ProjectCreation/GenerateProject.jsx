import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { 
  generateMicroserviceProject, 
  generateMonolithicProject 
} from "@/redux/ProjectGenerator/ProjectGenerator.Action";
import { PROJECT_TYPES, PROJECT_TYPE_LABELS } from "@/constants/projectTypes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DetailsViewer from "./DetailsViewer";
import StepProgress from "../Steps/StepProgress";
import MonolithicForm from "./components/MonolithicForm";
import MicroserviceForm from "./components/MicroserviceForm";
import { getValidationSchema, applicationTypeSchema } from "./validationSchemas";
import FormikErrorMessage from "./components/FormikErrorMessage";

const GenerateProject = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [previewData, setPreviewData] = useState(null);

  // Initial form values for Formik
  const getInitialValues = (applicationType) => {
    const baseValues = {
      applicationType: applicationType || PROJECT_TYPES.MONOLITH,
      // GitHub Configuration
      githubUsername: "",
      githubToken: "",
      githubOrganization: "",
      // Cloud Configuration
      projectPath: "",
      cloudProvider: "aws",
      cloudService: "",
      accountId: "",
      region: "",
      // Naming Configuration
      baseName: "",
      packageName: "com.example.inventory",
      rootDirectoryName: "",
      // Server Side Options
      authenticationType: "jwt",
      buildTool: "maven",
      databaseType: "sql",
      prodDatabaseType: "postgresql",
      devDatabaseType: "h2disk",
      serverPort: 8080,
      cacheProvider: "ehcache",
      // Client Side Options
      clientFramework: "react",
      withAdminUi: "true",
      clientPackageManager: "npm",
      testFrameworks: ["cypress"],
      // Microservice Options
      serviceDiscoveryType: "eureka",
      reactive: false,
      enableHibernateCache: true,
      enableTranslation: false,
      websocket: "false",
      isGateway: false,
      // Optional domain model configuration for monoliths
      entities: [],
      relationships: [],
    };

    if (applicationType === PROJECT_TYPES.MICROSERVICE) {
      return {
        ...baseValues,
        rootDirectoryName: "microservice-system",
        services: [{
          id: 1,
          baseName: "",
          packageName: "com.example.service",
          authenticationType: "jwt",
          buildTool: "maven",
          databaseType: "sql",
          prodDatabaseType: "postgresql",
          devDatabaseType: "h2disk",
          serverPort: 8080,
          cacheProvider: "ehcache",
          serviceDiscoveryType: "eureka",
          testFrameworks: ["cucumber"],
          enableHibernateCache: true,
          reactive: false,
          enableTranslation: false,
          websocket: "false",
          clientFramework: "no",
          clientPackageManager: "npm",
          withAdminUi: "false",
          isGateway: false,
        }]
      };
    }

    return baseValues;
  };

  const [currentApplicationType, setCurrentApplicationType] = useState(PROJECT_TYPES.MONOLITH);
  const [savedFormValues, setSavedFormValues] = useState(null); // Store form values when going to preview
  const [currentStep, setCurrentStep] = useState(1); // Start at step 1 (Create Project)

  const [next, setNext] = useState(true);
  const [handleNext, setHandleNext] = useState(true);

  const handleNextButton = () => {
    setHandleNext(!handleNext);
  };

  const handleBack = () => {
    setHandleNext(true);
    setPreviewData(null);
    setCurrentStep(2); // Back to "Enter Requirements" step
    // Don't clear savedFormValues - they will be restored by Formik's initialValues
  };

  // Update step to "Enter Requirements" when user starts filling the form
  useEffect(() => {
    if (handleNext && currentStep === 1) {
      setCurrentStep(2);
    }
  }, [handleNext, currentStep]);

  const handleNextStep = () => {
    setNext(false);
    setCurrentStep(4); // Move to "Project Created" step
  };

  const handlePreview = (data, formValues) => {
    setPreviewData(data);
    setSavedFormValues(formValues); // Save current form state
    setHandleNext(false);
    setCurrentStep(3); // Move to "Confirm Details" step
  };

  // Get initial values with proper restoration from saved state
  const getInitialValuesWithRestore = (applicationType) => {
    // If we have saved form values and the application type matches, restore them
    if (savedFormValues && savedFormValues.applicationType === applicationType) {
      return savedFormValues;
    }
    // Otherwise, return fresh initial values
    return getInitialValues(applicationType);
  };

  const handleGenerateMicroserviceProject = async () => {
    setIsLoading(true);
    setStatusMessage("");
    setStatusCode("");

    try {
      // Use the preview data which now has the correct structure
      const apiPayload = {
        rootDirectoryName: previewData.rootDirectoryName,
        // Common GitHub and Cloud configuration
        githubUsername: previewData.githubUsername,
        githubToken: previewData.githubToken,
        githubOrganization: previewData.githubOrganization,
        projectPath: previewData.projectPath,
        cloudProvider: previewData.cloudProvider,
        cloudService: previewData.cloudService,
        accountId: previewData.accountId,
        region: previewData.region,
        applications: previewData.services.map(service => ({
          baseName: service.baseName,
          applicationType: service.isGateway ? PROJECT_TYPES.GATEWAY : PROJECT_TYPES.MICROSERVICE,
          authenticationType: service.authenticationType,
          packageName: service.packageName,
          databaseType: service.databaseType,
          prodDatabaseType: service.prodDatabaseType,
          devDatabaseType: service.devDatabaseType,
          buildTool: service.buildTool,
          clientFramework: service.clientFramework,
          cacheProvider: service.cacheProvider,
          testFrameworks: service.testFrameworks,
          enableHibernateCache: service.enableHibernateCache,
          jwtSecretKey: service.jwtSecretKey,
          serviceDiscoveryType: service.serviceDiscoveryType,
          reactive: service.reactive,
          nativeLanguage: service.nativeLanguage,
          otherLanguages: service.otherLanguages,
          enableTranslation: service.enableTranslation,
          microfrontend: service.microfrontend,
          clientPackageManager: service.clientPackageManager,
          clientTheme: service.clientTheme,
          withAdminUi: service.withAdminUi,
          isGateway: service.isGateway,
          serverPort: service.serverPort
        }))
      };

      console.log("🚀 [API] Generating microservice project with payload:", apiPayload);
      const response = await dispatch(generateMicroserviceProject(apiPayload));
      console.log(response);
      setStatusMessage(response);
      
      if (response && !response.error) {
        handleNextStep();
      }
    } catch (error) {
      if (error.code && error.message) {
        setStatusCode(error.code);
        setStatusMessage(` ${error.message}`);
      } else {
        setStatusCode(500);
        setStatusMessage("An unexpected error occurred while generating microservice project. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateMonolithicProject = async () => {
    setIsLoading(true);
    setStatusMessage("");
    setStatusCode("");

    try {
      const apiPayload = {
        // GitHub and Cloud configuration (will be sent as query parameters)
        githubUsername: previewData.githubUsername,
        githubToken: previewData.githubToken,
        githubOrganization: previewData.githubOrganization,
        projectPath: previewData.projectPath,
        cloudProvider: previewData.cloudProvider,
        cloudService: previewData.cloudService,
        accountId: previewData.accountId,
        region: previewData.region,
        // Monolithic DTO structure
        baseName: previewData.baseName,
        applicationType: PROJECT_TYPES.MONOLITH,
        authenticationType: previewData.authenticationType,
        packageName: previewData.packageName,
        databaseType: previewData.databaseType,
        prodDatabaseType: previewData.prodDatabaseType,
        buildTool: previewData.buildTool,
        clientFramework: previewData.clientFramework,
        cacheProvider: previewData.cacheProvider,
        testFrameworks: previewData.testFrameworks,
        enableHibernateCache: previewData.enableHibernateCache,
        jwtSecretKey: previewData.jwtSecretKey,
        serviceDiscoveryType: previewData.serviceDiscoveryType,
        reactive: previewData.reactive,
        nativeLanguage: previewData.nativeLanguage,
        otherLanguages: previewData.otherLanguages,
        enableTranslation: previewData.enableTranslation,
        microfrontend: previewData.microfrontend,
        clientPackageManager: previewData.clientPackageManager,
        clientTheme: previewData.clientTheme,
        serverPort: previewData.serverPort,
        // Optional JDL content for entities/relationships
        jdlContent: previewData.jdlContent
      };

      console.log("🚀 [API] Generating monolithic project with payload:", apiPayload);
      const response = await dispatch(generateMonolithicProject(apiPayload));
      setStatusMessage(response);
      
      if (response && !response.error) {
        handleNextStep();
      }
    } catch (error) {
      if (error.code && error.message) {
        setStatusCode(error.code);
        setStatusMessage(` ${error.message}`);
      } else {
        setStatusCode(500);
        setStatusMessage("An unexpected error occurred while generating monolithic project. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateProject = async () => {
    if (previewData?.applicationType === PROJECT_TYPES.MICROSERVICE || previewData?.services) {
      await handleGenerateMicroserviceProject();
    } else {
      await handleGenerateMonolithicProject();
    }
  };

  return (
    <div className="p-3 relative overflow-x-auto shadow-md sm:rounded-lg m-8">
      {handleNext ? (
        <Formik
          key={`${currentApplicationType}-${handleNext}`}
          initialValues={getInitialValuesWithRestore(currentApplicationType)}
          validationSchema={getValidationSchema(currentApplicationType)}
          enableReinitialize={true}
          onSubmit={(values) => {
            console.log("Form submitted with values:", values);
          }}
        >
          {({ values, setFieldValue, errors, touched, isValid }) => (
            <Form>
              <div className="flex items-center justify-center min-h-screen">
                <div className="w-full max-w-6xl p-8 border border-blue-200 mx-4">
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
                        <BreadcrumbSeparator />
                        <BreadcrumbItem></BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                  <div className="w-full max-w-5xl flex items-center justify-center ml-10 translate-x-16">
                    <StepProgress currentStep={currentStep} />
                  </div>

                  <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
                    Create Application
                  </h2>

                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-blue-600">
                        Application Type <span className="text-red-500">*</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <label className="block text-sm text-gray-500 mb-2">
                          Choose application architecture
                        </label>
                        <Select
                          value={values.applicationType}
                          onValueChange={(value) => {
                            setCurrentApplicationType(value);
                            setFieldValue('applicationType', value);
                            // Clear saved form values if application type changes
                            if (savedFormValues && savedFormValues.applicationType !== value) {
                              setSavedFormValues(null);
                            }
                          }}
                        >
                          <SelectTrigger style={{ margin: "5px" }}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={PROJECT_TYPES.MONOLITH} style={{ margin: "5px" }}>{PROJECT_TYPE_LABELS[PROJECT_TYPES.MONOLITH]}</SelectItem>
                            <SelectItem value={PROJECT_TYPES.MICROSERVICE} style={{ margin: "5px" }}>{PROJECT_TYPE_LABELS[PROJECT_TYPES.MICROSERVICE]}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormikErrorMessage name="applicationType" />
                      </div>
                    </CardContent>
                  </Card>

                  {values.applicationType === PROJECT_TYPES.MONOLITH && (
                    <MonolithicForm
                      formikProps={{ values, setFieldValue, errors, touched, isValid }}
                      onNext={handleNextStep}
                      onBack={handleBack}
                      onPreview={(data) => handlePreview(data, values)}
                    />
                  )}

                  {values.applicationType === PROJECT_TYPES.MICROSERVICE && (
                    <MicroserviceForm
                      formikProps={{ values, setFieldValue, errors, touched, isValid }}
                      onNext={handleNextStep}
                      onBack={handleBack}
                      onPreview={(data) => handlePreview(data, values)}
                    />
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      ) : (
        <div className="p-3 relative overflow-x-auto shadow-md sm:rounded-lg m-8">
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-6xl p-8 border border-blue-200 mx-4">
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
                    <BreadcrumbSeparator />
                    <BreadcrumbItem></BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">
                Preview Configuration
              </h2>

              {/* Status Message */}
              {statusMessage && (
                <Card className={statusCode >= 400 ? "border-red-500" : "border-green-500"}>
                  <CardContent className="pt-6">
                    <p className={statusCode >= 400 ? "text-red-600" : "text-green-600"}>
                      {statusMessage}
                    </p>
                  </CardContent>
                </Card>
              )}

              <DetailsViewer
                formData={previewData || {}}
                setNext={setNext}
                next={next}
                dataToDispatch={previewData}
                statusCode={statusCode}
                isLoading={isLoading}
                resultMessage=""
                statusMessage={statusMessage}
                setStatusMessage={setStatusMessage}
                currentStep={currentStep}
              />

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                  Back to Configuration
                </Button>
                <Button onClick={handleGenerateProject} disabled={isLoading}>
                  {isLoading ? "Generating Project..." : "Generate Project"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateProject;
