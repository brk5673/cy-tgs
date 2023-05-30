
const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  allureWriter(on, config);
  return config;
}



module.exports = defineConfig({
  reporter: "cypress-mochawsome-reporter",
  e2e: {
    baseUrl: "https://api-football-v1.p.rapidapi.com/v3",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    }
  }

  
});