
const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

async function setupNodeEvents(on, config) {
  allureWriter(on, config);
  return config;
}

const { addMatchImageSnapshotPlugin } = require('@cypress/snapshot');

module.exports = (on, config) => {
  // Agrega el plugin de Cypress Image Snapshot
  addMatchImageSnapshotPlugin(on, config);

  // Configuración para generar solo un archivo JSON de resultados
  config.reporterOptions = {
    mochawesomeReporterOptions: {
      reportDir: 'results/mochawesome',
      reportFilename: 'result',
      quiet: true,
      overwrite: false,
      html: false,
      json: true
    }
  };

  return config;
};


module.exports = defineConfig({
  reporter: "cypress-mochawsome-reporter",
  e2e: {
    baseUrl: "https://api-football-v1.p.rapidapi.com/v3",
    setupNodeEvents(on, config),
    chromeWebSecurity: false,
    env: {
      allureReuseAfterSpec: true,
    }
  }

  
});