
const { defineConfig } = require("cypress");
//const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
 // allureWriter(on, config);
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://10.1.11.237:8080/etgs", // sit URL
    // baseUrl: "http://10.1.11.236:8080/etgs", // dev URL
    setupNodeEvents,
    chromeWebSecurity: false,
    experimentalRunAllSpecs: true, 
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results',
      overwrite: true,
      html: true,
      json: false,
    },
    watchForFileChanges: false,
  },
});