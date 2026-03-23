// DTO Classes for Project Generation
import { PROJECT_TYPES } from "@/constants/projectTypes";

export class GitHubConfig {
  constructor(username = "", token = "", organization = "") {
    this.githubUsername = username;
    this.githubToken = token;
    this.githubOrganization = organization;
  }

  static fromFormData(formData) {
    return new GitHubConfig(
      formData.githubUsername || "",
      formData.githubToken || "",
      formData.githubOrganization || ""
    );
  }

  toQueryParams() {
    return {
      githubUsername: this.githubUsername,
      githubToken: this.githubToken,
      githubOrganization: this.githubOrganization
    };
  }
}

export class CloudConfig {
  constructor(provider = "", service = "", accountId = "", region = "", projectPath = "") {
    this.cloudProvider = provider;
    this.cloudService = service;
    this.accountId = accountId;
    this.region = region;
    this.projectPath = projectPath;
  }

  static fromFormData(formData) {
    return new CloudConfig(
      formData.cloudProvider || "",
      formData.cloudService || "",
      formData.accountId || "",
      formData.region || "",
      formData.projectPath || ""
    );
  }

  toQueryParams() {
    return {
      cloudProvider: this.cloudProvider,
      cloudService: this.cloudService,
      accountId: this.accountId,
      region: this.region,
      projectPath: this.projectPath
    };
  }
}

export class MonolithicDto {
  constructor(baseName = "", applicationType = PROJECT_TYPES.MONOLITH) {
    this.baseName = baseName;
    this.applicationType = applicationType;
    this.authenticationType = "jwt";
    this.packageName = "com.example.client";
    this.databaseType = "sql";
    this.prodDatabaseType = "postgresql";
    this.buildTool = "maven";
    this.clientFramework = "no";
    this.cacheProvider = "ehcache";
    this.testFrameworks = ["cucumber"];
    this.enableHibernateCache = true;
    this.jwtSecretKey = "d6e2b0ecbbcf41718d409a2c0d02e76b38b19617ac4be8f3f35e7e72be1d6204";
    this.serviceDiscoveryType = "no";
    this.reactive = false;
    this.nativeLanguage = "en";
    this.otherLanguages = [];
    this.enableTranslation = false;
    this.microfrontend = false;
    this.clientPackageManager = "npm";
    this.clientTheme = [];
  }

  static fromFormData(formData) {
    const dto = new MonolithicDto(formData.baseName || "");
    
    // Override with form data values
    Object.assign(dto, {
      authenticationType: formData.authenticationType || "jwt",
      packageName: formData.packageName || "com.example.client",
      databaseType: formData.databaseType || "sql",
      prodDatabaseType: formData.prodDatabaseType || "postgresql",
      buildTool: formData.buildTool || "maven",
      clientFramework: formData.clientFramework || "no",
      cacheProvider: formData.cacheProvider || "ehcache",
      testFrameworks: Array.isArray(formData.testFrameworks) ? formData.testFrameworks : [formData.testFrameworks].filter(Boolean),
      enableHibernateCache: formData.enableHibernateCache !== undefined ? formData.enableHibernateCache : true,
      jwtSecretKey: formData.jwtSecretKey || "d6e2b0ecbbcf41718d409a2c0d02e76b38b19617ac4be8f3f35e7e72be1d6204",
      serviceDiscoveryType: formData.serviceDiscoveryType || "no",
      reactive: formData.reactive !== undefined ? formData.reactive : false,
      nativeLanguage: formData.nativeLanguage || "en",
      otherLanguages: formData.otherLanguages || [],
      enableTranslation: formData.enableTranslation !== undefined ? formData.enableTranslation : false,
      microfrontend: formData.microfrontend !== undefined ? formData.microfrontend : false,
      clientPackageManager: formData.clientPackageManager || "npm",
      clientTheme: formData.clientTheme || []
    });

    return dto;
  }
}

