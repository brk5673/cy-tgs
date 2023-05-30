
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
  
    "reporter": "cypress-multi-reporters",
    "reporterOptions": {
      "reporterEnabled": "mocha-junit-reporter, mochawesome",
      "mochaJunitReporterReporterOptions": {
        "mochaFile": "results/junit/test-results.[hash].xml"
      },
      "mochawesomeReporterOptions": {
        "reportDir": "results/mochawesome",
        "quiet": true,
        "overwrite": false,
        "html": false,
        "json": true
      }
    }
  }
  
});