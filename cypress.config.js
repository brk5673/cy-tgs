
const { defineConfig } = require("cypress");
//const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
 // allureWriter(on, config);
  return config;
}

module.exports = defineConfig({
  e2e: {
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: true,
      html: true,
      json: false,
    },
    baseUrl: "http://10.1.11.237:8080/etgs", // sit URL
    setupNodeEvents,
    chromeWebSecurity: false,
    watchForFileChanges: false,
  },
  
});