module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleNameMapper: {
      "\\.(css)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["./src/test/setupJest.js"]
  };
  