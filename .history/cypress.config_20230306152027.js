const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  "reporter": "cypress-multi-reporters",
  "reporterOptions": {
    "reporterEnabled": "mocha-junit-reporter, mochawesome",
    "mochaJunitReporterReporterOptions": {
      "mochaFile": "results/junit/test-results.[hash].xml",
      "rootSuiteTitle": "Cypress Tests"
    },
    "mochawesomeReporterOptions": {
      "reportDir": "results/mochawesome",
      "overwrite": false,
      "html": false,
      "json": true
    }
  }
});
