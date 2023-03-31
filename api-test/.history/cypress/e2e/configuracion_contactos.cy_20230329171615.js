import {USERNAME, PASSWORD, USERNAME1, PASSWORD1} from "../fixtures/credentials"

describe('Test cases de modulo Estado de Sistema', () => { // corregir describe
    beforeEach(() => {
      cy.visit('http://10.1.11.237:8080/etgs/login')
      cy.url()
        .should('eq', 'http://10.1.11.237:8080/etgs/login')
      cy.get('input[name="userName"]')
        .should('be.visible')
      cy.get('.logotgs')
        .should('exist')
        .and('be.visible')
  
      cy.get('input[name="userName"]')
        .type(USERNAME1)
      cy.get('input[name="password"]')
        .type(PASSWORD1)
      cy.get('button[type="submit"]')
        .click()
    })

    it('us1120 - Validacion del menu, pantalla y carga inicial', () => {
        cy.visit('http://10.1.11.237:8080/etgs/')
        cy.contains('span.MuiListItemText-primary', 'SPAC').click()
        cy.contains('span.MuiListItemText-primary', 'Control').click()
        cy.contains('span.MuiListItemText-primary', 'Estado del Sistema').click()
        cy.url().should('eq', 'http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
        cy.get('#navPath').contains('Estado del Sistema', {matchCase: false}).should('exist') // validar nombre el headers
        cy.log('Visualizar el boton "Listar"')
        cy.contains('Listar').should('exist')


})  