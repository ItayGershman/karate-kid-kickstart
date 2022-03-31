module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["./__tests__/setupJest.js"],
    testMatch:["**/e2e/**"]
  };
  