export class MicroserviceDto {
  constructor(rootDirectoryName = "", credentials = null, applications = []) {
    this.rootDirectoryName = rootDirectoryName;
    this.credentials = credentials || new GitHubConfig();
    this.applications = applications;
  }

  static fromFormData(formData, applications = []) {
    const githubConfig = GitHubConfig.fromFormData(formData);
    const cloudConfig = CloudConfig.fromFormData(formData);
    
    // Merge GitHub and Cloud configs into credentials
    const credentials = {
      ...githubConfig.toQueryParams(),
      ...cloudConfig.toQueryParams()
    };

    return new MicroserviceDto(
      formData.rootDirectoryName || "",
      credentials,
      applications
    );
  }

  addApplication(application) {
    this.applications.push(application);
  }

  setGatewayApplication(gatewayIndex) {
    // Ensure only one gateway exists
    this.applications.forEach((app, index) => {
      app.isGateway = index === gatewayIndex;
    });
  }
}

export class MicroserviceApplicationDto {
  constructor(baseName = "", applicationType = PROJECT_TYPES.MICROSERVICE) {
    this.baseName = baseName;
    this.applicationType = applicationType;
    this.authenticationType = "jwt";
    this.packageName = "com.example.service";
    this.databaseType = "sql";
    this.prodDatabaseType = "postgresql";
    this.buildTool = "maven";
    this.clientFramework = "no";
    this.cacheProvider = "ehcache";
    this.testFrameworks = ["cucumber"];
    this.enableHibernateCache = true;
    this.jwtSecretKey = this.generateJwtSecretKey();
    this.serviceDiscoveryType = "eureka";
    this.reactive = false;
    this.nativeLanguage = "en";
    this.otherLanguages = [];
    this.enableTranslation = false;
    this.microfrontend = false;
    this.clientPackageManager = "npm";
    this.clientTheme = [];
    this.isGateway = false;
    this.serverPort = 8080;
  }

  generateJwtSecretKey() {
    const chars = '0123456789abcdef';
    let result = '';
    for (let i = 0; i < 64; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  }

  static fromFormData(formData, isGateway = false) {
    const dto = new MicroserviceApplicationDto(formData.baseName || "");
    
    // Override with form data values
    Object.assign(dto, {
      authenticationType: formData.authenticationType || "jwt",
      packageName: formData.packageName || "com.example.service",
      databaseType: formData.databaseType || "sql",
      prodDatabaseType: formData.prodDatabaseType || "postgresql",
      buildTool: formData.buildTool || "maven",
      clientFramework: formData.clientFramework || "no",
      cacheProvider: formData.cacheProvider || "ehcache",
      testFrameworks: Array.isArray(formData.testFrameworks) ? formData.testFrameworks : [formData.testFrameworks].filter(Boolean),
      enableHibernateCache: formData.enableHibernateCache !== undefined ? formData.enableHibernateCache : true,
      jwtSecretKey: formData.jwtSecretKey || dto.generateJwtSecretKey(),
      serviceDiscoveryType: formData.serviceDiscoveryType || "eureka",
      reactive: formData.reactive !== undefined ? formData.reactive : false,
      nativeLanguage: formData.nativeLanguage || "en",
      otherLanguages: formData.otherLanguages || [],
      enableTranslation: formData.enableTranslation !== undefined ? formData.enableTranslation : false,
      microfrontend: formData.microfrontend !== undefined ? formData.microfrontend : false,
      clientPackageManager: formData.clientPackageManager || "npm",
      clientTheme: formData.clientTheme || [],
      isGateway: isGateway,
      serverPort: formData.serverPort || 8080
    });

    return dto;
  }
}

// Utility functions
export const createQueryParams = (githubConfig, cloudConfig) => {
  return {
    ...githubConfig.toQueryParams(),
    ...cloudConfig.toQueryParams()
  };
};

export const buildUrlWithParams = (baseUrl, params) => {
  const queryString = new URLSearchParams(params).toString();
  return `${baseUrl}?${queryString}`;
}; 