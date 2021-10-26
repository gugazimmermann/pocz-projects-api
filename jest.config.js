module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/sequelize/**",
  ],
  coverageReporters: ["json", "html"],
  coveragePathIgnorePatterns: [
    "node_modules",
    ".webpack",
    ".serverless",
    "layers",
    "sequelize",
    "jest.config.js",
  ],
  coverageDirectory: "<rootDir>/coverage/",
};
