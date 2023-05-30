const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  watchForFileChanges: false,

  "reporter": "cypress-multi-reporters",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
