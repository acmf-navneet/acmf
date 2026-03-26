import React, { useState } from "react";
import { useFormikContext, FieldArray } from "formik";
import { generateMicroserviceProject } from "@/redux/ProjectGenerator/ProjectGenerator.Action";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { GitHubConfig, AzureConfig, ServerSideOptions, ClientSideOptions, NamingConfiguration, MicroserviceOptions } from "./common";
import { PROJECT_TYPES, PROJECT_TYPE_LABELS } from "@/constants/projectTypes";

const MicroserviceForm = ({ formikProps, onNext, onBack, onPreview }) => {
  const dispatch = useDispatch();
  const { values, errors, isValid, validateForm, setTouched, setFieldValue } = useFormikContext();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusCode, setStatusCode] = useState("");

  const [expandedServices, setExpandedServices] = useState({ 0: true }); // Track which services are expanded

  const databaseOptions = {
    sql: {
      prod: ["mysql", "mssql", "postgresql"],
      dev: ["h2disk", "h2memory", "mysql", "mssql", "postgresql"],
    },
    mongodb: {
      prod: ["mongodb"],
      dev: ["mongodb"],
    },
    cassandra: {
      prod: ["cassandra"],
      dev: ["cassandra"],
    },
    neo4j: {
      prod: ["neo4j"],
      dev: ["neo4j"],
    },
  };

  // Validation helper function
  const validateAndMarkTouched = async () => {
    const validationErrors = await validateForm();
    if (Object.keys(validationErrors).length > 0) {
      // Mark all fields as touched to show validation errors
      const touchedFields = {};
      const markTouched = (obj, prefix = '') => {
        Object.keys(obj).forEach(key => {
          const fieldPath = prefix ? `${prefix}.${key}` : key;
          if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            markTouched(obj[key], fieldPath);
          } else {
            touchedFields[fieldPath] = true;
          }
        });
      };
      markTouched(validationErrors);
      setTouched(touchedFields);
      return false;
    }
    return true;
  };

  const toggleServiceExpanded = (index) => {
    setExpandedServices(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const addMicroservice = (arrayHelpers) => {
    const newService = {
      id: values.services.length + 1,
      baseName: `service${values.services.length + 1}`,
      packageName: "com.example.service",
      authenticationType: "jwt",
      buildTool: "maven",
      databaseType: "sql",
      prodDatabaseType: "postgresql",
      devDatabaseType: "h2disk",
      serverPort: 8080 + values.services.length,
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
    };
    arrayHelpers.push(newService);
    setExpandedServices(prev => ({
      ...prev,
      [values.services.length]: true // Expand the new service
    }));
  };

  const removeService = (arrayHelpers, index) => {
    if (values.services.length > 1) {
      arrayHelpers.remove(index);
      // Update expanded services state
      const newExpandedServices = {};
      Object.keys(expandedServices).forEach(key => {
        const keyIndex = parseInt(key);
        if (keyIndex < index) {
          newExpandedServices[keyIndex] = expandedServices[keyIndex];
        } else if (keyIndex > index) {
          newExpandedServices[keyIndex - 1] = expandedServices[keyIndex];
        }
      });
      setExpandedServices(newExpandedServices);
    }
  };

 
  
  const generateJwtSecretKey = () => {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };

  const handlePreview = async (e) => {
    e.preventDefault();
    
    // Validate form before proceeding
    const isFormValid = await validateAndMarkTouched();
    if (!isFormValid) {
      setStatusCode(400);
      setStatusMessage("Please fix the validation errors before previewing the configuration.");
      return;
    }

    setIsLoading(true);
    setStatusMessage("");
    setStatusCode("");

    try {
      // Prepare the API payload for microservice
      const apiPayload = {
        // GitHub credentials as parameters
        githubUsername: values.githubUsername,
        githubToken: values.githubToken,
        githubOrganization: values.githubOrganization,
        
        // Cloud credentials as parameters
        cloudProvider: values.cloudProvider,
        cloudService: values.cloudService,
        accountId: values.accountId,
        region: values.region,
        
        // Root directory
        rootDirectoryName: values.rootDirectoryName || "microservice-system",
        
        // Applications array (services)
        services: values.services.map((service, index) => ({
          baseName: service.baseName || `service${index + 1}`,
          applicationType: PROJECT_TYPES.MICROSERVICE,
          authenticationType: service.authenticationType || "jwt",
          packageName: service.packageName || "com.example.service",
          databaseType: service.databaseType || "sql",
          prodDatabaseType: service.prodDatabaseType || "postgresql",
          devDatabaseType: service.devDatabaseType || "h2disk",
          buildTool: service.buildTool || "maven",
          clientFramework: service.clientFramework || "no",
          cacheProvider: service.cacheProvider || "ehcache",
          testFrameworks: Array.isArray(service.testFrameworks) ? service.testFrameworks : [service.testFrameworks].filter(Boolean),
          enableHibernateCache: service.enableHibernateCache !== undefined ? service.enableHibernateCache : true,
          jwtSecretKey: generateJwtSecretKey(),
          serviceDiscoveryType: service.serviceDiscoveryType || "eureka",
          reactive: service.reactive !== undefined ? service.reactive : false,
          nativeLanguage: "en",
          otherLanguages: [],
          enableTranslation: service.enableTranslation !== undefined ? service.enableTranslation : false,
          microfrontend: false,
          websocket: service.websocket || "false",
          clientPackageManager: service.clientPackageManager || "npm",
          clientTheme: [],
          serverPort: parseInt(service.serverPort) || 8080,
          withAdminUi: service.withAdminUi || "false",
          isGateway: service.isGateway || false
        }))
      };

      console.log("🔍 [Preview] Microservice API payload:", apiPayload);
      onPreview(apiPayload);
    } catch (error) {
      console.error("Preview error:", error);
      setStatusCode(500);
      setStatusMessage("An error occurred while preparing preview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="space-y-6">
      {/* Root Configuration */}
      <NamingConfiguration
        title="Root Configuration"
        showRootDirectory={true}
      />

      {/* GitHub Configuration */}
      <GitHubConfig title="GitHub Configuration" />

      {/* Cloud Configuration */}
      <AzureConfig title="Cloud Configuration" />

      {/* Microservice Management */}
      <FieldArray name="services">
        {(arrayHelpers) => (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-blue-600">Microservice Configuration</CardTitle>
                <div className="flex space-x-2">
                  
                  
                  <Button 
                    size="sm" 
                    onClick={() => addMicroservice(arrayHelpers)}
                    type="button"
                  >
                    + Add Service
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {values.services?.map((service, index) => (
                <Collapsible 
                  key={index} 
                  open={expandedServices[index] || false} 
                  onOpenChange={() => toggleServiceExpanded(index)}
                >
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="p-0 h-auto">
                            {expandedServices[index] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <h4 className="font-semibold">Service {index + 1}</h4>
                        <Badge variant="secondary">Port: {service.serverPort}</Badge>
                        <Badge variant={service.isGateway ? "destructive" : "outline"}>
                          {service.isGateway ? PROJECT_TYPE_LABELS[PROJECT_TYPES.GATEWAY] : PROJECT_TYPE_LABELS[PROJECT_TYPES.MICROSERVICE]}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {/* Gateway/Service Toggle */}
                        <div className="flex items-center space-x-2">
                          <Label className="text-xs">Service Type</Label>
                          <Select
                            value={service.isGateway ? PROJECT_TYPES.GATEWAY : PROJECT_TYPES.MICROSERVICE}
                            onValueChange={(value) => {
                              const isGateway = value === PROJECT_TYPES.GATEWAY;
                              setFieldValue(`services.${index}.isGateway`, isGateway);
                              // If this becomes gateway, ensure others are not gateway
                              if (isGateway && values.services) {
                                values.services.forEach((_, otherIndex) => {
                                  if (otherIndex !== index) {
                                    setFieldValue(`services.${otherIndex}.isGateway`, false);
                                  }
                                });
                              }
                            }}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={PROJECT_TYPES.MICROSERVICE}>{PROJECT_TYPE_LABELS[PROJECT_TYPES.MICROSERVICE]}</SelectItem>
                              <SelectItem value={PROJECT_TYPES.GATEWAY}>{PROJECT_TYPE_LABELS[PROJECT_TYPES.GATEWAY]}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        {values.services && values.services.length > 1 && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeService(arrayHelpers, index)}
                            type="button"
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    </div>

                    <CollapsibleContent className="space-y-4 mt-4">
                      {/* Naming Configuration */}
                      <NamingConfiguration
                        title="Naming Configuration"
                        showRootDirectory={false}
                        fieldPrefix={`services.${index}`}
                      />

                      {/* Server Side Options */}
                      <ServerSideOptions
                        title="Server Side Options"
                        fieldPrefix={`services.${index}`}
                        databaseOptions={databaseOptions}
                      />

                      {/* Client Side Options */}
                      <ClientSideOptions
                        title="Client Side Options"
                        fieldPrefix={`services.${index}`}
                        isMicroservice={true}
                      />
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))}
            </CardContent>
          </Card>
        )}
      </FieldArray>

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

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          Back
        </Button>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={handlePreview} 
            disabled={isLoading || !isValid}
            type="button"
          >
            {isLoading ? "Preparing Preview..." : "Preview Configuration"}
          </Button>
        
        </div>
      </div>
    </div>
  );
};

export default MicroserviceForm; 