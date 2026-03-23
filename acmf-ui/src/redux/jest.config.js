module.exports = {
    testEnvironment: "jsdom", 
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"], 
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", 
    },
    collectCoverage: true,
    coverageDirectory: "coverage",
    coverageReporters: ["html", "text", "lcov"], 
    coveragePathIgnorePatterns: ["/node_modules/"],
  };