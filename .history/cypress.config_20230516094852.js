
const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  allureWriter(on, config);
  return config;
}

module.exports = defineConfig({
  const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: false,
    json: true,
  },
})
  e2e: {
    baseUrl: "https://api-football-v1.p.rapidapi.com/v3",
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    }
  }

  
});