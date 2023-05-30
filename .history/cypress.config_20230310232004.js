// const { defineConfig } = require("cypress");
// const allureWriter = require("@shelex/cypress-allure-plugin/writer");

// module.exports = defineConfig({
//   // reporter: 'cypress-mochawesome-reporter',
//   // screenshotOnRunFailure: true,
//   // reporterOptions: {
//   //   reportDir: "cypress/report",
//   //   charts: true,
//   //   reportPageTitle: 'API test',
//   //   embeddedScreenshots: true,
//   //   inlineAssets: true,
//   //   saveAllAttempts: false,
//   // },
//   chromeWebSecurity: false,
//   watchForFileChanges: false,
//   e2e: {
//     setupNodeEvents(on, config) {
//       // implement node event listeners here
//       //  require('cypress-mochawesome-reporter/plugin')(on);
//       allureWriter(on, config);
//       return config;
//     },
//   },
// });
const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  allureWriter(on, config);
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api-football-v1.p.rapidapi.com/v3",
    setupNodeEvents,
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    }
  },
  
});