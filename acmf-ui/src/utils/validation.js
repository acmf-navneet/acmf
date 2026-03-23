// Validation utility functions for project forms

export const validateField = (value, rules) => {
  const errors = [];

  if (rules.required && (!value || value.toString().trim() === '')) {
    errors.push('This field is required');
  }

  if (rules.minLength && value && value.toString().length < rules.minLength) {
    errors.push(`Minimum length is ${rules.minLength} characters`);
  }

  if (rules.maxLength && value && value.toString().length > rules.maxLength) {
    errors.push(`Maximum length is ${rules.maxLength} characters`);
  }

  if (rules.pattern && value && !rules.pattern.test(value)) {
    errors.push(rules.message || 'Invalid format');
  }

  if (rules.custom && typeof rules.custom === 'function') {
    const customError = rules.custom(value);
    if (customError) {
      errors.push(customError);
    }
  }

  return errors;
};

export const validateForm = (formData, validationSchema) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationSchema).forEach(field => {
    const fieldErrors = validateField(formData[field], validationSchema[field]);
    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors;
      isValid = false;
    }
  });

  return { errors, isValid };
};

// Validation schemas for different form types
export const namingValidationSchema = {
  baseName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z][a-zA-Z0-9-]*$/, // No spaces allowed
    custom: (value) => (/\s/.test(value) ? 'Base name must not contain spaces' : null),
    message: 'Base name must start with a letter and contain only letters, numbers, and hyphens'
  },
  packageName: {
    required: true,
    pattern: /^[a-z][a-z0-9]*(\.[a-z][a-z0-9]*)*$/,
    message: 'Package name must be in Java package format (e.g., com.example.app)'
  },
  rootDirectoryName: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z][a-zA-Z0-9-_]*$/, // No spaces allowed
    custom: (value) => (/\s/.test(value) ? 'Directory name must not contain spaces' : null),
    message: 'Directory name must start with a letter and contain only letters, numbers, hyphens, and underscores'
  }
};

export const githubValidationSchema = {
  githubUsername: {
    required: true,
    minLength: 1,
    maxLength: 39,
    pattern: /^[a-zA-Z0-9-]+$/,
    message: 'GitHub username can only contain letters, numbers, and hyphens'
  },
  githubToken: {
    required: true,
    minLength: 40,
    maxLength: 255,
    pattern: /^ghp_[a-zA-Z0-9]{36}$|^gho_[a-zA-Z0-9]{36}$|^ghu_[a-zA-Z0-9]{36}$|^ghs_[a-zA-Z0-9]{36}$|^ghr_[a-zA-Z0-9]{36}$/,
    message: 'Please enter a valid GitHub personal access token'
  },
  githubOrganization: {
    required: false,
    minLength: 1,
    maxLength: 39,
    pattern: /^[a-zA-Z0-9-]+$/,
    message: 'Organization name can only contain letters, numbers, and hyphens'
  }
};

export const cloudValidationSchema = {
  projectPath: {
    required: true,
    minLength: 1,
    maxLength: 255,
    pattern: /^[a-zA-Z0-9\/\-_\.]+$/,
    message: 'Project path can only contain letters, numbers, slashes, hyphens, underscores, and dots'
  },
  cloudProvider: {
    required: true,
    custom: (value) => {
      const validProviders = ['aws', 'azure', 'gcp'];
      return validProviders.includes(value) ? null : 'Please select a valid cloud provider';
    }
  },
  accountId: {
    required: true,
    pattern: /^[0-9]{12}$/,
    message: 'Account ID must be exactly 12 digits'
  },
  region: {
    required: true,
    minLength: 1,
    maxLength: 50
  }
};

export const serverValidationSchema = {
  buildTool: {
    required: true,
    custom: (value) => {
      const validTools = ['maven', 'gradle'];
      return validTools.includes(value) ? null : 'Please select a valid build tool';
    }
  },
  databaseType: {
    required: true,
    custom: (value) => {
      const validTypes = ['sql', 'mongodb', 'cassandra', 'neo4j'];
      return validTypes.includes(value) ? null : 'Please select a valid database type';
    }
  },
  serverPort: {
    required: true,
    custom: (value) => {
      const port = parseInt(value);
      return port >= 1024 && port <= 65535 ? null : 'Port must be between 1024 and 65535';
    }
  }
};

export const clientValidationSchema = {
  clientFramework: {
    required: true,
    custom: (value) => {
      const validFrameworks = ['react', 'angular', 'vue', 'no'];
      return validFrameworks.includes(value) ? null : 'Please select a valid client framework';
    }
  },
  clientPackageManager: {
    required: true,
    custom: (value) => {
      const validManagers = ['npm', 'yarn', 'pnpm'];
      return validManagers.includes(value) ? null : 'Please select a valid package manager';
    }
  }
};

// Validation for microservice forms
export const microserviceValidationSchema = {
  ...namingValidationSchema,
  ...serverValidationSchema,
  ...clientValidationSchema,
  applicationType: {
    required: true,
    custom: (value) => {
      return value === 'microservice' ? null : 'Application type must be microservice';
    }
  },
  authenticationType: {
    required: true,
    custom: (value) => {
      const validTypes = ['jwt', 'oauth2', 'session', 'no'];
      return validTypes.includes(value) ? null : 'Please select a valid authentication type';
    }
  }
};

// Validation for monolithic forms
export const monolithicValidationSchema = {
  ...namingValidationSchema,
  ...githubValidationSchema,
  ...cloudValidationSchema,
  ...serverValidationSchema,
  ...clientValidationSchema,
  applicationType: {
    required: true,
    custom: (value) => {
      return value === 'monolith' ? null : 'Application type must be monolith';
    }
  }
};

// Get validation errors for a specific field
export const getFieldError = (errors, fieldName) => {
  return errors[fieldName] ? errors[fieldName][0] : null;
};

// Check if a form section is valid
export const isSectionValid = (formData, validationSchema) => {
  const { isValid } = validateForm(formData, validationSchema);
  return isValid;
}; 