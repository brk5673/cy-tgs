const jsonfile = require('jsonfile');

// Leer el archivo de resultados de Cypress
const cypressResults = jsonfile.readFileSync('cypress/results/mochawesome.json');

// Transformar los resultados de Cypress al formato requerido por Xray

// ...

// Escribir los resultados transformados en un nuevo archivo JSON
jsonfile.writeFileSync('cypress/results/xray-results.json', transformedResults);
