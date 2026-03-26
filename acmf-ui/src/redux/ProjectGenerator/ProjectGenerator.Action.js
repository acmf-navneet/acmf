import {
  PROJECT_REQUEST,
  PROJECT_SUCCESS,
  PROJECT_FAILURE,
} from "./ActionTypes";
import { PROJECT_TYPES } from "@/constants/projectTypes";
// 1. IMPORT YOUR CONFIGURED API INSTANCE
import api from "../../api/api"; 

export const projectRequest = () => ({
  type: PROJECT_REQUEST,
});

export const projectSuccess = (data) => ({
  type: PROJECT_SUCCESS,
  payload: data,
});

export const projectFailure = (error) => ({
  type: PROJECT_FAILURE,
  payload: error,
});

export const generateMicroserviceProject = (apiPayload) => {
  console.log("📋 [API] Microservice API payload received:", apiPayload);
  return async (dispatch) => {
    dispatch(projectRequest());
    try {
      // 2. Build query parameters (Same as before)
      const queryParams = new URLSearchParams({
        githubUsername: apiPayload.githubUsername || "",
        githubToken: apiPayload.githubToken || "",
        githubOrganization: apiPayload.githubOrganization || "",
        cloudProvider: apiPayload.cloudProvider || "",
        cloudService: apiPayload.cloudService || "",
        accountId: apiPayload.accountId || "",
        region: apiPayload.region || ""
      });

      // 3. Prepare the DTO structure
      const microserviceDto = {
        rootDirectoryName: apiPayload.rootDirectoryName || "",
        applications: apiPayload.applications || []
      };

      // 4. USE THE API INSTANCE (No more localhost!)
      // Note: api.post automatically handles the base URL and Auth headers
      const response = await api.post(
        `/api/projects/generate-microservices?${queryParams.toString()}`, 
        microserviceDto
      );

      // 5. Handle Success (Axios returns data in response.data)
      dispatch(projectSuccess(response.data));
      return response.data;

    } catch (error) {
      // 6. Handle Error (Axios throws error object)
      const errorMsg = error.response?.data?.message || error.message || "Failed to generate microservice project";
      const errorObj = {
        code: error.response?.status || 500,
        message: errorMsg,
      };
      dispatch(projectFailure(errorObj));
      throw errorObj;
    }
  };
};

export const generateMonolithicProject = (apiPayload) => {
  console.log("🚀 [API] Starting monolithic project generation request...");
  console.log("📋 [API] Monolithic API payload received:", apiPayload);
  return async (dispatch) => {
    dispatch(projectRequest());
    try {
      // 7. Build query parameters
      const queryParams = new URLSearchParams({
        githubUsername: apiPayload.githubUsername || "",
        githubToken: apiPayload.githubToken || "",
        githubOrganization: apiPayload.githubOrganization || "",
        cloudProvider: apiPayload.cloudProvider || "",
        cloudService: apiPayload.cloudService || "",
        accountId: apiPayload.accountId || "",
        region: apiPayload.region || ""
      });

      // 8. Prepare the monolithic DTO structure
      const monolithicDto = {
        baseName: apiPayload.baseName || "",
        applicationType: PROJECT_TYPES.MONOLITH,
        authenticationType: apiPayload.authenticationType || "jwt",
        packageName: apiPayload.packageName || "com.example.client",
        databaseType: apiPayload.databaseType || "sql",
        prodDatabaseType: apiPayload.prodDatabaseType || "postgresql",
        devDatabaseType: apiPayload.devDatabaseType || "h2disk",
        buildTool: apiPayload.buildTool || "maven",
        clientFramework: apiPayload.clientFramework || "no",
        cacheProvider: apiPayload.cacheProvider || "ehcache",
        testFrameworks: Array.isArray(apiPayload.testFrameworks) ? apiPayload.testFrameworks : [apiPayload.testFrameworks].filter(Boolean),
        enableHibernateCache: apiPayload.enableHibernateCache !== undefined ? apiPayload.enableHibernateCache : true,
        jwtSecretKey: apiPayload.jwtSecretKey || "d6e2b0ecbbcf41718d409a2c0d02e76b38b19617ac4be8f3f35e7e72be1d6204",
        serviceDiscoveryType: apiPayload.serviceDiscoveryType || "no",
        reactive: apiPayload.reactive !== undefined ? apiPayload.reactive : false,
        nativeLanguage: apiPayload.nativeLanguage || "en",
        otherLanguages: apiPayload.otherLanguages || [],
        enableTranslation: apiPayload.enableTranslation !== undefined ? apiPayload.enableTranslation : false,
        microfrontend: apiPayload.microfrontend !== undefined ? apiPayload.microfrontend : false,
        websocket: apiPayload.websocket || "false",
        clientPackageManager: apiPayload.clientPackageManager || "npm",
        clientTheme: apiPayload.clientTheme || [],
        serverPort: apiPayload.serverPort || 8080,
        // Optional JDL content so backend can generate entities
        jdlContent: apiPayload.jdlContent
      };

      // 9. USE THE API INSTANCE
      const response = await api.post(
        `/api/projects/generate-project?${queryParams.toString()}`, 
        monolithicDto
      );

      // 10. Handle Success
      dispatch(projectSuccess(response.data));
      return response.data;

    } catch (error) {
      // 11. Handle Error
      const errorMsg = error.response?.data?.message || error.message || "Failed to generate monolithic project";
      const errorObj = {
        code: error.response?.status || 500,
        message: errorMsg,
      };
      dispatch(projectFailure(errorObj));
      throw errorObj;
    }
  };
};