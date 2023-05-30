import {USERNAME, PASSWORD} from "../fixtures/credentials"

describe('Manu, pantalla, carga inicial', () => {
  it('Acceso con credenciales validas', () => {
    cy.log('Visitar login website, y verificar URL/logo')
    cy.visit('http://10.1.11.237:8080/etgs/login')
    cy.url()
      .should('eq', 'http://10.1.11.237:8080/etgs/login')
    cy.get('input[name="userName"]')
      .should('be.visible')
    cy.get('.logotgs')
      .should('exist')
      .and('be.visible')

    cy.get('input[name="userName"]')
      .type(USERNAME)
    cy.get('input[name="password"]')
      .type(PASSWORD)
    cy.get('button[type="submit"]')
      .click()
    cy.url()
      .should('eq', 'http://10.1.11.237:8080/etgs/')
  })
  it('Verificar menu', () => {

    cy.contains('span.MuiListItemText-primary', 'SPAC')
      .click()
    cy.contains('span.MuiListItemText-primary', 'Control')
      .click()
    cy.contains('span.MuiListItemText-primary', 'Estados del Sistema')
      .click()
    cy.url()
      .should('eq', 'http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
    cy.contains('Estado del Sistema')
      .should('exist')
    cy.log('Visualizar el boton "Listar"')
    cy.contains('Listar').should('exist')
  })
})
