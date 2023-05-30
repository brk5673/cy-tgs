import {USERNAME, PASSWORD} from "../fixtures/credentials"

describe('Manu, pantalla, carga inicial', () => {
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
      .type(USERNAME)
    cy.get('input[name="password"]')
      .type(PASSWORD)
    cy.get('button[type="submit"]')
      .click()
  })

  it('Acceso a Estados de Sistema', () => {
    cy.visit('http://10.1.11.237:8080/etgs/')
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
    cy.contains('Listar')
      .should('exist')
  })

  it('Validar botones "Imprimir", "Descargar PDF", "Descargar Excel"', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
    cy.contains('Listar')
      .should('exist')
      .click()
    cy.get('div.HeaderSvgCustomIcon.PdfIcon')
      .should('be.visible')
    cy.get('div.HeaderSvgCustomIcon.ExcelIcon')
      .should('be.visible')
    cy.get('path').eq(0)
      .should('be.visible')
  })

  it('Validar datepickers', () => {
    cy.visit('http://10.1.11.237:8080/etgs/spac/control/estadodelsistema')
    cy.contains('Estado del Sistema')
      .should('exist')
    cy.get('path[d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"]')
      .click()


  })
})