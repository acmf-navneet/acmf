module.exports = {
    testEnvironment: "jsdom", // Simulates a browser-like environment
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // Path to the setup file
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest", // Use Babel to transform JS/JSX files
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    },
  };