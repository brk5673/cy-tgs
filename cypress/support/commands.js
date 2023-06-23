// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('waitForDownload', () => {
  cy.wait(5000) // Espera 5 segundos para asegurarte de que la descarga esté completa
})

Cypress.Commands.add('getLastDownload', () => {
  return cy.exec('ls -Art ~/Downloads | tail -n 1').its('stdout').then((filename) => { // Cambia "~/Downloads" por la ruta de tu carpeta de descargas
    return filename.trim()
  })
})

Cypress.Commands.add('loginAPI', (username, password) => {
  cy.request('POST', '/api/user/login', {
    username, password
  }).then((response) => {
    let token = response.headers["set-cookie"][0].split("=")[1].split(";")[0]
    cy.wrap(token).as("jsession")
  });

})

const openPDF = (fileName) => {
  // Get the path to the PDF viewer.
  const pdfViewerPath = process.env.PDF_VIEWER_PATH || '/usr/bin/open';

  // Open the PDF file in the PDF viewer.
  const command = `${pdfViewerPath} ${fileName}`;
  expect(command);
};

// Add the custom command to Cypress.
Cypress.Commands.add('openPDF', openPDF);

