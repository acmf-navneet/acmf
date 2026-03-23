/**
 * Project Type Constants
 * Enum-like object for project application types
 */
export const PROJECT_TYPES = {
  MONOLITH: 'monolith',
  MICROSERVICE: 'microservice',
  GATEWAY: 'gateway'
};

/**
 * Project Type Labels for UI Display
 */
export const PROJECT_TYPE_LABELS = {
  [PROJECT_TYPES.MONOLITH]: 'Monolithic',
  [PROJECT_TYPES.MICROSERVICE]: 'Microservices',
  [PROJECT_TYPES.GATEWAY]: 'Gateway'
};

/**
 * Default project type
 */
export const DEFAULT_PROJECT_TYPE = PROJECT_TYPES.MONOLITH;

/**
 * Helper function to validate project type
 * @param {string} type - The project type to validate
 * @returns {boolean} - Whether the type is valid
 */
export const isValidProjectType = (type) => {
  return Object.values(PROJECT_TYPES).includes(type);
};

/**
 * Helper function to get project type label
 * @param {string} type - The project type
 * @returns {string} - The display label for the project type
 */
export const getProjectTypeLabel = (type) => {
  return PROJECT_TYPE_LABELS[type] || type;
};
