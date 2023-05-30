
const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  allureWriter(on, config);
  return config;
}

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://api-football-v1.p.rapidapi.com/v3",
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    }
  }

  
});