const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^d3-(.*)$": `<rootDir>/node_modules/d3-$1/dist/d3-$1.min.js`,
  },
};

module.exports = createJestConfig(customJestConfig);
