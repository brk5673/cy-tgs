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

//cypress command login
Cypress.Commands.add('loginAPI', (username, password) => {
  cy.request('POST', '/api/user/login', {
    username, password
  }).then((response) => {
    let token = response.headers["set-cookie"][0].split("=")[1].split(";")[0]
    cy.wrap(token).as("jsession")
  });

})

// cypress command logout
Cypress.Commands.add('logoutAPI', () => {
  cy.request('POST', '/api/user/logout').then((response) => {
    expect(response.status).to.eq(200)
  });
})

// cypress command get date
Cypress.Commands.add('today', () => {
  const date = new Date()
  const day = date.getDate()
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // PadStart agrega un 0 si tiene un solo dígito
  const year = date.getFullYear()
  return `${year}-${month}-${day}`

})
