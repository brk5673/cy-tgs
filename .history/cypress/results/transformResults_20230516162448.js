const jsonfile = require('jsonfile');

// Leer el archivo de resultados de Cypress
const cypressResults = jsonfile.readFileSync('cypress/results/mochawesome_006.json');

// Transformar los resultados de Cypress al formato requerido por Xray

// ...

// Escribir los resultados transformados en un nuevo archivo JSON
jsonfile.writeFileSync('cypress/results/xrayxray-results.json', transformedResults);
