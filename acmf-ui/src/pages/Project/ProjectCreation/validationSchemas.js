import * as yup from 'yup';
import { PROJECT_TYPES } from "@/constants/projectTypes";

// Base validation schemas for different sections
export const githubConfigSchema = yup.object({
  githubUsername: yup
    .string()
    .required('GitHub username is required')
    .min(1, 'GitHub username must be at least 1 character')
    .max(39, 'GitHub username cannot exceed 39 characters')
    .matches(
      /^[a-zA-Z0-9]([a-zA-Z0-9]|-)*[a-zA-Z0-9]$|^[a-zA-Z0-9]$/,
      'GitHub username must contain only alphanumeric characters and hyphens, cannot start or end with a hyphen'
    ),
  githubToken: yup
    .string()
    .required('GitHub token is required'),
  githubOrganization: yup
    .string()
    .optional(),
});

export const cloudConfigSchema = yup.object({
  projectPath: yup
    .string()
    .required('Project path is required'),
  cloudProvider: yup
    .string()
    .optional(),
  cloudService: yup
    .string()
    .optional(),
  accountId: yup
    .string()
    .optional(),
  region: yup
    .string()
    .optional(),
});

export const namingConfigSchema = yup.object({
  baseName: yup
    .string()
    .required('Base name is required'),
  packageName: yup
    .string()
    .required('Package name is required'),
  rootDirectoryName: yup
    .string()
    .when('$showRootDirectory', {
      is: true,
      then: (schema) => schema
        .required('Root directory name is required')
        .min(1, 'Root directory name must be at least 1 character')
        .max(100, 'Root directory name cannot exceed 100 characters')
        .matches(
          /^[a-zA-Z0-9][a-zA-Z0-9-_]*$/,
          'Root directory name must start with alphanumeric character and contain only letters, numbers, hyphens, and underscores'
        ),
      otherwise: (schema) => schema.optional()
    }),
});

export const serverSideOptionsSchema = yup.object({
  authenticationType: yup
    .string()
    .required('Authentication type is required')
    .oneOf(['jwt', 'session', 'oauth2'], 'Invalid authentication type'),
  buildTool: yup
    .string()
    .required('Build tool is required')
    .oneOf(['maven', 'gradle'], 'Build tool must be either Maven or Gradle'),
  databaseType: yup
    .string()
    .required('Database type is required')
    .oneOf(['sql', 'mongodb', 'cassandra', 'neo4j'], 'Invalid database type'),
  prodDatabaseType: yup
    .string()
    .required('Production database type is required')
    .test('valid-prod-db', 'Invalid production database for selected database type', function(value) {
      const { databaseType } = this.parent;
      const validOptions = {
        sql: ['mysql', 'mssql', 'postgresql'],
        mongodb: ['mongodb'],
        cassandra: ['cassandra'],
        neo4j: ['neo4j']
      };
      return validOptions[databaseType]?.includes(value) || false;
    }),
  devDatabaseType: yup
    .string()
    .optional(),
  serverPort: yup
    .number()
    .optional(),
  cacheProvider: yup
    .string()
    .optional()
});

export const clientSideOptionsSchema = yup.object({
  clientFramework: yup
    .string()
    .optional(),
  clientPackageManager: yup
    .string()
    .when('clientFramework', {
      is: (val) => val !== 'no',
      then: (schema) => schema
        .optional()
    }),
  withAdminUi: yup
    .string()
    .when('clientFramework', {
      is: (val) => val !== 'no',
      then: (schema) => schema
        .optional()
        .oneOf(['true', 'false'], 'Admin UI must be true or false'),
      otherwise: (schema) => schema.optional()
    }),
  testFrameworks: yup
    .array()
    .of(yup.string().oneOf(['cypress', 'protractor', 'cucumber', 'gatling'], 'Invalid test framework'))
    .optional(),
});

export const microserviceOptionsSchema = yup.object({
  serviceDiscoveryType: yup
    .string()
    .optional()
    .oneOf(['eureka', 'consul', 'no'], 'Invalid service discovery type'),
  reactive: yup
    .boolean()
    .optional(),
  enableHibernateCache: yup
    .boolean()
    .optional(),
  enableTranslation: yup
    .boolean()
    .optional(),
  websocket: yup
    .string()
    .optional()
    .oneOf(['true', 'false'], 'WebSocket must be true or false'),
  isGateway: yup
    .boolean()
    .optional(),
});

// Combined schemas for different form types
export const monolithicFormSchema = yup.object().shape({
  // GitHub config
  ...githubConfigSchema.fields,
  
  // Cloud config
  ...cloudConfigSchema.fields,
  
  // Naming config (without root directory for monolith individual service)
  ...namingConfigSchema.fields,
  
  // Server side options
  ...serverSideOptionsSchema.fields,
  
  // Client side options
  ...clientSideOptionsSchema.fields,
  
  // Microservice options
  ...microserviceOptionsSchema.fields,
});

export const microserviceFormSchema = yup.object().shape({
  // Root directory for microservices
  rootDirectoryName: namingConfigSchema.fields.rootDirectoryName,
  
  // Common GitHub config
  ...githubConfigSchema.fields,
  
  // Common Cloud config  
  ...cloudConfigSchema.fields,
  
  // Services array validation
  services: yup
    .array()
    .of(
      yup.object().shape({
        // Individual service naming
        baseName: namingConfigSchema.fields.baseName,
        packageName: namingConfigSchema.fields.packageName,
        
        // Individual service server options
        ...serverSideOptionsSchema.fields,
        
        // Individual service client options
        ...clientSideOptionsSchema.fields,
        
        // Individual service microservice options
        ...microserviceOptionsSchema.fields,
      })
    )
    .min(1, 'At least one service must be configured')
    .test('unique-ports', 'All services must have unique ports', function(services) {
      if (!services || services.length <= 1) return true;
      const ports = services.map(service => service.serverPort);
      return ports.length === new Set(ports).size;
    })
    .test('unique-names', 'All services must have unique base names', function(services) {
      if (!services || services.length <= 1) return true;
      const names = services.map(service => service.baseName);
      return names.length === new Set(names).size;
    })
    .test('single-gateway', 'Only one service can be a gateway', function(services) {
      if (!services) return true;
      const gateways = services.filter(service => service.isGateway);
      return gateways.length <= 1;
    }),
});

// Application type validation schema
export const applicationTypeSchema = yup.object({
  applicationType: yup
    .string()
    .required('Application type is required')
    .oneOf([PROJECT_TYPES.MONOLITH, PROJECT_TYPES.MICROSERVICE], 'Application type must be either monolith or microservice'),
});

// Helper function to get validation schema based on application type
export const getValidationSchema = (applicationType) => {
  switch (applicationType) {
    case PROJECT_TYPES.MONOLITH:
      return applicationTypeSchema.concat(monolithicFormSchema);
    case PROJECT_TYPES.MICROSERVICE:
      return applicationTypeSchema.concat(microserviceFormSchema);
    default:
      return applicationTypeSchema;
  }
};